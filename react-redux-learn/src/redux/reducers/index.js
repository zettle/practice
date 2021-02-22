/********************************
 * 引入combineReducers，用于汇总多个reducer
 *******************************/
import {combineReducers} from 'redux';

import count from './count';
import person from './person';

// 汇总所有的reducer变为一个总的reducer
export default combineReducers({
    myCount: count, // 这里的key在页面使用connect创建连接时候使用
    person
});