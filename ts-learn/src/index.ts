function logClass (params: any) {
    console.log('logClass', params);
    params.prototype.age = '23';
    params.prototype.say = function () {
        console.log(this.cname+'今年'+this.age+'岁')
    }
}

@logClass
class HttpClient {
    private cname: string = '小明';

    public run () {
        console.log(this.cname + ' is run');
    }
}

const h: any = new HttpClient();
h.run();
h.say();

