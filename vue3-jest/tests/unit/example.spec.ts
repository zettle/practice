import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

// beforeEach/afterEach 在每个单元测试it 之前/之后 会执行
beforeEach(() => { console.log('beforeEach'); });
afterEach(() => { console.log('afterEach') });

// beforeAll/afterAll 是所有单元测试 之前/之后 执行
beforeAll(() => { console.log('beforeAll'); });
afterAll(() => { console.log('afterAll') });

describe('HelloWorld.vue', () => {
  // 做作用在当前的describe上
  beforeEach(() => { console.log('inner beforeEach'); });
  afterEach(() => { console.log('inner afterEach') });
  beforeAll(() => { console.log('inner beforeAll'); });
  afterAll(() => { console.log('inner afterAll') });

  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })


  it('修改props异步操作', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    });
    await wrapper.setProps({msg: 'xiaoming'});
    expect(wrapper.text()).toMatch('xiaoming')
  })

  it('3s后执行断言', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        expect('1').toMatch('1');
        resolve(1);
      }, 3000);
    });
  })
})
