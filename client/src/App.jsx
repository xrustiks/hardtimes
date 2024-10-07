import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/UseContext.jsx';

import Home from './components/Home.jsx';
import AddQuote from './components/AddQuote.jsx';
import './App.css';

const App = () => {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/add-quote" element={ <AddQuote /> } />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App;
