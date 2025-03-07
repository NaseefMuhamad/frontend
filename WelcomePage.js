// components/WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div>
      <h1>Welcome to Our Clubs Platform</h1>
      <p>Join our exciting community</p>
      <Link to="/dashboard">
        <button>Explore Clubs</button>
      </Link>
    </div>
  );
}

export default WelcomePage;