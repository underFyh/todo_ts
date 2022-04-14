import {IDataItem} from "./js/typings";
import {findParentNode} from "./js/utils";

;((doc) => {
    let oInput:HTMLInputElement = doc.querySelector('input');
    let oButton:HTMLElement = doc.querySelector('button');
    let oList:HTMLElement = doc.querySelector('.list-wrap');
    let data: IDataItem[] = [
        {id: 1, info: '123', complete: true},
        {id: 2, info: '456', complete: true},
        {id: 3, info: '789', complete: true},
    ]


    const init: () => void = () => {
        bindEvent();
        render();
    }
    init();

    function bindEvent() {
        oButton.addEventListener('click', () => {
            addItem();
        }, false);

        oList.addEventListener('click', (e: MouseEvent) => {
            let tag = e.target as HTMLElement;
            let tagName: string = tag.tagName.toLowerCase();
            switch (tagName){
                case 'input':
                    toggle(tag);
                    break;
                case 'button':
                    delItem(tag);
                    break;
            }
        }, false);
    }

    function addItem(): void {
        let val = oInput.value.trim();
        let _todo = data.some((item) => {
            if (item.info === val) return true;
        })

        if (!_todo) {
            let item: IDataItem = {
                id: + new Date().getTime(),
                info: val,
                complete: false
            }
            data.push(item);
            oInput.value = '';
            oList.append(renderItem(item));
        } else {
            alert('重复添加');
        }
    }

    function renderItem(todo: any): HTMLElement {
        let oDiv:HTMLElement = document.createElement('div');
        oDiv.className = 'data-item';
        let { id, info, complete } = todo;
        oDiv.innerHTML = `
            <input type="checkbox" ${complete ? 'checked': ''} data-id="${id}" />
            <span>${info}</span>
            <button data-id="${id}">删除</button>
        `
        return oDiv;
    }

    function render() {
        let oFragment:DocumentFragment = doc.createDocumentFragment();
        data.forEach((item) => {
            oFragment.append(renderItem(item));
        })
        oList.innerHTML = '';
        oList.append(oFragment);
    }

    function toggle(tag:HTMLElement) {
        let id = + tag.getAttribute('data-id');
        data.forEach((item) => {
            if (id === item.id) {
                item.complete = !item.complete
            }
        })
    }

    function delItem(tag: HTMLElement) {
        let id = + tag.getAttribute('data-id');
        data = data.filter((item) => item.id !== id);
        findParentNode(tag, 'data-item').remove()
    }

})(document);


// 问题:
// 1. 调用顺序不明显, 这个函数调到那个函数并没有归类
// 2. 渲染逻辑混乱
// 3. 没有横向切割

// addItem 添加一项todo 里面包含了判断是否重复逻辑 组装todo数据逻辑 dom渲染逻辑
// 渲染函数 一个渲染单个 一个渲染所有
// 删除函数 获取id并且有操作dom删除操作
