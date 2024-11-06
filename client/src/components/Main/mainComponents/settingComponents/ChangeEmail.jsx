import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import makeTitle from "../../../../utils/makeTitle.js";

const ChangeEmail = () => {
  const [freshEmail, setFreshEmail] = useState('');
  const [freshEmailConfirm, setFreshEmailConfirm] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Making title for the component
    makeTitle("Change email");
    // If a user is authenticated, redirect to the login page
    if (!token) {
      navigate('/login');
      return;
    }
  }, [token, navigate])

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      // Check if the emails match
      if (freshEmail !== freshEmailConfirm) {
        setMessage('Emails do not match');
        return;
      }

      if (!token) {
        setMessage('No token provided');
        return;
      }

      const response = await fetch('http://localhost:3000/api/profile/settings/change-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${ token }`
        },
        body: JSON.stringify({ freshEmail: freshEmail })
      });

      const result = await response.json();

      if (response.ok) {
        setFreshEmail('');
        setFreshEmailConfirm('');
        
        setMessage(result.message);

        localStorage.setItem('token', result.token);
      } else {
        setMessage(result.message || 'Failed to change login');
      }
    } catch(error) {
      setMessage(`Network error: ${error.message}. Please try again later.`);
    }
  }

  return (
    <div className="change-email">
      <form className="change-email-form" onSubmit={ handleSubmit }>
        <label htmlFor="new-email">Новый email:</label>
        <input 
          type="email" 
          id="new-email" 
          name="new-email" 
          value={ freshEmail }
          onChange={ (e) => setFreshEmail(e.target.value) }
          required 
        />

        <label htmlFor="new-email-confirm">Подтвердить новый email:</label>
        <input 
          type="email" 
          id="new-email-confirm" 
          name="new-email-confirm"
          value={ freshEmailConfirm }
          onChange={ (e) => setFreshEmailConfirm(e.target.value) }
          required 
        />
        
        <button type="submit">Готово</button>
      </form>

      { message && <p>{ message }</p> }
    </div>
  );
}

export default ChangeEmail;