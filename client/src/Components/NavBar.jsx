import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const activeLink = "underline text-modern-cream font-semibold";

  return (
    <nav className="bg-modern-blue text-white px-6 py-4 shadow flex justify-between items-center">
      <h2 className="text-xl font-bold">PDF Summarizer</h2>
      <div className="space-x-4">
        <Link to="/signup" className={location.pathname === "/signup" ? activeLink : "hover:underline"}>
          Sign Up
        </Link>
        <Link to="/upload" className={location.pathname === "/upload" ? activeLink : "hover:underline"}>
          Upload
        </Link> 
        <Link to="/question" className={location.pathname === "/question" ? activeLink : "hover:underline"}>
          Q&A
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
