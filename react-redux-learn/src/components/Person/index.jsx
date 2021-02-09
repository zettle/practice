import React, { Component } from 'react'
import { connect } from 'react-redux';
import {createAddPersonAsyncAction} from '../../redux/actions/person';

class Person extends Component {
    state = {
        cname: ''
    }
    change (ev) {
        this.setState({
            cname: ev.target.value
        });
    } 
    add () {
        this.props.addPersonAsync({
            id: this.props.list.length,
            name: this.state.cname
        });
        this.setState({ cname: '' });
    }
    render() {
        const {num, list} = this.props;
        const {cname} = this.state;
        return (
            <div>
                <p>这是Person组件，上面计算结果是{num}</p>
                <div>
                    <input value={cname} onChange={ev=>this.change(ev)} type="text"/>
                    <button onClick={()=>this.add()}>添加</button>
                </div>
                <ul>
                    {list.map(person => {
                        return (<li key={person.id}>{person.name}</li>);
                    })}
                </ul>
            </div>
        )
    }
}

// 要是用redux里面的数据，需要再用connet包装一层
export default connect(
    // 第1个参数映射的数据状态
    (state) => ({
        num: state.myCount,
        list: state.person
    }),
    // 第2个参数映射的是动作
    {
        addPersonAsync: personInfo => createAddPersonAsyncAction(personInfo)
    }
)(Person);