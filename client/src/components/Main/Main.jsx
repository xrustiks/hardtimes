import { Routes, Route } from 'react-router-dom';

import Home from './mainComponents/Home.jsx';
import AddQuote from './mainComponents/AddQuote.jsx';
import Favorites from './mainComponents/Favorites.jsx';
import SearchPage from './mainComponents/SearchPage.jsx';

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/post-quote" element={ <AddQuote /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/search" element={ <SearchPage /> } />
      </Routes>
    </div>
  )
}

export default Main;