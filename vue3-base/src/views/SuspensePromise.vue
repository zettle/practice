<template>
    <div>
        <p>{{errInfo}}</p>
    ` <Suspense>
            <template #default>
                <div>
                    <sync-show></sync-show>
                    <fetch-show></fetch-show>
                </div>
            </template>
            <template #fallback>
                loading....
            </template>
        </Suspense>
    </div>
</template>

<script>
import { defineComponent, ref, onErrorCaptured } from 'vue';
import syncShow from '../components/syncShow.vue';
import fetchShow from '../components/fetchShow.vue';
export default defineComponent({
    components: {
        syncShow, fetchShow
    },
    setup() {
        const errInfo = ref(null);
        onErrorCaptured(ev => {
            errInfo.value = ev;
            return true; // 表示向上传递
        });

        return {errInfo};
    }
})
</script>
