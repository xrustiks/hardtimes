import { useState } from 'react';

const ChangeLogin = () => {
  const [ message, setMessage ] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const freshLogin = e.target['new-login'].value;
      const freshLoginConfirm = e.target['new-login-confirm'].value;

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
        e.target['new-login'].value = '';
        e.target['new-login-confirm'].value = '';

        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    } catch(error) {
      setMessage(`Network error: ${error.message}. Please try again later.`);
    }
  }

  return (
    <div className="change-login">
      <form className="change-login-form" onSubmit={ handleSubmit }>
        <label htmlFor="new-login">New login:</label>
        <input type="text" id="new-login" name="new-login" required />

        <label htmlFor="new-login-confirm">Confirm new login:</label>
        <input type="text" id="new-login-confirm" name="new-login-confirm" required />

        <button type="submit">Change login</button>
      </form>
      { message && <p>{ message }</p> }
    </div>
  );
}

export default ChangeLogin;