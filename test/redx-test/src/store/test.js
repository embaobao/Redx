import Redx  from './index.js'

var store=new Redx({
    state:{
        count:1
    }
    ,
    mutations:{
        setCount(state,{payload}) {
            return  {
                count:state.count+payload
            }
        }
    },
    actions:{
        asyncAddCount(that,{payload}) {
            //   console.log(that);
           setTimeout(
               () => {
               that. commit('setCount',payload)
               },1000
           )
        }
    }
})

// Method 1
// store.commit('setCount',{
//     payload:3
// })

// Method 2
// store.commit('setCount',4)

// Method 3

// store.commit({
//     type:'setCount',
//     payload:6
// })

// store.dispatch('asyncAddCount',
//     100
// )
// store.commit('setCount',{
//     payload:3
// })

// store.subscribe (function () {
//     console.log(1);
//    let  currentValue = store.getState()
//   console.log(currentValue);
// })()




export default store