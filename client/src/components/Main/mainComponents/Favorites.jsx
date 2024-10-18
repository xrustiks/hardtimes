import { useEffect } from 'react';

import makeTitle from "../../../utils/makeTitle.js";

const Favorites = () => {
  useEffect(() => {
    // Making title for the component
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