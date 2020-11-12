import { provide, inject, ref, Ref } from 'vue';

const StoreSymbol = Symbol(); // 生成一个唯一的key

export function provideSotre(store: Ref<string>) {
    provide(StoreSymbol, store);
}

export function useStore() {
    const store = inject(StoreSymbol, ref('')); // 初始化
    if (!store) {
        // 异常
    }
    return store;
}