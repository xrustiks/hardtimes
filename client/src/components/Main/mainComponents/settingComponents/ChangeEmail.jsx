import { useEffect } from 'react';

const ChangeEmail = () => {
  return (
    <div className="change-email">
      <form className="change-email-form">
        <label htmlFor="new-email">New email:</label>
        <input type="email" id="new-email" name="new-email" required />

        <label htmlFor="new-email-confirm">Confirm new email:</label>
        <input type="email" id="new-email-confirm" name="new-email-confirm" required />
        
        <button type="submit">Change email</button>
      </form>
    </div>
  );
}

export default ChangeEmail;