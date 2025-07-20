import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import SignUp from './Components/SignUp.jsx'
import SignIn from './Components/SignIn.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <SignUp /> */}
  </StrictMode>
)
