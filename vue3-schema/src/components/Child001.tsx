import {createApp, DefineComponent, defineComponent, ExtractPropTypes} from 'vue';
import Child001, { propsJson } from './Child001.vue';


export default function Child001Plugin () {
    const root = document.createElement('div');
    document.querySelector('body')?.appendChild(root);
    const instance: DefineComponent<typeof propsJson> = defineComponent({
        setup() {
            return () => (<Child001 msg="hello plugin"></Child001>);
        }
    });


    // instance.mount(root);
}