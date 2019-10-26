import { applyMiddleware, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import _ from 'lodash'
import chalk  from 'chalk' ;




/**
 * Redx 为redux 扩展使用的类
 * 
 */
class Redx{
    constructor ({
        state,
        mutations,
        actions
    }){
        //初始化 status
        this.intiailizeState=state
        //  mutations  对象
        this.mutations=mutations
        // actions 对象
        this.actions=actions
        // state 状态旅行记录
        this.stateChangeList=[ this.intiailizeState]
        // 给state 设置代理器
        this.state=new Proxy(
            state,
            {
                get : (target, key, receiver) => {
                  console.log( this.store.getState());  
                 return Reflect.get(target, key, receiver);
                },
                set:(target, key, value, receiver) => {
                    this.stateChangeList.push(value)
                    console.log(this.stateChangeList);
                    console.log(target, key, value, receiver);
                    return Reflect.set(target, key, value, receiver);
                }
            })

        this.distribute=this.distribute
        this.commit=this.commit
        this.dispatch=this.dispatch
        this.subscribe=this.subscribe
              //创建store
        this.store=createStore(
            this.reducerCretor({
                mutations,
                actions
             }),
             state,
             //引入thunk
             applyMiddleware(reduxThunk)
        )


        //测试代码 暴露store
        window.store=this
     
    }


    //创建reducer 
    reducerCretor({mutations,actions}){

        function  mutationExecutor(state,action){
            let {type}= action
             if(mutations[type]) {
                let sta = mutations[type](state, action)
                return sta
             }
             return false
        }

       

        let  excutor=(state,action)=>{

             let {type,method}= action
             if(method==='dispatch'){
                if(type  in  actions ) {
                    //调用thunk 
                   this.store.dispatch(
                        (commit)=>{
                        //    console.log(this);
                          actions[type](this ,action)
                        }
                   )
                  // this.commit(
                  //     // 异步问题！！！！！！！待解决
                  // )
                  //   this.store.dispatch( actions[type](this ,action))
                }
             }

             if(method==='mutate'){
                  return  mutationExecutor(state,action) 
             }
        }

        return  (state,action)=>{
            
            return  excutor(state,action) ||state


            // return  mutationExecutor(state,action) ||state

            // if(method==='dispath') {
            //     return ActionExcutor(type,state)||state
            // }
            // else{
            //   return  mutationExecutor(type,state) ||state
            // }
        }
    }
   
    //派发    
    distribute(type,action,method){
      if ( arguments.length<=0) return false
        //   console.log(arguments);
        let distributeDadta={}
         method=method?'dispatch' : 'mutate'
        //如果type是字符串
        if( _.isString(type))
        {
            //如果action 是扁平对象 展开传递
            distributeDadta=  _.isPlainObject(action)?{
                ...action,
                type:type,
                method,
            }  //如果action不是 放入payload 属性进行传递
            :{
                type:type,
                method,
                payload:action
            }
      
        }  //如果type不是字符串
        else{
            if( _.isPlainObject(type)){
                if ('type' in type){
                    distributeDadta=type
                }
               else{

                    console.log(chalk.blue('对象中')+ chalk.red('要包含 type 属性')+chalk.blue('才能派发!'));
                    throw new TypeError
                    (`The dispatch object must have a type attribute To distribute `)
               }
            }else{
                 throw new TypeError( "If you want to distribute , The first  variable  must be a string or PlainObject  ")
            }
        }


        return this.store.dispatch(distributeDadta)
    }

    // store 同步派发改变为提交
    commit(){
          //调用distribute 派发方法进行派发
        return this.distribute.apply(this, arguments)
    }
    // store 异步派发
    dispatch(type,action){
        //调用distribute 派发方法进行派发
          return this.distribute.apply (this, [...arguments,'dispatch'])
    }
    // 获取state
    getState(){
        return this.store.getState()
    }
    //订阅
    subscribe(){
        return   this.store.subscribe.apply(this,arguments)
    }
}

export default Redx