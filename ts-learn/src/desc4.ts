// 参数1 target 类的原型链，即在上面学类装饰器时候的的target.prototype
// 参数2 key 被装饰的属性的名称
function logParams4 (target: any, key: string) {
    console.log('logParams4', target, key);
    target[key] = '写死的cname';
}

class HttpClient4 {
    @logParams4
    cname: string | undefined;
}

const h4 = new HttpClient4();
console.log(h4.cname);