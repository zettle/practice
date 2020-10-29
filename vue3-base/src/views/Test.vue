<template>
    <div>
        <p>num: {{num}}</p>
        <button type="button" @click="hander">按钮</button>
        <p>person: {{person.age}}</p>
        <button type="button" @click="hander2">按钮2</button>
        <p>person3: {{person3.age}}</p>
        <button type="button" @click="hander3">按钮3</button>
        <p>person4: {{age}}</p>
        <button type="button" @click="hander4">按钮4</button>
    </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from 'vue';
export default defineComponent({
    setup () {
        const num = ref(23);
        const hander = () => {
            num.value++;
        };

        const person = {
            age: 23,
            name: 'xioam'
        };
        const hander2 = () => {
            person.age = person.age+1;
            console.log(person);
        };

        const person3 = ref({
            name: 'xiaohong',
            age: 3
        });
        const hander3 = () => {
            person3.value.age = person3.value.age+1;
            console.log(person3);
        };

        const person4 = reactive({
            name: 'xiaohong',
            age: 3
        });
        const hander4 = () => {
            person4.age = person4.age+1;
            console.log(person4);
        };

        return {num, hander, person, hander2, person3, hander3, ...toRefs(person4), hander4};
    }
});
</script>
<style lang="scss" scoped>

</style>