/*
*  只和dom相关的东西需要什么?  1. 容器  2. 新增的数据todoItem
*
*  addItem: 注意不处理模板 - 模板信息专门给模板类
*
* */
import TodoTemplate from "./TodoTemplate";
import { IDataItem } from "./typings";
import {findParentNode} from "./utils";

class TodoDom extends TodoTemplate {
    private todoWrapper: HTMLElement;
    constructor(todoWrapper:HTMLElement) {
        super();
        this.todoWrapper = todoWrapper;
    }

    protected addItem(todo: IDataItem) {
        let oDiv = document.createElement('div');
        oDiv.className = 'todo-item';
        oDiv.innerHTML = this.todoView(todo);
        this.todoWrapper.append(oDiv);
    }

    protected removeItem(tag:HTMLElement) {
        findParentNode(tag, 'todo-item').remove();
    }

    protected changeCompleted(tag: HTMLElement, completed: boolean) {
        let oParentNode: HTMLElement = findParentNode(tag, 'todo-item');
        let oContent: HTMLElement = oParentNode.getElementsByTagName('span')[0];
        oContent.style.textDecoration = completed ? 'line-through': 'none';
    }

    protected initList(todoData: IDataItem[]) {
        if (todoData.length > 0) {
            let oFrag: DocumentFragment = document.createDocumentFragment();
            todoData.map((todo) => {
                const oItem: HTMLElement = document.createElement('div');
                oItem.className = 'todo-item';
                oItem.innerHTML = this.todoView(todo);
                oFrag.appendChild(oItem);
            })
            this.todoWrapper.appendChild(oFrag);
        }
    }
}


export default TodoDom;
