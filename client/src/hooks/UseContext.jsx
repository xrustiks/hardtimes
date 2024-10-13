import React, { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [quoteProperties, setQuoteProperties] = useState({
    quote: '',
    author: '',
    category: '',
    origin: ''
  });


  return (
    <Context.Provider 
      value = { quoteProperties }>
        { children }
    </Context.Provider>
  )
}