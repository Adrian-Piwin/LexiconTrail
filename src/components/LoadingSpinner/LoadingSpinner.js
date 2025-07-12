import React from 'react';
import './LoadingSpinner.css';

/**
 * Simple loading spinner component
 * @param {Object} props
 * @param {string} props.message - Optional message to display with the spinner
 * @param {string} props.size - Size of the spinner ('small', 'medium', 'large')
 */
const LoadingSpinner = ({ message = 'Loading...', size = 'medium' }) => {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className="loading-spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner; 
