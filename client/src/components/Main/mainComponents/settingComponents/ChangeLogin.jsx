import { useState } from 'react';

const ChangeLogin = () => {
  const [ message, setMessage ] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/profile/settings/change-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application'
      },
      body: JSON.stringify({ newLogin })
    });

    
    if (response.ok) {
      const result = await response.json();
      setMessage(result.message);
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