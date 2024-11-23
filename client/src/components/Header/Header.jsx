import SearchField from './headerComponents/SearchField.jsx';
import NavigationBar from './headerComponents/NavigationBar.jsx';
import Categories from './headerComponents/Categories.jsx';
import LoginUserBar from './headerComponents/LoginUserBar.jsx';
import AppTitle from './headerComponents/AppTitle.jsx';

const Header = () => {
  return (
    <div className="header">
      <div className="header-panel">
        <div className="header-panel__left">
          <NavigationBar />
          <Categories />
        </div>

        <div className="header-panel__right">
          <SearchField />
          <LoginUserBar />
        </div>
      </div>
      <AppTitle />
    </div>
  )
}

export default Header;