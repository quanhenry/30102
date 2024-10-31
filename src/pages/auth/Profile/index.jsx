// src/pages/auth/Profile/index.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import './styles.css';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    // Thêm các trường khác tùy theo yêu cầu
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await updateProfile(user.id, formData);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Thông tin cá nhân</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>
            Chỉnh sửa
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="fullName">Họ và tên</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
          />
        </div>

        {isEditing && (
          <div className="profile-actions">
            <button type="button" onClick={() => setIsEditing(false)}>
              Hủy
            </button>
            <button type="submit">
              Lưu thay đổi
            </button>
          </div>
        )}
      </form>

      {user.role === 'ADMIN' && (
        <div className="admin-section">
          <h2>Quyền Admin</h2>
          {/* Thêm các chức năng dành cho admin */}
        </div>
      )}

      {user.role === 'EDITOR' && (
        <div className="editor-section">
          <h2>Quyền Biên tập</h2>
          {/* Thêm các chức năng dành cho biên tập viên */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;