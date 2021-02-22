/********************************
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 *******************************/
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// 为了chrome拓展插件: redux-devtools引入的
import {composeWithDevTools} from 'redux-devtools-extension';

// 经过combineReducers()汇总后的reducer
import reducers from './reducers';

// export default createStore(reducers, applyMiddleware(thunk));
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));