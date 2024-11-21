import SearchField from './headerComponents/SearchField.jsx';
import NavigationBar from './headerComponents/NavigationBar.jsx';
import Categories from './headerComponents/Categories.jsx';
import LoginUserBar from './headerComponents/LoginUserBar.jsx';
import AppTitle from './headerComponents/AppTitle.jsx';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <NavigationBar />
      <Categories />
      <AppTitle />
      <SearchField />
      <LoginUserBar />
    </div>
  )
}

export default Header;