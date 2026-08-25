import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function PostDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data.post);
      setComments(data.comments);
    } catch {
      setError("Post not found");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post(`/comments/post/${id}`, { text });
      setComments((current) => [data, ...current]);
      setText("");
    } catch (err) {
      alert(err.response?.data?.message || "Could not add comment");
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments((current) => current.filter((c) => c._id !== commentId));
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete comment");
    }
  };

  if (error) return <div className="error">{error}</div>;
  if (!post) return <p>Loading...</p>;

  const isAuthor = user?._id === post.author?._id;

  return (
    <article className="details">
      <Link to="/">← Back to posts</Link>

      <h1>{post.title}</h1>
      <p className="meta">
        By {post.author?.name} · {new Date(post.createdAt).toLocaleString()}
      </p>

      <div className="post-content">{post.content}</div>

      {isAuthor && (
        <div className="card-actions">
          <Link className="btn outline" to={`/posts/${id}/edit`}>Edit</Link>
          <button
            className="btn danger"
            onClick={async () => {
              if (!confirm("Delete this post?")) return;
              await api.delete(`/posts/${id}`);
              navigate("/");
            }}
          >
            Delete
          </button>
        </div>
      )}

      <section className="comments">
        <h2>Comments ({comments.length})</h2>

        {user ? (
          <form className="comment-form" onSubmit={addComment}>
            <textarea
              rows="4"
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <button className="btn" type="submit">Comment</button>
          </form>
        ) : (
          <p><Link to="/login">Login</Link> to leave a comment.</p>
        )}

        {comments.map((comment) => (
          <div className="comment" key={comment._id}>
            <div>
              <strong>{comment.author?.name}</strong>
              <span className="meta">
                {" "}· {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <p>{comment.text}</p>

            {user?._id === comment.author?._id && (
              <button className="text-danger" onClick={() => deleteComment(comment._id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </section>
    </article>
  );
}
