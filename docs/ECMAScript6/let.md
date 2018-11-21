# let 和 const 命令

## let 命令

### 基础用法

let 命令，用来声明变量。它的用法类似于 var，但是所声明的变量，只在 let 命令所在的代码块内有效。

```javascript
{
  let a = 10
  var b = 1
}
console.log(a) // ReferenceError: a is not defined
console.log(b) // 1
```

::: warning 注意
在一个代码块中分别用 let 和 var 定义的两个变量，在代码块之外调用，let 声明的变量会报错，var 声明的返回正确的值。说明,let 声明的变量只在他所在的代码块中有效
:::

> 案例：

```javascript
var a = []
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]() //10
```

上面代码中，变量 i 是 var 声明的，在全局范围内都有效，所以全局变量只有一个变量 i。每次循环 i 都发生相应的变化，在循环内部赋值给数组 a 的函数内部 console.log(i)，里面的 i 指向的就是全局变量 i。

```javascript
var a = []
for (let i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]() //6
```

上面代码中变量 i 是 let 声明的，当前的 i 只在本轮循环中有效，所以每次循环的 i 都是一个新的变量，所以最后输出是 6。

### 不存在变量提升

var 声明变量是会发生“变量提升”现象，在未声明变量之前可以使用，值为 undefined。
let 命令声明的变量一定要在声明之后使用，否则会报错

```javascript
console.log(foo) //undefined
var foo = 1

console.log(bar) //ReferenceError: bar is not defined
let bar = 2
```

### 暂时性死区

只要块级作用域内存在 let 命令，它声明的变量就“绑定”这个区域，不再受外界影响

::: warning 注意
区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了一个封闭作用域。凡在声明之前就使用这些变量，就会报错。这在语法上，称"暂时性死区"
:::

> eg

```javascript
if (true) {
  tmp = 'abc' //ReferenceError: tmp is not defined
  console.log(tmp) // ReferenceError: tmp is not defined
  let tmp
  console.log(tmp) //undefined
  tmp = 123
  console.log(tmp) // 123
}
```

### 不予许重复声明

let 不予许在相同的作用域内，重复声明同一变量

## 块级作用域

### 为什么需要块级作用域？

- 内层变量可能会覆盖外层变量
- 用来计数的循环变量泄露为全局变量

### ES6 的块级作用域

```javascript
function f() {
  let bar = 'bar'
  if (true) {
    let bar = 'foo'
  }
  console.log(bar) // bar
}
```

如上代码，在两个代码块中都声明了变量 bar，运行后输出 bar。故外层代码块不受内层代码块的影响。

### 块级作用域与函数声明

## const 命令

::: warning 注意
const 声明的变量是一个只读的常量，一旦声明，变量的值就不会改变。所以 const 在声明变量时，必须初始化，不能留到以后赋值
:::

- const 的作用域与 let 命令相同：只在声明所在的块级作用域内有效。
- const 命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
- const 声明的常量，也与 let 一样不可重复声明。

### 本质

::: warning 注意
const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
:::

### ES6 声明变量的六种方法

- ES5 ： var 命令和 function 命令
- ES6 ： let 命令和 const 命令，import 命令 和 class 命令
