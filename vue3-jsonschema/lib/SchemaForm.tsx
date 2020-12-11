import {defineComponent, h, PropType} from 'vue';
import SchemaItems from './SchemaItems';
import { Schema, SchemaTypes } from './types';

export default defineComponent({
    name: 'SchemaForm',
    props: {
        schema: { type: Object as PropType<Schema>, required: true }, // schema码
        value: { required: true }, // 表单项的value值
        onChange: { type: Function as PropType<(v: any) => void>, required: true }, // 表单项value值改变事件
    },
    setup (props) {
        // 再封装一层，方便以后扩展
        const handleChange = (v: any) => {
            props.onChange(v);
        };
        return () => {
            const {schema, value} = props;
            return <SchemaItems schema={schema} value={value} onChange={handleChange}></SchemaItems>
        }
    }
});