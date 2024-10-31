import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { UserProvider } from './hooks/UserContext.jsx';

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
)
