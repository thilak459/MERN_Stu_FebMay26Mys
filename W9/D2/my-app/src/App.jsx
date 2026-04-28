import { useState } from 'react'
import './App.css'
import { FunctionName } from './components/FunctionalCompOne'
import { FunctionalComponentsBasics } from './components/FunctionalComponentsBasics'
import { ClassComponentsBasics } from './components/ClassComponentsBasics'
import { FunctionComp } from './components/FunctionalComponentsAdv'
import { ClassComponentState } from './components/ClassComponentState'

function App() {

  return (
    // Fragment in react : <> </>
    <>
     {/* <FunctionName/> Component name */}
     {/* <FunctionalComponentsBasics/> */}
     {/* <ClassComponentsBasics/> */}
     {/* <FunctionComp/> */}
    <ClassComponentState />
    </>
  )
}

export default App
