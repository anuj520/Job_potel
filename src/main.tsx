import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Stair from './components/stairs.js'
import { AuthProvider } from './Context/contextAPI.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
       <Stair/> 
    <App />
    </AuthProvider>
  </StrictMode>,
)
