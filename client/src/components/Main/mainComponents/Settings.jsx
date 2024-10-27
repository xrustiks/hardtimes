import { Link } from 'react-router-dom';

const Settings = () => {

  return (
    <div className="settings">
      <div className="change-login"><Link to="/profile/settings/change-login">Change login</Link></div>
      <div className="change-email"><Link to="/profile/settings/change-email">Change email</Link></div>
      <div className="change-password"><Link to="/profile/settings/change-password">Change password</Link></div>
    </div>
  );
};

export default Settings;