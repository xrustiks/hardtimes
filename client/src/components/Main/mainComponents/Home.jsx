import { useEffect } from 'react';

import makeTitle from "../../../utils/makeTitle.js";
import particlesjsConfig from "../../../assets/particlesjs-config.json";
import RandomQuote from "./RandomQuote.jsx";
import './Home.css';

const Home = () => {
  useEffect(() => {
    // Making title for the component
    makeTitle("Главная");

    // Due to particleJS connected as a script in index.html,
    // we need to check if it's available
    if (window.particlesJS) {
      // Initializing particlesJS with the config file
      window.particlesJS("particles-js", particlesjsConfig);
    }
  }, []);

  return (
    <div className="home-page">
      { /* ParticlesJS background */ }
      <div id="particles-js"></div>
      { /* RandomQuote component */ }
      <RandomQuote />
    </div>
  );
}

export default Home;
