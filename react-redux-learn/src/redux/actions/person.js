import {ADD_PERSON} from '../constant';

// 同步action，本质是返回一个JSON格式，格式`{type:<action名称>, data:<data>}`
export const createAddPersonAction = (data) => ({type: ADD_PERSON, data});

// 异步action，本质是返回一个函数，该函数接收dispatch方法，在处理完异步后，调用dispath触发同步action
export const createAddPersonAsyncAction = (data) => {
    return (disaptch) => {
        // 用setTimeout模拟网络请求
        setTimeout(() => {
            disaptch(createAddPersonAction(data));
        }, 500);
    }
};