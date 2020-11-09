function logParams5 (defVal: string) {
    return function (target: any, key: string) {
        target[key] = defVal;
    }
}

class HttpClient5 {
    @logParams5('http://baidu.com/api/')
    cname: string | undefined;
}

const h5 = new HttpClient5();
console.log(h5.cname);