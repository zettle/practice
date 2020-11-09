function logClass2(api: string) {

    // return的这个函数接收一个target参数，该参数其实就是被装饰的对象
    return function (target: any) {
        console.log('logClass-api', api);
        console.log('logClass-target', target);
    }
}

@logClass2('http://baidu.com/channel_api/')
class HttpClient2 {
    private cname: string = '小明';

    public run () {
        console.log(this.cname + ' is run');
    }
}
