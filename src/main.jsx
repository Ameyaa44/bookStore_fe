import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ContextApi from './contextApi/ContextApi.jsx'
import AuthContextApi from './contextApi/AuthContextApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider  clientId='758566927124-md6rsragmravii5pj4o20dmcumhcnbpk.apps.googleusercontent.com'>
    <ContextApi>
      <AuthContextApi>
    <App />
    </AuthContextApi>
    </ContextApi>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
