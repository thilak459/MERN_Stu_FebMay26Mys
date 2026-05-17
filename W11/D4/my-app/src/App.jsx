import { useState } from 'react'
import './App.css'
import { ControlledForm } from './components/P1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ControlledForm/>
    </>
  )
}

export default App
