import { useEffect } from 'react';

const ChangePassword = () => {
  return (
    <div className="change-password">
      <form className="change-password-form">
        <label htmlFor="old-password">Old password:</label>
        <input type="password" id="old-password" name="old-password" required />

        <label htmlFor="new-password">New password:</label>
        <input type="password" id="new-password" name="new-password" required />

        <label htmlFor="new-password-confirm">Confirm new password:</label>
        <input type="password" id="new-password-confirm" name="new-password-confirm" required />
        
        <button type="submit">Change password</button>
      </form>
    </div>
  );
}

export default ChangePassword;