import { useState } from 'react';

const ChangeLogin = () => {
  const newLogin = document.getElementById('new-login').value;

  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/profile/settings/change-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application'
      },
      body: JSON.stringify({
        newLogin
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    }
  }

  return (
    <div className="change-login">
      <form className="change-login-form">
        <label htmlFor="new-login">New login:</label>
        <input type="text" id="new-login" name="new-login" required />

        <label htmlFor="new-login-confirm">Confirm new login:</label>
        <input type="text" id="new-login-confirm" name="new-login-confirm" required />

        <button type="submit" onSubmit={ handleSubmit }>Change login</button>
      </form>
    </div>
  );
}

export default ChangeLogin;