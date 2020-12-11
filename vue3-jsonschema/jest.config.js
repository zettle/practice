module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  // .vue文件并不是标准的js文件，是无法给jest识别，所以需要加上下面的transform
  // 使用vue-jest把 .vue 转为 .js 代码，这样就可以给jest识别
  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
}
