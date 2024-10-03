import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home.jsx';
import AddQuote from './components/AddQuote.jsx';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/add-quote" element={ <AddQuote /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
