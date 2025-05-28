import './Footer.css';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="footer">
      { /* Displaying 'Press R' only on the home page */ }
      { isHomePage && <div className="press-r">Нажмите R</div> }

      <div className="footer-caption">Всё это уже много раз случалось до тебя.</div>
    </div>
  );
};

export default Footer;