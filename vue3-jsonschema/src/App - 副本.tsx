import { defineComponent, h, ref } from 'vue';
import type {Ref} from 'vue';
import { createUseStyles } from 'vue-jss';
import MonacoEditor from './components/MonacoEditor';
import demos from './demos';
import SchemaForm from './lib';

// TODO: 在lib中export
type Schema = any;
type UISchema = any;

function toJson (data: any): string {
    return JSON.stringify(data, null, 2);
}
const schema = {
    type: 'string'
};

// css样式
const useStyles = createUseStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '1200px',
        margin: '0 auot'
    },
    menu: {
        marginBottom: 20
    },
    code: {
        width: 700,
        flexShrink: 0
    },
    codePanel: {
        minHeight: 400,
        marginBottom: 20
    },
    uiAndValue: {
        display: 'flex',
        justifyContent: 'space-between',
        '& > *': {
            width: '46%'
        }
    },
    content: {
        display: 'flex'
    },
    form: {
        padding: '0 20px',
        flexGrow: 1
    },
    menuButton: {
        appearance: 'none',
        borderWidth: 0,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        display: 'inline-block',
        padding: 15,
        borderRadius: 5,
        '&:hover': {
            background: '#efefef'
        }
    },
    menuSelected: {
        background: '#337ab7',
        color: '#fff',
        '&:hover': {
            background: '#337ab7'
        }
    },
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