'use client';
import { useEffect, useState, useCallback } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { getAllPosts, createPost, updatePost, deletePost } from '@/lib/api';
import MarkdownEditor from '@/components/MarkdownEditor';

const emptyForm = { title: '', excerpt: '', content: '', coverImage: '', tags: '', published: false };

export default function BlogAdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    getAllPosts()
      .then((data) => setPosts(data.posts || []))
      .catch((err) => setError(err.message || 'Failed to load posts'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const data = await getAllPosts();
        if (cancelled) return;
        setPosts(data.posts || []);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load posts');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError('');
    setShowModal(true);
  };

  const openEdit = (post) => {
    setEditingId(post._id);
    setForm({
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      coverImage: post.coverImage || '',
      tags: (post.tags || []).join(', '),
      published: !!post.published,
    });
    setFormError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt || undefined,
        content: form.content,
        coverImage: form.coverImage || '',
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        published: form.published,
      };
      if (editingId) {
        const { post } = await updatePost(editingId, payload);
        setPosts((prev) => prev.map((p) => (p._id === editingId ? post : p)));
      } else {
        const { post } = await createPost(payload);
        setPosts((prev) => [post, ...prev]);
      }
      setShowModal(false);
    } catch (err) {
      setFormError(err.details?.[0]?.message || err.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (postId) => {
    const prev = posts;
    setPosts((list) => list.filter((p) => p._id !== postId));
    try {
      await deletePost(postId);
    } catch (err) {
      setError(err.message || 'Failed to delete post');
      setPosts(prev);
    }
  };

  return (
    <>
      <div className="dash-page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="dash-page-title">Blog</h1>
          <p className="dash-page-sub">Create and manage insights posts.</p>
        </div>
        <button className="dash-btn" onClick={openCreate}>
          <Plus size={15} /> New post
        </button>
      </div>

      <div className="dash-panel">
        {error && <p className="dash-error" style={{ marginBottom: 12 }}>{error}</p>}

        {loading ? (
          <p className="dash-msg">Loading posts…</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>State</th>
                  <th>Updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {posts.length === 0 ? (
                  <tr><td colSpan={5} className="dash-table-empty">No posts yet.</td></tr>
                ) : (
                  posts.map((p) => (
                    <tr key={p._id}>
                      <td>{p.title}</td>
                      <td>{(p.tags || []).join(', ') || '—'}</td>
                      <td>
                        <span className={`dash-badge ${p.published ? 'won' : 'new'}`}>
                          {p.published ? 'published' : 'draft'}
                        </span>
                      </td>
                      <td>{new Date(p.updatedAt).toLocaleDateString()}</td>
                      <td style={{ display: 'flex', gap: 8 }}>
                        <button className="dash-icon-btn" onClick={() => openEdit(p)} aria-label="Edit" style={{ color: 'var(--text-secondary)' }}>
                          <Pencil size={15} />
                        </button>
                        <button className="dash-icon-btn" onClick={() => handleDelete(p._id)} aria-label="Delete">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="dash-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <h2 className="dash-modal-title">{editingId ? 'Edit post' : 'New post'}</h2>
            <form onSubmit={handleSave}>
              <div className="dash-form-field">
                <label htmlFor="title">Title</label>
                <input id="title" name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="dash-form-field">
                <label htmlFor="excerpt">Excerpt</label>
                <input id="excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} />
              </div>
              <div className="dash-form-field">
                <label htmlFor="coverImage">Cover image URL</label>
                <input id="coverImage" name="coverImage" value={form.coverImage} onChange={handleChange} placeholder="https://…" />
              </div>
              <div className="dash-form-field">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input id="tags" name="tags" value={form.tags} onChange={handleChange} placeholder="ai, growth, marketing" />
              </div>
              <div className="dash-form-field">
                <label htmlFor="content">Content</label>
                <MarkdownEditor
                  value={form.content}
                  onChange={(content) => setForm((f) => ({ ...f, content }))}
                />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
                Published
              </label>

              {formError && <p className="dash-error" style={{ marginTop: 10 }}>{formError}</p>}

              <div className="dash-modal-actions">
                <button type="button" className="dash-btn dash-btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="dash-btn" disabled={saving}>
                  {saving ? 'Saving…' : editingId ? 'Save changes' : 'Create post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
