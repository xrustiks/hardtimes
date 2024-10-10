import { useEffect } from 'react';

import makeTitle from "../../utils/makeTitle.js";

const Favorites = () => {
  // Making title for the component
  useEffect(() => {
    makeTitle("Избранное");
  }, [])

  return (
    <div className="favorites-page">
      <h1>
        Избранные цитаты
      </h1>
    </div>
  )
}

export default Favorites;