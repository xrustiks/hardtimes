import { useState, useEffect } from 'react';

import UserBar from './UserBar';
import LoginBar from './LoginBar';
import './LoginUserBar.css';

const LoginUserBar = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    localStorage.getItem('token') ? setIsLogin(true) : setIsLogin(false);
  }, []);

  return isLogin ? <UserBar /> : <LoginBar />;
}

export default LoginUserBar;