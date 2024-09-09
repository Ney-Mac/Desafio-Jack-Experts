import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { RefreshProvider } from './contexts/RefreshContext.tsx'
import App from './App.tsx'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RefreshProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </RefreshProvider>
  </StrictMode>,
)
