import { Link } from 'react-router-dom';

import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <div className="nav-bar">
      <Link to="/">Главная</Link>
      <Link to="/add-quote">Добавить цитату</Link>
      <Link to="/favorites">Избранные цитаты</Link>
    </div>
  )
}

export default NavigationBar;