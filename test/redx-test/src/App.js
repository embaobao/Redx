import React, { useEffect, useState ,createContext} from 'react';

import logo from './logo.svg';
import './App.css';

import { hasRedx } from './store/react-redx';

import Test from './Test';
import Redx from './Redx';
import store from './store/test';


 
function App() {
  const [count ,setCount]=useState(store.getState().count) 
  useEffect (() => {  
    store.subscribe(() => {
      setCount(store.getState().count)
  })

  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{count} </p>
        <p>redx ----</p>
        <Redx></Redx>
        <Test></Test>
        <a
          onClick={()=>{
            store.dispatch('asyncAddCount',100 )
          }}
        >
          add count
        </a>
      </header>
    </div>
  );
}

export default hasRedx(App) 
