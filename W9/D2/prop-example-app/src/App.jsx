import { useState } from 'react'
import './App.css'
import { PropBasics } from './components/P1'
import { PropDestructuring } from './components/P2';
import { PropsChildren } from './components/P3';
import { PropDrillingDemo } from './components/P4';
import { SharedStateParent } from './components/P5';
import { CompositionDemo } from './components/P6';
import { ObjectsAndArrayProps } from './components/P7';
import { PropsImmutability } from './components/P8';

function App() {
 return(
  <>
    {/* <PropBasics/> */}
    {/* <PropDestructuring/> */}
    {/* <PropsChildren/> */}
    {/* <PropDrillingDemo/> */}
    {/* <SharedStateParent/> */}
    {/* <CompositionDemo/> */}
    {/* <ObjectsAndArrayProps/> */}
    <PropsImmutability/>
  </>
 );
}

export default App
