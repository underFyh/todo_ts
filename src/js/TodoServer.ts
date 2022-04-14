
// 装饰器
import {IDataItem} from "./typings";


export function getTodoList (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    // 当前类的实例(Event), 装饰的方法名(init), 描述器
    console.log(target, methodName, descriptor);

    // 备份原有TodoEvent原有的init方法
    const _origin = descriptor.value;

    descriptor.value = function (todoData: IDataItem) {
        $.get('http://localhost:8080/todolist').then(res => {
            todoData = JSON.parse(res);
        }).then(() => {
            // 将获取的数据赋值给todoData然后返回给原有的init方法进行执行
            _origin.call(this, todoData);
        })
    }
}


export function addTodoList (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const _origin = descriptor.value;

    descriptor.value = function (todo: IDataItem) {
        $.post('http://localhost:8080/addTodo', { todo: JSON.stringify(todo) }).then(res => {
            // 重复添加则不执行原有的addTodo函数
            if (res.code === 500) {
                alert('重复添加!');
                return;
            }
            _origin.call(this, todo);
        })
    }
}
