import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './hooks/UseContext.jsx';

import Header from './components/Header/Header.jsx';
import Home from './components/Main/Home.jsx';
import AddQuote from './components/Main/AddQuote.jsx';
import Favorites from './components/Main/Favorites.jsx';
import SearchPage from './components/Main/SearchPage.jsx';
import Footer from './components/Footer/Footer.jsx';

import './App.css';

const App = () => {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/post-quote" element={ <AddQuote /> } />
          <Route path="/favorites" element={ <Favorites /> } />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App;
