import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ProtectedRoute from "../components/ProtectedRoute";

function CreateForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/posts", form);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="form-page wide">
      <form className="form-card" onSubmit={submit}>
        <h2>Create Post</h2>
        {error && <div className="error">{error}</div>}

        <label>Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter post title"
          required
        />

        <label>Content</label>
        <textarea
          rows="14"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Write your post..."
          required
        />

        <button className="btn" type="submit">Publish Post</button>
      </form>
    </div>
  );
}

export default function CreatePost() {
  return <ProtectedRoute><CreateForm /></ProtectedRoute>;
}
