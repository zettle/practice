import { createStore } from 'vuex';

export interface TodoType {
    label: string;
    isFinshed: boolean;
}

export interface StateType {
    userName: string;
    todoList: TodoType[]
}

export default createStore<StateType>({
    state: {
        userName: '小明',
        todoList: []
    },
    mutations: {
        save (state: StateType, label: string) {
            state.todoList.push({ label, isFinshed: false });
        },
        update (state: StateType, index: number) {
            state.todoList[index].isFinshed = !state.todoList[index].isFinshed;
            console.log(state.todoList[index]);
        },
        del(state: StateType, index: number) {
            state.todoList.splice(index, 1);
        }
    }
});