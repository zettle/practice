import {INCREMENT} from '../constant'
// 创建{type:'increment', data}的action
export function createAddAction (data) {
    return {type:INCREMENT, data};
}