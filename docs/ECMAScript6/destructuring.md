# 变量的解构赋值

> ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

## 1.数组的解构赋值

### 默认值

```javascript
// 解构赋值允许指定默认值
let [foo = true] = []
foo // true
let [x, y = 'b'] = ['a'] // x='a', y='b'
let [x, y = 'b'] = ['a', undefined] // x='a', y='b'
```

## 2.对象的解构赋值

## 3.字符串的解构赋值

## 4.数值和布尔值的解构赋值

## 5.函数参数的解构赋值

## 6.圆括号问题

::: warning 不能使用圆括号的情况

- 变量声明语句
  ```javascript
  // 全部报错
  let [(a)] = [1];
  let {x: (c)} = {};
  let ({x: c}) = {};
  let {(x: c)} = {};
  let {(x): c} = {};
  let { o: ({ p: p }) } = { o: { p: 2 } };
  ```
- 函数参数

  ```javascript
   // 报错
  function f([(z)]) { return z; }
  // 报错
  function f([z,(x)]) { return x; }
  ```

- 赋值语句的模式
  ```javascript
    // 全部报错
  ({ p: a }) = { p: 42 };
  ([a]) = [5];
  ```
  :::

## 7.用途

- 交换变量的值
- 从函数返回多个值
- 函数参数的定义
- 提取 JSON 数据
- 函数参数的默认值
- 遍历 Map 结构
- 输入模块的指定方法
