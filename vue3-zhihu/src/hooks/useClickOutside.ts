import { onBeforeUnmount, onMounted, ref, Ref } from 'vue';

function useClickOutside (targetDom: Ref<null | HTMLElement>) {
    const isOutSide = ref(false);
    const clickHander = (e: MouseEvent) => {
        if (targetDom.value) {
            if (targetDom.value.contains(e.target as HTMLElement)) {
                isOutSide.value = false; // 在dropdown里面
            } else {
                isOutSide.value = true; // 在dropdown外面
            }
        }
    };
    onMounted(() => {
        document.addEventListener('click', clickHander);
    });
    onBeforeUnmount(() => {
        document.removeEventListener('click', clickHander);
    });
    return isOutSide;
}
export default useClickOutside;
