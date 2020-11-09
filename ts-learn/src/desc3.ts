
function logClass3 (target: any) {
    console.log('logClass3', target);

    // 返回一个类继承target（即下面的HttpClient3）
    // 然后再改类中要重写target里面的所有方法
    return class extends target {
        cname = '我是修改后的cname';
        run () {
            console.log(this.cname + '修改后的run');
        }
    }
}

@logClass3
class HttpClient3 {
    cname: string | undefined;
    constructor (cname: string) {
        this.cname = cname;
    }
    run () {
        console.log(this.cname + '正在跑步');
    }
}

const h3 = new HttpClient3('就算传递进去也没有用的');
h3.run();