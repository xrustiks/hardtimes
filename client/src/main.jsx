import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { FavoritesProvider } from './hooks/FavoritesContext.jsx';

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </StrictMode>
)
