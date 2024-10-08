import SearchField from './SearchField.jsx';
import NavigationBar from './NavigationBar.jsx';
import Categories from './Categories.jsx';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <NavigationBar />
      <Categories />
      <SearchField />
    </div>
  )
}

export default Header;