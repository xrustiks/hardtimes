import { BrowserRouter, useLocation } from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';

import './App.css';

// Container for the whole app 
// that will change the layout depending on the location
const AppContainer = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    // Adding a second class depending on the location
    <div className={ `app-container ${ isHome ? 'home-layout' : 'default-layout' }` }>
      { children }
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Main />
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
};

export default App;
