import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-xl font-bold text-white">PDF Analyzer</h1>
      <button
      className="text-white px-4 py-2 rounded transition font-medium hover:opacity-90"
      style={{ backgroundColor: '#903729' }}
      onMouseEnter={e => (e.target.style.backgroundColor = '#4f5e62')}
      onMouseLeave={e => (e.target.style.backgroundColor = '#903729')}
      onClick={() => navigate('/signin')}
      >
        Sign In
      </button>
    </div>
  );
}

export default NavBar;
