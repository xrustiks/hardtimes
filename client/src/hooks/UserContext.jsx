import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // State that contains favorites data
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    // Favorites are saved in localStorage with every change
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <UserContext.Provider value = {[ favorites, setFavorites ]}>
        { children }
    </UserContext.Provider>
  )
}