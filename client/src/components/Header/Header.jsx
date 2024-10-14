import SearchField from './headerComponents/SearchField.jsx';
import NavigationBar from './headerComponents/NavigationBar.jsx';
import Categories from './headerComponents/Categories.jsx';
import LoginBar from './headerComponents/LoginBar.jsx';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <NavigationBar />
      <Categories />
      <SearchField />
      <LoginBar />
    </div>
  )
}

export default Header;