import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const loadPosts = async () => {
    try {
      const { data } = await api.get("/posts");
      setPosts(data);
    } catch {
      setError("Could not load posts.");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;

    try {
      await api.delete(`/posts/${id}`);
      setPosts((current) => current.filter((post) => post._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <section>
      <div className="hero">
        <div>
          <p className="eyebrow">FULL-STACK BLOG PLATFORM</p>
          <h1>Share ideas. Start conversations.</h1>
          <p>Create posts, edit your content, and interact through comments.</p>
        </div>
        {user && <Link className="btn" to="/create">Write a post</Link>}
      </div>

      {error && <div className="error">{error}</div>}

      <h2>Latest Posts</h2>

      <div className="post-grid">
        {posts.length === 0 ? (
          <div className="empty">No posts yet. Be the first to write one.</div>
        ) : (
          posts.map((post) => (
            <article className="card" key={post._id}>
              <h3>{post.title}</h3>
              <p className="meta">
                By {post.author?.name || "Unknown"} · {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p>
                {post.content.length > 180
                  ? `${post.content.slice(0, 180)}...`
                  : post.content}
              </p>

              <div className="card-actions">
                <Link className="btn outline" to={`/posts/${post._id}`}>Read</Link>

                {user?._id === post.author?._id && (
                  <>
                    <Link className="btn outline" to={`/posts/${post._id}/edit`}>Edit</Link>
                    <button className="btn danger" onClick={() => deletePost(post._id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
