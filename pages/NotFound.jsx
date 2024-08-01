import React from 'react';
import './style/notfound.css'; // Import the CSS file

export default function NotFound(){
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist. Please update relevent path.</p>
    </div>
  );
};