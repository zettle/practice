import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './redux/store';


ReactDOM.render(
  <React.StrictMode>
    {/* 此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

