
import React, { createContext } from 'react'
import {Provider} from 'react-redux';
import store from '../store/test'

const hasRedx=(Comp) => {
   return (props) => (
     <Provider store={store.store}>
        <Comp></Comp>
     </Provider>
   )
}


const mapStore=(mapFn) => {
    const   propsMap =mapFn&& mapFn(store.getState(),store.mutations,store.actions)
    return (Comp) => ((props) => ( <Comp {...props}  {...propsMap} ></Comp>))
}

const mapActions=(actionArray)=>{

  // console.log(actionArray);
   let propsAction={}
   actionArray.map((actionName) => {
      propsAction[actionName]=function(){
        store.dispatch.apply(store,[actionName,...arguments])
      }
   })
  //  console.log(propsAction);
   return (Comp) => ((props) => ( <Comp {...props} {...propsAction} ></Comp>))
}

const mapState=(stateArray)=>{
// console.log(actionArray);
   let data={}
   stateArray.map((stateName) => {
     data[stateName]=store.getState()[stateName]
   })

   data= new Proxy(data,{
        get :function (arget, propKey, receiver){
          // console.log(arget);
          // console.log(propKey);
          return  store.getState()[propKey]
        }
     })

      // console.log(data);
  //  console.log(propsAction);
   return (Comp) => ((props) => ( <Comp {...props} stateData={data} ></Comp>))
}

const mapMutations=(mutationsArray)=>{

   let propsMutations={}
   mutationsArray.map((mutationName) => {
      propsMutations[mutationName]=function(){
        store.commit.apply(store,[mutationName,...arguments])
      }
   })
   return (Comp) => ((props) => ( <Comp {...props} {...propsMutations} ></Comp>))
}

export {
    hasRedx,
    mapStore,
    mapActions,
    mapState,
    mapMutations
}