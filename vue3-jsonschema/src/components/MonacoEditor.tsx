import { defineComponent, h, onBeforeUnmount, onMounted, PropType, ref, shallowRef, watch } from 'vue';
import * as Monaco from 'monaco-editor';
import { createUseStyles } from 'vue-jss';

const useStyles = createUseStyles({
    container: {
        border: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5
    },
    title: {
        backgroundColor: '#eee',
        padding: '10px 0',
        paddingLeft: 20
    },
    code: {
        flexGrow: 1
    }
})

export default defineComponent({
    props: {
        code: {type: String, required: true},
        onChange: { type: Function as PropType<(value: string, event: Monaco.editor.IModelContentChangedEvent) => void>, required: true },
        title: {type: String,required: true}
    },
    setup (props) {
        // console.log(props.onChange);
        const editorRef = shallowRef();
        const containerRef = ref();

        let _subscription: Monaco.IDisposable | undefined;
        let __prevent_trigger_change_event = false;
        onMounted(() => {
            const editor = editorRef.value = Monaco.editor.create(containerRef.value, {
                value: props.code,
                language: 'josn',
                formatOnPaste: true,
                tabSize: 2,
                minimap: {
                    enabled: false
                }
            });
            // 根据内容的变化，实时返回给外界组件
            _subscription = editor.onDidChangeModelContent((event) => {
                if (!__prevent_trigger_change_event) {
                    props.onChange(editor.getValue(), event);
                }
            });
        });

        onBeforeUnmount(() => {
            if (_subscription) {
                _subscription.dispose();
            }
        });

        watch(() => props.code, (v) => {
            const editor = editorRef.value;
            const model = editor.getModel();
            
            if (v !== model.getValue()) {
                editor.pushUndoStop();
                __prevent_trigger_change_event = true;

                model.pushEditOperations(
                    [], 
                    [
                        { range: model.getFullModelRange(), text: v }
                    ]
                )
                editor.pushUndoStop();
                __prevent_trigger_change_event = false;
            }
        });

        const classesRef = useStyles();
        return () => {
            const classes = classesRef.value;

            return (
                <div class={classes.container}>
                    <div class={classes.title}>
                        <span>{props.title}</span>
                    </div>
                    <div class={classes.code} ref={containerRef}></div>
                </div>
            );
        }
  }
});