# Proxy

## 概述

proxy 用于修改某些操作得默认行为，等同于在语言层面做出修改，属于一种‘元编程’（meta programming）,即对编程语言进行编程。可以理解为在目标对象之前架设一层‘拦截’，外界对该对象得访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界得访问进行过滤和修改。

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```javascript
var proxy = new Proxy(target, handler)
```

proxy 对象得所有用法，都是以上面这种形式，不同的只是 handler 参数的写法。其中，new Proxy()表示生成一个 Proxy 实例，target 参数表示所要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为。

::: warning 注意
要使 Proxy 起作用，必须针对 Proxy 实力进行操作，而不是目标对象进行操作。
如果 handler 没有设置任何拦截，那就等同于是直接通向元对象。
:::

> 小技巧：将 Proxy 对象设置到 object.proxy 属性，从而可以在 object 对象上调用

::: warning Proxy 支持的拦截操作:

- get(target,propKey,receiver):拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']
- set(target,propKey,value,receiver):拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v,返回一个布尔值
- has(target,propKey):拦截 propKey in proxy 的操作，返回一个布尔值
- deleteProperty(target,propKey):拦截 delete proxy[propKey]的操作，返回一个布尔值
- ownKeys(target):拦截 Object.getOwnPropertyNames(proxy)、bject.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的名，而 Object.keys()的返回结果仅包括目标对象自身可遍历属性
- getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
- defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值
- preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值
- getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象
- isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值
- setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)
  :::

## Proxy 实例的方法

### get()

get 方法用于拦截某个属性的读取操作，可以接受三个参数，一次为目标对象、属性名 [和 proxy 实例本身（操作所针对的对象）]
