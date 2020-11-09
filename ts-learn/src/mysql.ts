// 接口DBI，约束所有数据库类要实现的功能
interface DBI<T> {
    add (data: T): boolean; // 增 传递进一个泛型类
    del (id: number): boolean; // 删-根据id删除某条数据
    update(data:T, id:number): boolean; // 更-根据id更新某条数据
    get(id:number): T; // 查-根据id查询某条数据
};

// 定义一个操作Mysql的类，要实现泛型接口则该类也是一个泛型类
class Mysql<T> implements DBI<T> {
    add(data: T): boolean {
        console.log('add', data);
        return true;
    }
    del(id: number): boolean {
        console.log('del', id);
        return true;
    }
    update(data: T, id: number): boolean {
        throw new Error("Method not implemented.");
    }
    get(id: number): T {
        throw new Error("Method not implemented.");
    }
}

class User {
    username: string | undefined;
    password: string | undefined;
}
const u = new User();
u.username = 'xiaoming';
u.password = '2323';

var userTable = new Mysql<User>();
userTable.add(u);
// userTable.add('23'); // 不能添加
