# 单元测试

## 1、理解 `jest.config.js`
从 `jest.config.js` 作为入口理解整个链路
```js
module.exports = {
  // preset预设
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
}
```

再根据 `preset` 找到依赖的 `/node_module/@vue/cli-plugin-unit-jest/presets/typescript-and-babel/jest-preset.js` 
```js
const deepmerge = require('deepmerge')
const defaultTsPreset = require('../typescript/jest-preset')

module.exports = deepmerge(
  defaultTsPreset,
  {
    globals: {
      // ts-jest的配置
      'ts-jest': {
        babelConfig: true // ts编译后，还要经过babel的编译
      }
    }
  }
)
```

再找到依赖的  `/node_module/@vue/cli-plugin-unit-jest/presets/typescript/jest-preset.js`
```js
const deepmerge = require('deepmerge')
const defaultPreset = require('../default/jest-preset')
module.exports = deepmerge(
  defaultPreset,
  {
    moduleFileExtensions: ['ts', 'tsx'], // 根据哪些后缀名去找单元测试的文件
    transform: {
      '^.+\\.tsx?$': require.resolve('ts-jest') // 把.ts 和 .tsx 的文件都交给ts-jest编译
    }
  }
)
```

再继续找到依赖的 `/node_module/@vue/cli-plugin-unit-jest/presets/default/jest-preset.js`，里面内容如下:

```js
module.exports = {
  // moduleFileExtensions 后缀名
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    // tell Jest to handle *.vue files
    'vue'
  ],
  transform: {
    // process *.vue files with vue-jest
    '^.+\\.vue$': require.resolve('vue-jest'), // .vue文件交给 vue-jest 编译
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
    require.resolve('jest-transform-stub'), // 对于单元测试，css等这些没有什么作用，单元测试主要跑的是js的逻辑
    '^.+\\.jsx?$': require.resolve('babel-jest') // .jsx文件交给 babel-jest 处理
  },
  transformIgnorePatterns: ['/node_modules/'], // 忽略哪些文件

  // support the same @ -> src alias mapping in source code
  // 把 `@/` 这样的路径映射到 `根目录/src` 上面
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1' 
  },
  // 在什么样的测试环境下测试
  testEnvironment: 'jest-environment-jsdom-fifteen',

  // serializer for snapshots
  // 规定jest怎么跑快照测试，快照测试: 把vue组件渲染的结果系列成一个字符串并存到一个固定文件下面，以后跑单元测试的时候，所有的输出结构和当初快照的字符串是一模一样的
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  // 我们在项目跑一条命令 `npm run test:unit` 就可以把所有的单元测试文件都跑了
  // jest就会根据下面的规则去匹配哪些是单元测试文件
  testMatch: [
    '**/tests/unit/**/*.spec.[jt]s?(x)', // 所有目录下的 test/unit/ 目录下的 *.spec.js(|ts|jsx|tsx)
    '**/__tests__/*.[jt]s?(x)' // 所有目录下的 __tests__ 目录下的 *.ts等
  ],
  // https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost/', // 测试所使用的模拟服务
  // 如果我们跑 test watch 或 jest --watch 启动自动监听，改了文件后自动再跑下单元测试
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname')
  ]
}
```