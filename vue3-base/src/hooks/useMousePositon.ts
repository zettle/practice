import { ref, onMounted, onUnmounted } from 'vue';
/**
 * hooks: 获取鼠标点击的`x坐标/y坐标`
 * @returns {Ref} x
 * @returns {Ref} y
 */
function useMousePosition () {
    const x = ref(0);
    const y = ref(0);
    const updateMouse = (ev: MouseEvent) => {
        x.value = ev.pageX;
        y.value = ev.pageY;
    };
    onMounted(() => { // 开始监听
        document.addEventListener('click', updateMouse);
    });
    onUnmounted(() => { // 取消监听
        document.removeEventListener('click', updateMouse);
    });

    return {x, y}; // 最后要return出去
}

export default useMousePosition;