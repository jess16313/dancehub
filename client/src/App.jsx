import { useState } from 'react'
import './App.css'
import WaveCanvas from "./assets/wave.jsx";
import Navbar from "./assets/nav-bar.jsx";
function App() {

  return (
      <>
          <Navbar/>
      <div>
          <WaveCanvas/>
            <h1>Welcome to Dancehub</h1>
      </div>
      </>
  )
}

export default App;
