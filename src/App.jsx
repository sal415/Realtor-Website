import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 className = 'text-2xl bg-red-400'>hello world</h1>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      

    </div>
  )
}

export default App
