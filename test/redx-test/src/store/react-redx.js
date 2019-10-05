import React, { createContext } from 'react'
import store from './test'

const Context= createContext(store.getState())
const Provider=Context.Provider
const Consumer=Context.Consumer

const mapState=(Comp) => {
    return (props) => (
        <>
         <Consumer>{
          store=>(
            <Comp {...store.getState()} ></Comp>
          )
         }
         </Consumer>
        </>
    )
}

export{
    Provider,
    Consumer,
    mapState
}