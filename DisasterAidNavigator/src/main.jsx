import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HospitalContextProvider } from './context/HospitalContext.jsx'
import { RouteContextProvider } from './context/RouteContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

<RouteContextProvider>
  
    <HospitalContextProvider>
    <App/>
    </HospitalContextProvider>

    </RouteContextProvider>
 </StrictMode>
)
