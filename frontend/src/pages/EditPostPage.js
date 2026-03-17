// frontend/src/pages/EditPostPage.js
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import '../App.css';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Wrap fetchPost in useCallback to include in dependencies
  const fetchPost = useCallback(async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);
      
      // Check if user is authorized to edit
      if (user.role !== 'admin' && user._id !== data.author?._id) {
        setError('You are not authorized to edit this post');
        setTimeout(() => navigate('/home'), 2000);
        return;
      }

      setTitle(data.title);
      setBody(data.body);
      setCurrentImage(data.image);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load post');
    } finally {
      setLoading(false);
    }
  }, [id, user, navigate]); // Add dependencies

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPost();
  }, [user, navigate, fetchPost]); // Add all dependencies

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        setError('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image) {
      formData.append('image', image);
    }

    try {
      const { data } = await API.put(`/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSuccess('Post updated successfully!');
      setTimeout(() => navigate(`/posts/${data._id}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveImage = async () => {
    if (window.confirm('Are you sure you want to remove the image?')) {
      try {
        await API.delete(`/posts/${id}/image`);
        setCurrentImage(null);
        setImage(null);
        setPreview(null);
        setSuccess('Image removed successfully');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to remove image');
      }
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;

  return (
    <div className="edit-post-page">
      <h1 className="edit-post-title">Edit Your Post</h1>
      
      <div className="info-box">
        <p>✏️ You are editing your own post. Changes will be visible to everyone.</p>
        <p>👤 Only you and admins can edit this post.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Content</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your post content here..."
            rows={15}
            required
            className="form-textarea"
          />
        </div>

        {(currentImage || preview) && (
          <div className="image-section">
            <h3>Current Image</h3>
            <div className="current-image-container">
              <img
                src={preview || `http://localhost:5000/uploads/${currentImage}`}
                alt="Post"
                className="current-image"
              />
              {!preview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="btn btn-danger btn-small"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="image">Upload New Image (Optional)</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/jpeg,image/png,image/gif"
            className="file-input"
          />
          <p className="file-info">Max size: 5MB. Supported: JPG, PNG, GIF</p>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;