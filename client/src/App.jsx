import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/UseContext.jsx';

import Header from './components//Header/Header.jsx'
import Home from './components/Main/Home.jsx';
import AddQuote from './components/Main/AddQuote.jsx';
import './App.css';

const App = () => {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/add-quote" element={ <AddQuote /> } />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App;
