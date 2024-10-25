import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../hooks/UserContext.jsx';

const Settings = () => {
  const [user] = useContext(UserContext);

  return (
    <div className="settings">
      { user && <p>{ user.userName }s settings</p> }
      <div className="change-login"><Link to="/profile/settings/change-login">Change login</Link></div>
      <div className="change-email"><Link to="/profile/settings/change-email">Change email</Link></div>
      <div className="change-password"><Link to="/profile/settings/change-password">Change password</Link></div>
    </div>
  );
};

export default Settings;