import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../../components/auth/LoginForm/LoginForm';
import './styles.css';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <LoginForm />
      <p className="auth-redirect">
        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
      </p>
    </div>
  );
};

export default LoginPage;