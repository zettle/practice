import { provide, inject, Ref } from 'vue';

const StoreSymbol = Symbol(); // 生成唯一的key

// 给祖先级用的
export function providerStore(count: Ref<number>) {
    provide(StoreSymbol, count);
}

// 给后代组件用的
export function useStore(): Ref<number> | undefined {
    const count = inject<Ref<number>>(StoreSymbol);
    return count;
}