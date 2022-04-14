/*
*  1. 需要什么?
*  data数据 - 因为是引用值所以丢到这里处理也没有问题
*
*  2. addTodo -> 需要添加一个IDataItem{}的对象
*
*  3. removeTodo -> 根据一个id进行删除
*
*  4. toggleComplete -> 根据一个id进行切换
*
*  先考虑各个函数需要什么参数
*
* */
import { IDataItem } from "./typings";
import TodoDom from "./TodoDom";
import { getTodoList, addTodoList } from "./TodoServer";


class TodoEvent extends TodoDom{
    private todoData: IDataItem[];
    constructor(todoData: IDataItem[], oListWrap:HTMLElement) {
        super(oListWrap);
        this.todoData = todoData;


        // --------------- 请求接口
        // 之前直接使用EventDom的初始化渲染
        // this.initList(todoData);

        // 现在通过装饰器先请求接口数据覆盖本地数据进行渲染
        this.init(todoData);
    }

    @getTodoList
    public init(todoData: IDataItem[]) {
        this.todoData = todoData;
        this.initList(todoData);
    }

    @addTodoList
    public addTodo(todo:IDataItem):void {
        const _todo = this.todoData.some((item) => {
            if (item.info === todo.info) return true;
        })
        // 如果成功
        if (!_todo) {
            this.todoData.push(todo);
            this.addItem(todo);
        } else {
            alert('重复数据无法添加!');
        }
    }

    public removeTodo(id: number, tag: HTMLElement):void {
        this.todoData = this.todoData.filter((item) => {
            return item.id !== id;
        });
        this.removeItem(tag);
    }

    public toggleComplete(id: number, tag: HTMLElement):void {
        this.todoData.forEach((item) => {
            if (item.id === id) {
                item.complete = !item.complete;
                this.changeCompleted(tag, item.complete);
            }
        })
    }
}

export default TodoEvent;
