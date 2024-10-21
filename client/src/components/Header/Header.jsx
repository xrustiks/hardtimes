import SearchField from './headerComponents/SearchField.jsx';
import NavigationBar from './headerComponents/NavigationBar.jsx';
import Categories from './headerComponents/Categories.jsx';
import LoginUserBar from './headerComponents/LoginUserBar.jsx';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <NavigationBar />
      <Categories />
      <SearchField />
      <LoginUserBar />
    </div>
  )
}

export default Header;