import express, { Application } from 'express';
import bodyParse from 'body-parser'; // 字符串解析
import { getFileSync, writeFile } from "./utils";
import { ITodoItem } from "./typing"; // 同步读取文件

const app: Application = express();


app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());


app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-methods', 'POST,GET,PUT');
    next();
})


app.get('/todolist', function (req, res) {
    const todoList: string = getFileSync('todo.json');
    res.send(todoList);
})

app.post('/addTodo', function (req, res) {
    const todo:ITodoItem = JSON.parse(req.body.todo);
    const todoList: ITodoItem[] = JSON.parse(getFileSync('todo.json'));

    // 先判断该项目是否已经存在
    let isExited = todoList.some((item) => {
        if (item.info === todo.info) return true
    })
    if (isExited) {
        res.send({
            msg: '已存在该项目',
            code: 500
        })
        return false;
    }
    todoList.push(todo);
    writeFile<ITodoItem[]>('todo.json', todoList);
    res.send({
        msg: 'ok',
        code: 200
    })
})

app.post('/toggleTodo', function (req, res) {

})

app.post('/removeTodo', function (req, res) {

})



app.listen(8080, function () {
    console.log('Express Running');
})
