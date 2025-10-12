import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import makeTitle from "../../../../utils/makeTitle.js";
import getApiUrl from '../../../../utils/apiConfig.js';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [freshPassword, setFreshPassword] = useState('');
  const [freshPasswordConfirm, setFreshPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Making title for the component
    makeTitle("Сменить пароль");
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

      const response = await fetch(getApiUrl('/api/profile/settings/change-password'), {
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
      <h2>Сменить пароль</h2>

      <form className="change-password-form" onSubmit={ handleSubmit }>
        <div className="old-password-group">
          <label htmlFor="old-password">Старый пароль:</label>
          <input 
            type="password"
            id="old-password"
            name="old-password"
            value={ oldPassword }
            onChange={ (e) => setOldPassword(e.target.value) }
            required 
          />
        </div>

        <div className="fresh-password-group">
          <label htmlFor="new-password">Новый пароль:</label>
          <input 
            type="password"
            id="new-password"
            name="new-password"
            value={ freshPassword }
            onChange={ (e) => setFreshPassword(e.target.value) }
          required />
        </div>
        
        <div className="fresh-password-confirm-group">
          <label htmlFor="new-password-confirm">Подтвердите новый пароль:</label>
          <input 
            type="password" 
            id="new-password-confirm" 
            name="new-password-confirm"
            value={ freshPasswordConfirm }
            onChange={ (e) => setFreshPasswordConfirm(e.target.value) }
          required />
        </div>
        
        <button type="submit">Готово</button>
      </form>

      <div className="result-message">
        { message && <p>{ message }</p> }
      </div>
    </div>
  );
}

export default ChangePassword;