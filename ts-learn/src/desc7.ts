function logParam7 (api: string) {
    // 参数1 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // 参数2 方法的名称 **注意不是参数的名称**
    // 参数3 属性在函数参数列表中的索引，0开头
    return function (target: any, methodName: string, paramIndex: number) {
        console.log(api, target, methodName, paramIndex);
    }
}

class HttpClient7 {
    say (@logParam7('http://baidu.com') cname: string) {
        console.log(cname + ' is run');
    }
}

const h7 = new HttpClient7();
h7.say('xiaoming');