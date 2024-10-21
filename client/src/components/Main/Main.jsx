import { Routes, Route } from 'react-router-dom';

import Home from './mainComponents/Home.jsx';
import AddQuote from './mainComponents/AddQuote.jsx';
import Favorites from './mainComponents/Favorites.jsx';
import SearchPage from './mainComponents/SearchPage.jsx';
import Login from './mainComponents/Login.jsx';
import Registration from './mainComponents/Registration.jsx';
import Profile from './mainComponents/Profile.jsx';

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/post-quote" element={ <AddQuote /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/search" element={ <SearchPage /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Registration /> } />
        <Route path="/profile" element={ <Profile /> } />
      </Routes>
    </div>
  )
}

export default Main;