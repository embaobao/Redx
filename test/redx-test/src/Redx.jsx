import React, { Component,createContext } from 'react'
import { mapStore, hasRedx, mapActions, mapState,mapMutations } from './store/react-redx';



class Redx  extends Component {

    state={}
    render() {

        mapStore()
        return (
                <div>
                    <p>proxy {this.props.stateData.count} </p>
                </div>
        )
    }
    componentDidMount(){
        this.props.setCount(12)
        // console.log(this.props);
        //console.log(this.props.stateData.count);
        //this.props.asyncAddCount(100)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps);
        return prevState
    }
    
}




Redx= mapStore ((s,m,a) => {
    return{
      state:  s,
      mutations: m,
      actions: a}
})(Redx)

Redx=mapActions(['asyncAddCount'])(Redx)
Redx=mapState(['count'])(Redx)
Redx=mapMutations(['setCount'])(Redx)

export default   Redx

