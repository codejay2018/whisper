import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'

const PUBLIC_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if(!PUBLIC_KEY) {
  throw new Error('Missing Clerk publishable key. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment variables.');
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Please ensure there is an element with id "root" in your index.html.');
}

createRoot(rootElement).render(
  <StrictMode>
   <ClerkProvider publishableKey={PUBLIC_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)