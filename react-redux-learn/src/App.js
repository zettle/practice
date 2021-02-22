import React, { Component } from 'react';
import Calculator from './components/Calculator';
import Person from './components/Person';

export default class App extends Component {
    render() {
        return (
            <div>
                <Calculator></Calculator>
                <hr/>
                <Person></Person>
            </div>
        )
    }
}
