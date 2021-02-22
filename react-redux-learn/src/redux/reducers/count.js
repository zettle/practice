/********************************
 * 1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
 * 2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
 *     - action是一个JSON结构，格式 {type:<action名>, data: <数据>}
 *******************************/
import { INCREMENT } from '../constant';

const initState = 0;
export default function count (preState = initState, action) {
    // 根据type决定如何加工数据，action.type=指定值的说明是页面发来的，没有action的说明是初始化
    switch(action.type) {
        case INCREMENT:
            return preState + action.data;
        // case ...:
        //     return ...;
        default:
            return preState;
    }
}