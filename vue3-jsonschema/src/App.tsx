import { defineComponent, h, ref } from 'vue';
import type {Ref} from 'vue';
import { createUseStyles } from 'vue-jss';
import MonacoEditor from './components/MonacoEditor';

function toJson (data: any): string {
    return JSON.stringify(data, null, 2);
}

const schema = {
    type: 'string'
};
const useStyles = createUseStyles({
    editor: {
        minHeight: 400
    }
});

export default defineComponent({
    name: 'App',
    components: {
        MonacoEditor
    },
    setup () {
        const schemaRef: Ref<any> = ref(schema);
        const handleCodeChange = (code: string) => {
            let schema: any;
            try {
                schema = JSON.parse(code);
            } catch(err) {}
            schemaRef.value = schema;
        }
        const classesRef = useStyles();

        return () => {
            const classes = classesRef.value;
            const code = toJson(schema);
            
            return (
                <MonacoEditor 
                    code={code}
                    class={classes.editor}
                    onChange={handleCodeChange}     
                    title="Schema">
                </MonacoEditor>
            );
        };
    }
  });