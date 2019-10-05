import React, { Component,createContext } from 'react'
import { Consumer, Provider,mapState } from './store/react-redx'
import store from './store/test';

class Redx  extends Component {
    state={

    }
    render() {
        return (
            
                <div>
                    <p>哈哈 </p>
                    {/* <Consumer>
                    {soter => (
                        <p>Redx{store.getState().count} </p>
                    )}
                    </Consumer> */}
                    {
                        this.props.count
                    }
                </div>
       
        )
    }
    componentDidMount(){
        console.log(this.props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps);
        return prevState
    }
    
}




export default mapState(Redx) 