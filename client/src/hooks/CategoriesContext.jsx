import { createContext, useState } from 'react';

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [chosenCategory, setChosenCategory] = useState('');

  return (
    <CategoriesContext.Provider value = {[ chosenCategory, setChosenCategory ]}>
      { children }
    </CategoriesContext.Provider>
  )
}