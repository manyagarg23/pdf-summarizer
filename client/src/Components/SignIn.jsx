import React, { useState } from 'react';
import OAuth from './OAuth';

export default function SignIn({ onSignIn }) {
  const [credentials, setCredentials] = useState({ uid: '', pwd: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSignIn) onSignIn(credentials);
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
          style={{
            backgroundColor: '#729598'
          }}
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
        
        {/* Google OAuth Button */}
        <button
          type="button"
          className="w-full text-white py-2 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
          style={{
            backgroundColor: '#903729'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#7a2e22';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#903729';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
      </form>
      <p className="text-sm mt-4 text-center">
        Don't have an account? 
        <a 
          href="/signup" 
          className="inline-block text-white py-1 px-3 rounded ml-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95 text-sm font-medium"
          style={{
            backgroundColor: '#dcb084'
          }}
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