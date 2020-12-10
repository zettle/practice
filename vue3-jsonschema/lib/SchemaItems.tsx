import { defineComponent, PropType } from "vue";
import { Schema, SchemaTypes } from './types';
import NumberField from './fields/NumberField';
import StringField from './fields/StringField';

export default defineComponent({
    name: 'SchemaItems',
    components: {StringField},
    props: {
        schema: { type: Object as PropType<Schema>, required: true }, // schema码
        value: { required: true }, // 表单项的value值
        onChange: { type: Function as PropType<(v: any) => void>, required: true}, // 表单项value值改变事件
    },
    setup (props) {
        return () => {
            // 解析Schema
            const schema = props.schema;
            const type = schema?.type;

            // 如果type没有指定，我们应该去猜测

            let Component: any;
            switch(type) {
                case SchemaTypes.STRING:
                    Component = StringField;
                    break;
                case SchemaTypes.NUMBER:
                    Component = NumberField
                    break;
                default:
                    console.error(`${type} is not supported`);
                    break;
            }
            return <Component {...props}></Component>;
        };
    }
});
