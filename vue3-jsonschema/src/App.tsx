import { defineComponent, h, reactive, ref, watchEffect } from 'vue';
import type {Ref} from 'vue';
import { createUseStyles } from 'vue-jss';
import MonacoEditor from './components/MonacoEditor';
import demos from './demos';
import SchemaForm from '../lib';

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
        const selectedRef: Ref<number> = ref(0); // 用来纪录当前选中的是哪个编辑器块
        /**
         * 对应3个编辑器块的内容，分别是 schema  data  uiSchema
         * 已经他们通过JSON.stringify转为字符串的 schemaCode  dataCode  uiSchemaCode
         */
        const demo: {
            schema: Schema | null;
            data: any;
            uiSchema: UISchema | null;
            schemaCode: string; // schema转为字符串的内容
            dataCode: string; // data转为字符串的内容
            uiSchemaCode: string; // uiSchema转为字符串的内容
        } = reactive({
            schema: null,
            data: {},
            uiSchema: {},
            schemaCode: '',
            dataCode: '',
            uiSchemaCode: ''
        });

        /**
         * 监听数据的变化，一旦有变化就去同步数据
         */
        watchEffect(() => {
            const index = selectedRef.value;
            const d = demos[index];
            demo.schema = d.schema;
            demo.data = d.default;
            demo.uiSchema = d.uiSchema;
            demo.schemaCode = toJson(d.schema);
            demo.dataCode = toJson(d.default);
            demo.uiSchemaCode = toJson(d.uiSchema);
        });
        // setInterval(() => {
        //     console.log('selectedRef', selectedRef.value);
        // }, 1000);

        const methodRef: Ref<any> = ref();
        const classesRef = useStyles();
        const handleChange = (v: any) => {
            demo.data = v;
            demo.dataCode = toJson(v);
        };

        // 在编辑块一旦编辑，这个handleCodeChange就会触发
        function handleCodeChange(
            filed: 'schema' | 'data' | 'uiSchema',
            value: string
        ) {
            try {
                const json = JSON.parse(value);
                demo[filed] = json;
                (demo as any)[`${filed}Code`] = value;
            } catch(err) {}
        }

        const handleSchemaChange = (v:string) => handleCodeChange('schema', v);
        const handleDataChange = (v:string) => handleCodeChange('data', v);
        const handleUISchemaChange = (v:string) => handleCodeChange('uiSchema', v);

        return () => {
            const classes = classesRef.value;
            const selected = selectedRef.value;
            
            return (
                <div class={classes.container}>
                    <div class={classes.menu}>
                        <h1>Vue3 JsonSchema Form</h1>
                        <div>
                            {demos.map((demo, index) => (
                                <button
                                    class={{
                                        [classes.menuButton]: true,
                                        [classes.menuSelected]: index === selected
                                    }}
                                    onClick={() => (selectedRef.value = index)}>
                                    {demo.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div class={classes.content}>
                        <div class={classes.code}>
                            <MonacoEditor
                                code={demo.schemaCode}
                                class={classes.codePanel}
                                onChange={handleSchemaChange}
                                title="Schema">
                            </MonacoEditor>
                            <div class={classes.uiAndValue}>
                                <MonacoEditor
                                    code={demo.uiSchemaCode}
                                    class={classes.codePanel}
                                    onChange={handleUISchemaChange}
                                    title="UISchema">
                                </MonacoEditor>
                                <MonacoEditor
                                    code={demo.dataCode}
                                    class={classes.codePanel}
                                    onChange={handleDataChange}
                                    title="Value">
                                </MonacoEditor>
                            </div>
                        </div>
                        <div class={classes.form}>
                            <SchemaForm
                                schema={demo.schema} onChange={handleChange} value={demo.data}>
                            </SchemaForm>
                        </div>
                    </div>
                </div>
            );
        };
    }
  });