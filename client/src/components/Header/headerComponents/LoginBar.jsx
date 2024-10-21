import { Link } from 'react-router-dom';

const LoginBar = () => {
  return (
    <div className="login-bar">
      <Link to="login">Логин</Link>
      <Link to="register">Зарегистрироваться</Link>
    </div>
  )
}

export default LoginBar;