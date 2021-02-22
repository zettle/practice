import {ADD_PERSON} from '../constant';

const initState = [{id: 0, name: '小明'}];// 初始化
export default function person (preState = initState, action) {
    switch(action.type) {
        case ADD_PERSON: // 添加一个人
            // 不能写成，preState.unshift(data) 因为数组是应用复制，写成这样数组没变，redux检测不到变化
            return [action.data, ...preState];
        default: // 设置默认值
            return preState;
    } 
}