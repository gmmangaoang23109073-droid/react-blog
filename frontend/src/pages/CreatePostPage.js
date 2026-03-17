// frontend/src/pages/CreatePostPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import '../App.css'; // Create this CSS file

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      // Validate file type
      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        setError('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setError('');
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    // Validate inputs
    if (!title.trim()) {
      setError('Title is required');
      setSubmitting(false);
      return;
    }

    if (!body.trim()) {
      setError('Post content is required');
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image) formData.append('image', image);

    try {
      const { data } = await API.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Redirect to the new post
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-post-page">
      <h1 className="create-post-title">Write a New Post</h1>
      
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter an attention-grabbing title..."
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Post Content</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your thoughts, stories, or ideas..."
            rows={12}
            className="form-textarea"
            required
          />
        </div>

        {/* Image Upload Section - Only for admin or all users? Adjust as needed */}
        <div className="form-group">
          <label htmlFor="image">Featured Image (Optional)</label>
          <input
            type="file"
            id="image"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleImageChange}
            className="file-input"
          />
          <p className="file-info">Max size: 5MB. Supported formats: JPG, PNG, GIF</p>
          
          {preview && (
            <div className="image-preview-container">
              <h4>Image Preview:</h4>
              <img src={preview} alt="Preview" className="image-preview" />
              <button 
                type="button" 
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
                className="btn-remove-image"
              >
                Remove Image
              </button>
            </div>
          )}
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
            {submitting ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;