import { useState } from 'react'
import './App.css'
import { ControlledForm } from './components/P1'
import { ValidationForm } from './components/P2'
import { AsyncForm } from './components/P3'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <ControlledForm/> */}
      {/* <ValidationForm/> */}
      <AsyncForm/>
    </>
  )
}

export default App
