import { Routes, Route } from 'react-router-dom';

import Home from './mainComponents/Home.jsx';
import AddQuote from './mainComponents/AddQuote.jsx';
import Favorites from './mainComponents/Favorites.jsx';
import SearchPage from './mainComponents/SearchPage.jsx';
import Login from './mainComponents/Login.jsx';
import Registration from './mainComponents/Registration.jsx';
import Profile from './mainComponents/Profile.jsx';
import Logout from './mainComponents/Logout.jsx';
// import Settings from './mainComponents/Settings.jsx';
import ChangeLogin from './mainComponents/settingComponents/ChangeLogin.jsx';
import ChangeEmail from './mainComponents/settingComponents/ChangeEmail.jsx';
import ChangePassword from './mainComponents/settingComponents/ChangePassword.jsx';
import './Main.css';

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/post-quote" element={ <AddQuote /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/search" element={ <SearchPage /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Registration /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/logout" element={ <Logout /> } />
        {/* <Route path="/profile/settings" element={ <Settings /> } /> */}
        <Route path="/profile/settings/change-login" element={ <ChangeLogin /> } />
        <Route path="/profile/settings/change-email" element={ <ChangeEmail /> } />
        <Route path="/profile/settings/change-password" element={ <ChangePassword /> } />
      </Routes>
    </main>
  )
}

export default Main;