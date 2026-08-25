import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import ProtectedRoute from "../components/ProtectedRoute";

function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(({ data }) => setForm({
        title: data.post.title,
        content: data.post.content
      }))
      .catch(() => setError("Could not load post"));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/posts/${id}`, form);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="form-page wide">
      <form className="form-card" onSubmit={submit}>
        <h2>Edit Post</h2>
        {error && <div className="error">{error}</div>}

        <label>Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <label>Content</label>
        <textarea
          rows="14"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />

        <button className="btn" type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default function EditPost() {
  return <ProtectedRoute><EditForm /></ProtectedRoute>;
}
