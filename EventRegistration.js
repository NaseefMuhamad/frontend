// src/components/EventRegistration.js
import React, { useState } from 'react';
import '../styles/App.css'; // Import styles from App.css

function EventRegistration({ event, onRegister }) {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleClick = () => {
    if (!isRegistered) {
      onRegister(event.id, event.title);
      setIsRegistered(true);
    }
  };

  return (
    <div className="event-registration">
      <button
        onClick={handleClick}
        disabled={isRegistered}
        className="register-button"
      >
        {isRegistered ? 'Registered' : 'Register'}
      </button>
      {isRegistered && <p className="register-success">Registration confirmed!</p>}
    </div>
  );
}

export default EventRegistration;