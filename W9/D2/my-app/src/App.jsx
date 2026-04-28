import { useState } from 'react'
import './App.css'
import { FunctionName } from './components/FunctionalCompOne'
import { FunctionalComponentsBasics } from './components/FunctionalComponentsBasics'
import { ClassComponentsBasics } from './components/ClassComponentsBasics'
import { FunctionComp } from './components/FunctionalComponentsAdv'

function App() {

  return (
    // Fragment in react : <> </>
    <>
     {/* <FunctionName/> Component name */}
     {/* <FunctionalComponentsBasics/> */}
     {/* <ClassComponentsBasics/> */}
     <FunctionComp/>
    </>
  )
}

export default App
