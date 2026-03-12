import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const { name, email, phone, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleAuthMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        });
        localStorage.setItem('token', res.data.token);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    } else {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          name,
          email,
          phone,
          password,
        });
        localStorage.setItem('token', res.data.token);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <section id="auth">
      <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      <form onSubmit={onSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
        />
        {!isLogin && (
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={onChange}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</button>
      </form>
      <button onClick={toggleAuthMode}>
        {isLogin
          ? "Don't have an account? Sign Up"
          : 'Already have an account? Sign In'}
      </button>
    </section>
  );
};

export default Auth;
