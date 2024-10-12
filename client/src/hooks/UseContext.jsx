import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [quoteProperties, setQuoteProperties] = useState({
    quote: '',
    author: '',
    category: '',
    origin: ''
  });


  return (
    <FavoritesContext.Provider 
      value = { quoteProperties }>
        { children }
    </FavoritesContext.Provider>
  )
}