import { ref } from 'vue';
import axios from 'axios';

function useURLLoader<T> (api: string) {
    const isLoading = ref(true);
    const isLoaded = ref(false);
    const result = ref<T | null>(null);
    const error = ref(null);

    axios.post(api).then((rowData) => {
        isLoading.value = false;
        isLoaded.value = true;
        console.log(rowData.data)
        result.value = rowData.data;
    }).catch(err => {
        isLoading.value = false;
        isLoaded.value = true;
        error.value = err;
    });
    // 有响应式的，所以可以不用放在回调里面
    return { isLoading, isLoaded, result, error };
}

export default useURLLoader;