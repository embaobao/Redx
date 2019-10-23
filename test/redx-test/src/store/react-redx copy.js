import React, { createContext } from 'react'
import store from './test'


const Context= createContext(store.getState())
const Provider=Context.Provider
const Consumer=Context.Consumer

const mapState=(fn) => {
    let state =store.getState()
    let stateMap=fn(state)
    
    return (Comp) => {
        return (props) => (
            <>
                {/* <Comp {...stateMap }></Comp> */}
                <Consumer>
               {
                   store=>{
                        <Comp {...store.getState()} ></Comp>
                    }
               }
                   
                </Consumer>
            </>
        )
    }
   
}
// const connect=(mapState,mapComimit,mapDispatch) => {

// }

// const hasRedx=()=>{
     
// }


export{
    Provider,
    Consumer,
    mapState
}