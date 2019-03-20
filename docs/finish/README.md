# WEB

## ES6 新语法

- `let` / `const`
- 箭头函数
- 结构赋值
- Promise
- class

## 重排（回流） 重绘 的理解

- 什么是重排和重绘
- 突出特点
- 突出自己写项目的时候重点注意了这些问题，以及自己的解决方案
  <br/>
  <br/>
  浏览器渲染一个页面的时候会按照'先创建 DOM 树'->再加载 CSS->生成渲染树 RENDER TREE->把渲染树交给浏览器（GPU）进行绘制，如果后期我们修改了元素的样式（但是没有改变大小和位置），浏览器会把当前元素重新生成渲染树，然后重新渲染，这个机制就是重绘，但是一旦元素的位置或者大小等发生了改变，浏览器就要从 DOM 树重新计算渲染，这个机制是回流（重排），不论是重排还是回流都非常的消耗性能
  <br/>
  <br/>

常用解决方案：

- 需要动态向页面追加元素的时候，基于文档碎片或者先把需要增加的所有元素拼接成字符串，最后统一进行增加
- 读写分离，把统一修改样式都放到一起执行，新版浏览器都有一个自己检测的机制，如果发现下面紧挨着的操作也是修改元素的样式，会把所有修改的事先存起来，知道遇到非修改样式的操作，会把之前存储的统一执行，引发一次回流重绘

## 面向对象的理解

- JS 本身就是基于面向对象（OOP）编程思想开发出来的语言，我们学习 JS 就是在学习 JS 中的类和实例，例如：数组时 Array 的实例，对象是 Object 的实例，函数是 Function 的实例...在这些内之类的原型上有很多公共属性和方法，这些方法可以被实例调用，我们学习 JS 就是学习这些方法...
- 【面向对象真是项目的应用】平时的业务逻辑开发，我没有可以使用类的方法来做，只有一些组件或者插件封装的时候才会基于构造函数和原型链使用类和实例完成，例如：我们之前封装过一些轮播图，模态框、表单验证等
- 【面向对象中的一些语法和特点】所谓面向对象就是基于 class 或者 function 创建一个类，执行的时候 new 执行创建一个实例，这样实例就可以调取类上提供的方法，想要基于面你下那个对象进行插件封装，必须掌握关于类的继承封装和多态，封装就是提取公共的方法，JS 中没有严格意义的多态，不能进行方法的重写，常用的继承方式有很多，例如：原型继承、class 继承、寄生组合继承、es6 中的继承，有些方法存在一些问题，我们项目中后来都是基于 class 中的 extend 实现继承的

## THIS

`this`：当前方法执行的主体（谁执行的这个方法，那么 this 就是谁,所以 this 和当前方法在那创建的或者在哪里执行的都没有必然的关系）

- 给当前元素的某个事件绑定方法，发放中的 this 都是当前操作的元素本身
- 函数执行，看函数前面是否有点，有的话点前面是谁 this 就是谁，没有点，this 是 Window（在严格模式下，没有点 this 是 undefined）
- 构造函数执行，方法中的 this 一般都是当前类的实例
- 箭头函数中没有自己的 this，this 是上下文中的 this
- 在小括号表达式中，会影响 this 得指向
- 使用 call/apply/bind 可以改变 this 得指向

## 作用域链和原型链

### `作用域链`

函数执行会形成一个私有的作用域，形参和在当前私有作用域中声明的变量都是私有变量，当前的私有作用域有自我保护机制，私有变量和外界是没有关系的，但是如果私有作用域中遇到一个非私有的变量，则向它的上级作用域中找，如果还不是上级作用域私有的，则继续向上查找，一直找到 window 为止。这种变量一层层向上查找的机制就是‘作用域链’

### `原型链`

- 所有的函数数据类型都天生自带一个属性：`prototype`（原型），这个属性的值是一个对象，浏览器会默认给他开辟一个堆内存
- 在浏览器给 `prototype` 开辟的堆内存当中有一个天生自带的属性：constructor，这个属性存储的值是当前函数本身
- 每一个对象都有一个`__proto__`的属性,这个属性指向当前实例所属类的`prototype`(如果不能确定他是谁的实例，都是 object 的实例)
  每个类都把供实例调取的公共属性方法，存储到自己的原型上（原型 prototype 的作用就是存储一些公共的属性和方法，供他的实例调取使用）
  基类 Object 的原型上的`__proto__`指向 null，因为到最底层类，如果要指向也是指向自己本身，没意义

::: warning 原型链
原型链：它是一种基于`__proto__`向上查找的机制。当我们操作实例的某个属性或者方法的时候，首先找自己空间中私有的属性或者方法， 1.找到了，则结束查找，使用自己的私有的即可 2.没有找到,则基于`__proto__`找所属类的 prototype,如果找到就用这个共有的，如果没找到基于原型上的`__proto__`继续向上查找，一直找到 Object.prototype 的原型为止，如果再没有，操作的属性或者方法不存在
:::

<!-- 它是一种查找机制，实例首先在自己的私有属性中进行属性的查找，如果不在私有属性，基于`__proto__`向所属的原型上查找，如果在找不到，则继续基于`__proto__`向上查找，一直找到 `Object.prototype` 为止。例如：`obj.hasOwnProperty()`这里调取的`hasOwnProperty`这个属性就是找到`Object.prototype`才找到的 -->

