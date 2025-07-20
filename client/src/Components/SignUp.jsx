import React, { useState } from 'react';
import OAuth from './OAuth';

export default function SignUp({ onSignUp }) {
  const [formData, setFormData] = useState({ uid: '', name: '', pwd: '', dos: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSignUp) onSignUp(formData);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-modern-charcoal">
      <h2 className="text-2xl font-semibold mb-4 text-modern-brick">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="uid"
          placeholder="Email"
          value={formData.uid}
          onChange={handleChange}
          required
          className="w-full p-2 border border-modern-sage rounded focus:outline-none focus:ring-2 focus:ring-modern-blue"
        />
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-modern-sage rounded focus:outline-none focus:ring-2 focus:ring-modern-blue"
        />
        <input
          name="pwd"
          type="password"
          placeholder="Password"
          value={formData.pwd}
          onChange={handleChange}
          required
          className="w-full p-2 border border-modern-sage rounded focus:outline-none focus:ring-2 focus:ring-modern-blue"
        />
        <button
          type="submit"
          className="w-full bg-modern-blue text-white py-2 rounded hover:bg-modern-charcoal transition"
        >
          Sign Up
        </button>
        <OAuth />
      </form>
      <p className="text-sm mt-4">
        Already have an account? <a href="/signin" className="text-modern-blue hover:underline">Sign In</a>
      </p>
    </div>
  );
}
