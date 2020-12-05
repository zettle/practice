import { defineComponent, h } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
    name: 'App',
    props: {
        age: {type: Number, default: 234}
    },
    components: {
        HelloWorld
    },
    setup (props) {
        console.log(props);
        
        return () => {
            return h(
                <div>
                    <h1>sjdkf</h1>
                    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
                </div>
            );
        };
    }
  });