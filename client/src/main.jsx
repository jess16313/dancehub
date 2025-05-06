import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@fontsource/redaction-35'
import './index.css'
import App from './App.jsx'
import Home from './pages/home.jsx'
import LogIn from './pages/log-in.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/login" element={<LogIn/>}/>
        </Routes>
  </StrictMode>
  </BrowserRouter>
)
