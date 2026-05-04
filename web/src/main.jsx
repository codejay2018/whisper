import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'

const PUBLIC_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if(!PUBLIC_KEY) {
  throw new Error('Missing Clerk publishable key. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment variables.');
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Please ensure there is an element with id "root" in your index.html.');
}

const queryClient = new QueryClient();

createRoot(rootElement).render(
  <StrictMode>
   <ClerkProvider publishableKey={PUBLIC_KEY}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)