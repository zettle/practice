import {defineComponent, h, PropType} from 'vue';
import { Schema } from './types';
export default defineComponent({
    name: 'SchemaForm',
    props: {
        schema: { type: Object as PropType<Schema> }
    },
    setup (props, {slots, emit, attrs}) {
        return () => {
            // 解析Schema
            
            return <h1>this is form</h1>
        }
    }
});