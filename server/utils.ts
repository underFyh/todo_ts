import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// 同步读取数据方法
export function getFileSync(path:string): string {
    const file:string = readFileSync(resolve(__dirname, path), 'utf8');
    return file;
}

// 同步写入数据方法 使用泛型在调用函数的时候传入类型
export function writeFile<T> (path: string, data: T): void {
    writeFileSync(resolve(__dirname, path), JSON.stringify(data))
}
