<template>
    <div>
        <h1>{{person}}</h1>
        <button @click="update">更新</button>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, shallowReactive, shallowRef, triggerRef } from 'vue';
export default defineComponent({
    setup () {
        // const person = reactive({
        //     a: 'a',
        //     dd: {
        //         ee: 'b',
        //         tt: {
        //             sdf: 'c',
        //             sdfa: {
        //                 sdfs: 'd'
        //             }
        //         }
        //     }
        // });
        // const update = () => {
        //     console.log(person);
        //     console.log(person.dd);
        //     console.log(person.dd.tt);
        //     console.log(person.dd.tt.sdfa);
        //     person.a = '1';
        //     person.dd.ee = '2';
        //     person.dd.tt.sdf = '3';
        //     person.dd.tt.sdfa.sdfs = '4';
        //     console.log(JSON.stringify(person));
        // };

        // const person = ref({
        //     a: 'a',
        //     dd: {
        //         ee: 'b',
        //         tt: {
        //             sdf: 'c',
        //             sdfa: {
        //                 sdfs: 'd'
        //             }
        //         }
        //     }
        // });
        // const update = () => {
        //     console.log(person.value); // proxy{}
        //     console.log(person.value.dd); // proxy{}
        //     console.log(person.value.dd.tt); // proxy{}
        //     console.log(person.value.dd.tt.sdfa); // proxy{}
        //     person.value.a = '1';
        //     person.value.dd.ee = '2';
        //     person.value.dd.tt.sdf = '3';
        //     person.value.dd.tt.sdfa.sdfs = '4';
        //     console.log(JSON.stringify(person));
        // };

        // 非递归
        // const person = shallowReactive({
        //     a: 'a',
        //     dd: {
        //         ee: 'b',
        //         tt: {
        //             sdf: 'c',
        //             sdfa: {
        //                 sdfs: 'd'
        //             }
        //         }
        //     }
        // });
        // const update = () => {
        //     console.log(person); // proxy{}
        //     console.log(person.dd); // {}
        //     console.log(person.dd.tt); // {}
        //     console.log(person.dd.tt.sdfa); // {}
        //     person.a = '1'; // 一旦注释了这个那么视图就不会跟着改了
        //     person.dd.ee = '2';
        //     person.dd.tt.sdf = '3';
        //     person.dd.tt.sdfa.sdfs = '4';
        //     console.log(JSON.stringify(person));
        // };

        // 非递归
        // const person = shallowRef({
        //     a: 'a',
        //     dd: {
        //         ee: 'b',
        //         tt: {
        //             sdf: 'c',
        //             sdfa: {
        //                 sdfs: 'd'
        //             }
        //         }
        //     }
        // });
        // const update = () => {
        //     console.log(person.value); // {}
        //     console.log(person.value.dd); // {}
        //     console.log(person.value.dd.tt); // {}
        //     console.log(person.value.dd.tt.sdfa); // {}
        //     person.value.a = '1';
        //     person.value.dd.ee = '2';
        //     person.value.dd.tt.sdf = '3';
        //     person.value.dd.tt.sdfa.sdfs = '4';
        //     console.log(JSON.stringify(person));
        // };

        // 改变value
        // const person = shallowRef({
        //     a: 'a',
        //     dd: {
        //         ee: 'b',
        //         tt: {
        //             sdf: 'c',
        //             sdfa: {
        //                 sdfs: 'd'
        //             }
        //         }
        //     }
        // });
        // const update = () => {
        //     person.value = {
        //         a: '1',
        //         dd: {
        //             ee: '2',
        //             tt: {
        //                 sdf: '3',
        //                 sdfa: {
        //                     sdfs: '4'
        //                 }
        //             }
        //         }
        //     };
        // };

        // triggerRef
        const person = shallowRef({
            a: 'a',
            dd: {
                ee: 'b',
                tt: {
                    sdf: 'c',
                    sdfa: {
                        sdfs: 'd'
                    }
                }
            }
        });
        const update = () => {
            person.value.a = '1';
            person.value.dd.ee = '2';
            person.value.dd.tt.sdf = '3';
            person.value.dd.tt.sdfa.sdfs = '4';
            triggerRef(person);
        };
        return {person, update};
    }
})
</script>