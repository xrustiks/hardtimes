import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="settings-page">
      <div className="change-login"><Link to="/profile/settings/change-login">Сменить имя пользователя</Link></div>
      <div className="change-email"><Link to="/profile/settings/change-email">Сменить почту</Link></div>
      <div className="change-password"><Link to="/profile/settings/change-password">Сменить пароль</Link></div>
    </div>
  );
};

export default Settings;