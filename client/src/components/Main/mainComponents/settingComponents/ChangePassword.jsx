import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import makeTitle from "../../../../utils/makeTitle.js";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [freshPassword, setFreshPassword] = useState('');
  const [freshPasswordConfirm, setFreshPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Making title for the component
    makeTitle("Change password");
   // If a user is authenticated, redirect to the login page
   if (!token) {
    navigate('/login');
    return;
  }
}, [token, navigate])

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      // Check if the passwords match
      if (freshPassword !== freshPasswordConfirm) {
        setMessage('Passwords do not match');
        return;
      }

      if (!token) {
        setMessage('No token provided');
        return;
      }

      const response = await fetch('http://localhost:3000/api/profile/settings/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${ token }`
        },
        body: JSON.stringify({ oldPassword: oldPassword, freshPassword: freshPassword })
      });

      const result = await response.json();

      if (response.ok) {
        setOldPassword('');
        setFreshPassword('');
        setFreshPasswordConfirm('');
        
        setMessage(result.message);
      } else {
        setMessage(result.message || 'Failed to change password');
      }
    } catch(error) {
      setMessage(`Network error: ${error.message}. Please try again later.`);
    }
  }

  return (
    <div className="change-password">
      <form className="change-password-form" onSubmit={ handleSubmit }>
        <label htmlFor="old-password">Old password:</label>
        <input 
          type="password"
          id="old-password"
          name="old-password"
          value={ oldPassword }
          onChange={ (e) => setOldPassword(e.target.value) }
          required 
        />

        <label htmlFor="new-password">New password:</label>
        <input 
          type="password"
          id="new-password"
          name="new-password"
          value={ freshPassword }
          onChange={ (e) => setFreshPassword(e.target.value) }
        required />

        <label htmlFor="new-password-confirm">Confirm new password:</label>
        <input 
          type="password" 
          id="new-password-confirm" 
          name="new-password-confirm"
          value={ freshPasswordConfirm }
          onChange={ (e) => setFreshPasswordConfirm(e.target.value) }
        required />
        
        <button type="submit">Change password</button>
      </form>

      { message && <p>{ message }</p> }
    </div>
  );
}

export default ChangePassword;