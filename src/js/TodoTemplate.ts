/*
*   只处理模板逻辑,然后返回处理后的字符串
* */

import {IDataItem} from "./typings";

class TodoTemplate {
    protected todoView(todo: IDataItem): string {
        let { id, info, complete } = todo;
        return `
            <input type="checkbox" ${complete ? 'checked': ''} data-id="${id}"/>
            <span style="text-decoration: ${complete ? 'line-through': 'none'}">${info}</span>
            <button data-id="${id}">删除</button>
        `;
    }
}

export default TodoTemplate;
