import { useState } from 'react';

const ChangeLogin = () => {
  const [ freshLogin, setFreshLogin ] = useState('');
  const [ freshLoginConfirm, setFreshLoginConfirm ] = useState('');
  const [ message, setMessage ] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      // Check if the logins match
      if (freshLogin !== freshLoginConfirm) {
        setMessage('Logins do not match');
        return;
      }

      const response = await fetch('http://localhost:3000/api/profile/settings/change-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ freshLogin: freshLogin })
      });

      const result = await response.json();

      if (response.ok) {
        setFreshLogin('');
        setFreshLoginConfirm('');
        
        setMessage(result.message);
      } else {
        setMessage(result.message || 'Failed to change login');
      }
    } catch(error) {
      setMessage(`Network error: ${error.message}. Please try again later.`);
    }
  }

  return (
    <div className="change-login">
      <form className="change-login-form" onSubmit={ handleSubmit }>
        <label htmlFor="new-login">New login:</label>
        <input 
          type="text" 
          id="new-login" 
          name="new-login"
          value={ freshLogin }
          onChange={ (e) => setFreshLogin(e.target.value) }
          required 
        />

        <label htmlFor="new-login-confirm">Confirm new login:</label>
        <input 
          type="text" 
          id="new-login-confirm" 
          name="new-login-confirm" 
          value={ freshLoginConfirm }
          onChange={ (e) => setFreshLoginConfirm(e.target.value) }
          required 
        />

        <button type="submit">Change login</button>
      </form>
      { message && <p>{ message }</p> }
    </div>
  );
}

export default ChangeLogin;