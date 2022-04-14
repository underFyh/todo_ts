import {IDataItem} from "./js/typings";
import TodoEvent from "./js/TodoEvent";


(
    (doc) => {
        let oInput:HTMLInputElement = doc.querySelector('input');
        let oButton:HTMLElement = doc.querySelector('button');
        let oListWrap:HTMLElement = doc.querySelector('.list-wrap');
        let data: IDataItem[] = [
            {id: 1, info: '123', complete: true},
            {id: 2, info: '456', complete: true},
            {id: 3, info: '789', complete: true},
        ];

        let todoEvent = new TodoEvent(data, oListWrap);

        const init = ():void => {
            bindEvent();
        }
        init();

        function bindEvent() {
            oButton.addEventListener('click', handleAdd, false);

            oListWrap.addEventListener('click', handleList, false);
        }

        function handleAdd() {
            let val = oInput.value.trim();
            let todo: IDataItem = {
                id: + new Date().getTime(),
                info: val,
                complete: false
            }
            todoEvent.addTodo(todo);
            console.log(data);
        }

        function handleList(e: MouseEvent) {
            let tar = e.target as HTMLElement;
            let tagName = tar.tagName.toLowerCase();
            let tagId:number = +tar.getAttribute('data-id');
            switch (tagName) {
                case 'button':
                    // 删除逻辑
                    todoEvent.removeTodo(tagId, tar)
                    break;
                case 'input':
                    todoEvent.toggleComplete(tagId, tar)
                    break;
            }
        }
    }
)(document);


/*
*  横向切割: 就是把不同类型做的事分配给不同的类进行管理
*  TodoEvent:    管理数据操作
*  TodoDom:      管理dom操作逻辑 - 新增和删除以及切换dom节点
*  TodoTemplate: 管理模板字符串操作
*
*  完全进行分离, 只是相互之间进行方法调用
* */


/*
*  分析过程:
*  事件处理函数  新增  切换  删除
*  Event:       addTodo({})  toggleTodo(id, tag)  removeTodo(id, tag)
*  Dom:         addItem往容器推入一条数据 changeComplete切换完成状态 removeItem找到父级标签删除
*  Template:    根据每一条数据处理todoItem模板字符串
* */


/*
*  分析从事件开始 然后逐步进行分类  处理数据的事件 -> 根据数据处理dom -> 根据数据处理字符串模板
*
* */
