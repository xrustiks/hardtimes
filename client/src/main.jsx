import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { FavoritesProvider } from './hooks/FavoritesContext.jsx';
import { CategoriesProvider } from './hooks/CategoriesContext.jsx';

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider>
      <CategoriesProvider>
        <App />
      </CategoriesProvider>
    </FavoritesProvider>
  </StrictMode>
)
