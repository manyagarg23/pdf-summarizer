import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function OAuth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Open Google sign-in popup
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const name = result.user.displayName;
      const googleId = result.user.uid;

      // Send data to your backend for registration/login
      const res = await axios.post("http://localhost:5000/google", {
        email,
        name,
        googleId
      });

      // Set the logged-in user globally (like in email signup)
      login({ name, email });

      // Navigate to homepage
      navigate('/');
    } catch (error) {
      console.error("OAuth login failed:", error);
      alert("Google sign-in failed. Please try again.");
    }
  };

  return (
    <>
     {/* Google OAuth Button */}
         <button
          type="button"
          onClick={handleOAuth}
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
            <path fill="currentColor" d="M12 1C7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53 1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1z"/>
          </svg>
          Continue with Google
        </button>
    </>
  );
}

export default OAuth;
