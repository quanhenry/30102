// src/pages/auth/Register/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../../components/auth/RegisterForm/RegisterForm';
import './styles.css';

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <RegisterForm />
      <p className="auth-redirect">
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default RegisterPage;