import React, { useState } from 'react';
import OAuth from './OAuth';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [credentials, setCredentials] = useState({ uid: '', pwd: '' });
  const { login } = useAuth(); 
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: credentials.uid,
        password: credentials.pwd,
      });

      if (res.data.success) {
        const userData = res.data.user;
        login(userData); 
        navigate('/');
      } else {
        console.error("Login failed:", res.data.message);
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Something went wrong during login.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-modern-charcoal">
      <h2 className="text-2xl font-semibold mb-4 text-modern-brick">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="uid"
          placeholder="Email"
          value={credentials.uid}
          onChange={handleChange}
          required
          className="w-full p-2 border border-modern-sage rounded focus:outline-none focus:ring-2 focus:ring-modern-blue transition-all duration-300 transform focus:scale-[1.02]"
        />
        <input
          name="pwd"
          type="password"
          placeholder="Password"
          value={credentials.pwd}
          onChange={handleChange}
          required
          className="w-full p-2 border border-modern-sage rounded focus:outline-none focus:ring-2 focus:ring-modern-blue transition-all duration-300 transform focus:scale-[1.02]"
        />
        <button
          type="submit"
          className="w-full text-white py-2 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
          style={{ backgroundColor: '#729598' }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#5a7b7e';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#729598';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Sign In
        </button>

        <OAuth />
      </form>
      <p className="text-sm mt-4 text-center">
        Don't have an account?
        <a 
          href="/signup" 
          className="inline-block text-white py-1 px-3 rounded ml-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95 text-sm font-medium"
          style={{ backgroundColor: '#dcb084' }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#c49a6b';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#dcb084';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Sign Up
        </a>
      </p>
    </div>
  );
}
