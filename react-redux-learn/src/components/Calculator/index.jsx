import React, { Component } from 'react'
import {connect} from 'react-redux';
import {createAddAction} from '../../redux/actions/count';

class Count extends Component {
    state = {
        num: 0
    }
    add () {
        // 调用下面connect定义好的dispatch
        this.props.jia(2);
    }
    render() {
        console.log(this.props);
        const {num, personLen} = this.props;
        return (
            <div>
                <p>这是Calculator组件，下面组件人数:{personLen}</p>
                <p>计算结果: {num}</p>
                <button onClick={()=>this.add()}>计算+2</button>
            </div>
        )
    }
}
export default connect(
    // (state) => {
    //     console.log(state);
    //     return {  
    //         num: state.myCount
    //     };
    // },
    // // store的dispatch这里的返回值将作为props传递`<Count>`组件
    // (dispatch) => {
    //     return {
    //         jia: (data) => dispatch(createAddAction(data))
    //     };
    // }

    // 上面的可以简写为
    // store的state数据，这里的返回值将作为props传递`<Count>`组件
    state => ({
        num: state.myCount,
        personLen: state.person.length
    }),
    // 既可以用上面的函数写法，可以写成这种json写法
    {
        jia: (data) => createAddAction(data) // redux发现这里是一个action，就会自动去派发
    }
)(Count);