## 数组去重

- 对象键值对处理

```javascript
Array.prototype.myUnique = function() {
  // this我们将要操作的数组
  let obj = {}
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    if (typeof obj[item] !== 'undefined') {
      // 当前项已经存在
      this[i] = this[this.length - 1]
      _this.pop()
      i--
      continue
    }
    obj[item] = true
  }
  obj = null
  return this
}
```

- 双循环（性能消耗过大）

```javascript
Array.prototype.myUnique = function() {
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    for (let j = i + 1; j < this.length; j++) {
      if (item == this[j]) {
        this[j] = this[this.length - 1]
        _this.pop()
        j--
      }
    }
  }
  return this
}
```

- indexOf:获取当前项在数组中第一次出现位置的索引（兼容性不好）

```javascript
Array.prototype.myUnique = function() {
  // 依次迭代数组中的每一项，验证当前项在数组中是否存在(不是和整个数组比较是否存在，而是和当前项后面项比较是否存在，类似于双for循环，存在干掉当前项)
  for (let i = 0; i < this.length; i++) {
    let item = this[i],
      nextAry = this.slice(i + 1)
    if(nextAry.indexOf(item)>-1){
        this.[i] = this[this.length-1]
        this.pop()
        i--
    }
  }
  return this
}
```

- 排序后相邻去除

```javascript
// 先把数组进行排序，验证当前项和后一项是否相同，如果不相同，说明没有重复
Array.prototype.myUnique = function() {
  let _this = []
  this.sort((a, b) => a - b)
  for (let i = 0; i < this.length; i++) {
    let item = this[i],
      next = this[i + 1]
    if (item !== next) {
      _this.push(item)
    }
  }
  return _this
}
```

- ES6 实现数组去重

```javascript
var arr = Array.from(new Set(arr))
```

## 常用算法

- 递归：函数自己掉自己执行就是递归（递归是基于条件判断的：因为我们不能形成死递归，在某个条件下我们需要结束递归操作）

```javascript
//获取1-100之间即使3也是5的倍数的和
function fn(n) {
  if (n > 100) {
    return 0
  }
  if (n % 15 == 0) {
    return n + fn(n + 1)
  }

  return fn(n + 1)
}
fn(1)
```

- 去重
- 冒泡排序
- 插入排序
- 快速排序
- 时间复杂度
- 空间复杂度
- KMP

## 关于 es6 中的类和继承

- es6 中创建类有自己的标准语法（这种语法创建出来的类只能 new 执行，不能当作普通函数执行）

```javascript
// function Fn(n, m) {
//   this.x = n
//   this.y = m
// }
// Fn.prototype.getX = function(){}
// Fn.prototype.BB = 100
// Fn.AA = function (){}//把Fn当作一个普通对象设置一个私有的方法（和实例没有关系）

class Fn {
  //Fn是类名，没有小括号
  constructor(n, m) {
    //等价于传统es5类的构造体
    this.x = n
    this.y = m
  }
  //给Fn的原型上设置方法(只能试设置方法不能设置属性)
  getX() {
    console.log(this.x)
  }
  //把Fn当作一个普通对象设置的私有方法（和实例没有关系），同样也只能设置方法不能设置属性
  static AA() {}
}
// 给Fn的原型设置一个方法
Fn.prototype.BB = 100
// 把Fn当作一个普通对象设置一个私有属性
Fn.BB = 200

class B extends Fn {
  //extends类似于实现了原型继承
  constructor(n, m) {
    super(n, m) // 类似于call继承;在这里`super`相当于把Fn的`constructor`执行了，并且让方法中的`this`是B的实例,`super`当中传递的参数都是再给Fn的`constructor`传递
    this.b = 200
  }
  getY() {
    console.log(this.b)
  }
}

let f = new B(10, 5)
```

## call、apply、bind

**`call/apply`的作用**

- 改变函数中的 this
- 可以基于 call 让类数组借用数组圆形上的方法（例如：借用 slice 实现把类数组转换为数组）
- 可以基于 call 实现继承
- 可以基于 apply 获取数组中的最大值和最小值

```javascript
// 如何获取数组中的最大值
// 1. 数组先排序，获取数组中的第一个和最后一个就是最大最小值
console.log(arr.sort((a, b) => b - a)[0])
// 2. 假设法：假设第一个是最大的，让其和后面的每一项比较，如果当前项大于假设的值，修改假设的值
let max = ary[0]
ary.slice(1).forEach(item => {
  item > max ? (max = item) : null
})
// 3. 基于apply
Math.max.apply(null, ary)
// 4. 基于es6展开运算符
Math.max(...ary)
```

## 阿里一道经典面试题

```javascript
function Foo() {
  getName = function() {
    console.log(1)
  }
  return this
}

Foo.getName = function() {
  console.log(2)
}

Foo.prototype.getName = function() {
  console.log(3)
}

var getName = function() {
  console.log(4)
}

function getName() {
  console.log(5)
}

Foo.getName() //2
getName() // 4
Foo().getName() // 1
getName() // 1
new Foo.getName() // 2
new Foo().getName() // 3
new new Foo().getName() //3
```
