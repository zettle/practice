// 接受3个参数
// 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 2. 成员的名称
// 3. 成员的属性描述符，里面有个 .value 字段就是原方法的实现内容
function logMethods (api: string) {
    return function (target: any, methodName: string, descInfo: any) {
        console.log(api, target, methodName, descInfo);
        target.cname = '小明'; // 修改原来的HttpClient6.prototype属性

        const oldMethodFn = descInfo.value;
        descInfo.value = function (...args: any[]) {
            console.log(args);
            args = args.map(arg => String(arg)); // 把参数都转为字符串类型
            oldMethodFn.apply(this, args);
        }
    }
}

class HttpClient6 {
    @logMethods('http://baidu.com/api/')
    run (...args: any[]) {
        console.log('run-arguments', args);
        console.log('this is run');
    }
}

const h6: any = new HttpClient6();
console.log(h6.cname);
h6.run(123,'abc');