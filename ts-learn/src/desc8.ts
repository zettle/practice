
function descClass1 (target: any) {
    console.log('descClass1')
}

function descClass2 (target: any) {
    console.log('descClass2')
}

function descParam1 (target: any, paramName: string) {
    console.log('descParam1');
}

function descParam2 (target: any, paramName: string) {
    console.log('descParam2');
}

function descMethod1 (target: any, methohName: string) {
    console.log('descMethod1');
}

function descMethod2 (target: any, methohName: string) {
    console.log('descMethod2');
}

function descMethodParam1 (target: any, methohName: string, paramIndex: number) {
    console.log('descMethodParam1');
}
function descMethodParam2 (target: any, methohName: string, paramIndex: number) {
    console.log('descMethodParam2');
}

@descClass1
@descClass2
class HttpClient8 {
    @descParam1
    @descParam2
    cname: string | undefined;

    @descMethod1
    @descMethod2
    say ( 
        @descMethodParam1 
        @descMethodParam2 
        cname: string ) {

    }
}