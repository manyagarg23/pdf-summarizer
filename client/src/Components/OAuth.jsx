import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';

function OAuth() {
  const handleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log("User:", result.user.displayName, result.user.email);
    } catch (error) {
      console.error("Cannot sign in with Google", error);
    }
  };

  return (
    <button
      onClick={handleOAuth}
      className="w-full mt-4 bg-modern-blue text-white py-2 px-4 rounded hover:bg-modern-charcoal transition"
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
