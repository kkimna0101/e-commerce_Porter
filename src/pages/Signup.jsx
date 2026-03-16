import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Swal from 'sweetalert2';
import './Login.scss';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, error } = useStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      return Swal.fire({ text: '비밀번호가 일치하지 않습니다.', icon: 'warning', confirmButtonColor: '#1a1a1a' });
    }

    const success = signup({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (success) {
      Swal.fire({ 
        title: '가입 완료', 
        text: '포터의 회원이 되신 것을 환영합니다.', 
        icon: 'success', 
        confirmButtonColor: '#1a1a1a' 
      }).then(() => {
        navigate('/login');
      });
    }
  };

  return (
    <div className="signup-page inner">
      <div className="signup-box">
        <h2>CREATE ACCOUNT</h2>
        <p className="desc">포터 회원가입</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-row">
            <input type="text" name="name" placeholder="NAME" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-row">
            <input type="email" name="email" placeholder="E-MAIL" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-row">
            <input type="password" name="password" placeholder="PASSWORD" value={formData.password} onChange={handleChange} required minLength={6} />
          </div>
          <div className="input-row">
            <input type="password" name="passwordConfirm" placeholder="CONFIRM PASSWORD" value={formData.passwordConfirm} onChange={handleChange} required />
          </div>
          
          {error && <p className="error-msg">{error}</p>}
          
          <button type="submit" className="btn-submit">CREATE ACCOUNT</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
