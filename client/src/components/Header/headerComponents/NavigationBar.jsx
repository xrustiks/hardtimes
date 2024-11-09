import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css';

const NavigationBar = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    localStorage.getItem('token') ? setIsLogin(true) : setIsLogin(false);
  }, []);

  return (
    <div className="nav-bar">
      <Link to="/">Главная</Link>
      {isLogin && <Link to="/favorites">Избранные цитаты</Link>}
    </div>
  )
}

export default NavigationBar;