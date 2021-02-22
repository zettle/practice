# react的状态管理器

状态管理的库:
* redux: 民间开发，和`react/vue/angular`都可以搭配
* redux-thunk: 使redux能支持异步action
* react-redux: facebook出品，见`react+redux`用的人多，就出了一个简化redux开发的库

建议使用的时候，3个库都要安装: `npm i redux redux-thunk react-redux`


1. 组件`<Calculator />`的计算结果存在redux中，点击按钮的时候，派发一个同步action改变redux的数据
2. 组件`<Person />`的列表存在redux中，点击按钮的时候，派发一个异步action改变list数据
