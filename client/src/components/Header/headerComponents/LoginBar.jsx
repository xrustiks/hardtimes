import { Link } from 'react-router-dom';

import './LoginBar.css';

const LoginBar = () => {
  return (
    <div className="login-bar">
      <Link to="#">Логин</Link>
      <Link to="register">Зарегистрироваться</Link>
    </div>
  )
}

export default LoginBar;