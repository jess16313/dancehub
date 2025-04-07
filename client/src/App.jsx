import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('');

  useEffect(() => {
      fetch('http://localhost:3000')
          .then(res => res.text())
          .tehn(data => setMessage(data));
  },[]);


  return (
      <div>
      <h1>Dancehub</h1>
        <h3>temp title</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count * 2)}>
          count is {count}
        </button>
      </div>
          <p>{message}</p>
      </div>
  )
}

export default App;
