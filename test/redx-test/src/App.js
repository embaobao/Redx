import React, { useEffect, useState ,createContext} from 'react';

import { Provider } from './store/react-redx';
import logo from './logo.svg';
import './App.css';
import store from './store/test'
import Redx from './Redx';


 



function App() {
  const [count ,setCount]=useState(store.getState().count) 

  useEffect (() => {  
    store.subscribe(() => {
      setCount(store.getState().count)
  })

  },[])
  return (
    <Provider value={store}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{count} </p>
        <p>redx ----</p>
        <Redx></Redx>
        <a
          className="App-link"
          rel="noopener noreferrer"
          onClick={()=>{
            store.dispatch('asyncAddCount',100 )
          }}
        >
          add count
        </a>
      </header>
    </div>
    </Provider>
  );
}

export default App;
