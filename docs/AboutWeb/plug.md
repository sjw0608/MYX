# Vue 相关知识点

## 组件通信

- 父子组件通信(父——>子) prop

  ```html
  <div id="app">
    <h1>我是父组件App</h1>
    <aaa :num="num"></aaa>
  </div>
  ```

  ```javascript
  Vue.component('aaa', {
    template: `
                <div>我是子组件aaa---->{{num}}</div>
            `,
    props: ['num']
  })

  let app = new Vue({
    el: '#app',
    data() {
      return {
        num: 1000
      }
    }
  })
  ```

- 父子组件通信(子——>父) \$emit

  ```html
  <div id="app">
    <h1>我是父组件App</h1>
    <aaa @func="sayHi"></aaa>
  </div>
  ```

  ```javascript
  Vue.component('aaa', {
    template: `
                <div>我是子组件aaa
                    <button @click='handleClick'>点我</button>
                </div>
            `,
    data() {
      return {
        hi: '我不好'
      }
    },
    methods: {
      handleClick() {
        this.$emit('func', this.hi)
      }
    }
  })

  let app = new Vue({
    el: '#app',
    methods: {
      sayHi(msg) {
        console.log(msg)
      }
    }
  })
  ```

- 组件通信 bus

  ```html
  <div id="app">
    <aaa>我是组件aaa</aaa>
    <bbb>我是组件bbb</bbb>
  </div>
  ```

  ```javascript
  Vue.component('aaa', {
    template: `
                  <div>我是子组件aaa
                      <button @click='go'>点我传递参数</button>
                  </div>
              `,
    methods: {
      go() {
        bus.$emit('hi', '这是aaa来的数据')
      }
    }
  })

  Vue.component('bbb', {
    template: `
                  <div>我是子组件bbb
                  </div>
              `,
    mounted() {
      bus.$on('hi', function(data) {
        console.log('这是bbb=====>', data)
      })
    },
    methods: {}
  })
  let bus = new Vue()
  let app = new Vue({
    el: '#app',
    mounted() {
      bus.$on('hi', function(data) {
        console.log('这是app=====>', data)
      })
    }
  })
  ```

- 组件通信 数据同步

  ```html
  <div id="app">
    <h1>这是app---->{{num}}</h1>
    <aaa :num.sync="num">我是组件aaa</aaa>
  </div>
  ```

  ```javascript
  Vue.component('aaa', {
    template: `
                  <div>我是子组件aaa ---->{{num}}
                      <button @click='go'>点我传递参数</button>
                  </div>
              `,
    props: ['num'],
    methods: {
      go() {
        this.$emit('update:num', '这是a来的数据')
      }
    }
  })
  let app = new Vue({
    el: '#app',
    data() {
      return {
        num: 1000
      }
    }
  })
  ```

  :::warning 使用`.sync` 规范
  变量名和属性名一致；emit 中一定是 update：属性名称
  :::

- 组件通信 v-model

  ```html
  <div id="app">
    <h1>这是App ---> {{num}}</h1>
    <cc v-model="num"></cc>
  </div>
  ```

  ```javascript
  Vue.component('cc', {
    template: `<div>这是子组件cc ---> {{value}}
                <button @click="go">点击传递参数</button></div>
            `,
    props: {
      value: Number
    },
    methods: {
      go() {
        this.$emit('input', 50000)
      }
    }
  })
  let app = new Vue({
    el: '#app',
    data() {
      return {
        num: 1000
      }
    }
  })
  ```

- 组件通信 provide_inject
  可以实现跨组件间的通信

  ```html
  <div id="app">
    <h1>这是App</h1>
    <cc></cc>
  </div>
  ```

  ```javascript
  Vue.component('cc', {
    template: `
              <div>
                  这是一个子组件cc----》{{num}}
                  <fff></fff>
              </div>
              `,
    inject: ['num']
  })

  Vue.component('fff', {
    template: `
              <div>
                  这是一个子组件fff----》{{num}}
              </div>
              `,
    inject: ['num'] //注入 想用的数据
  })

  let app = new Vue({
    el: '#app',
    provide: {
      // 提供一个共享数据源
      num: 1000
    }
  })
  ```

- 组件通信 $attrs_$listeners

  ```html
    div id="app">
        <h1>这是App</h1>
        <cc :num='num' :name='name' @hi='hi'></cc>
    </div>
  ```

  ```javascript
  Vue.component('cc', {
    template: `
                <div>这是子组件cc---》{{num}}
                <button @click='go'>cc点击向app触发事件</button>
                <fff v-bind='$attrs' v-on="$listeners"></fff>
                </div>
            `,
    props: {
      num: Number
    },
    methods: {
      go() {
        this.$emit('hi', 'ccc数据')
      }
    }
  })

  Vue.component('fff', {
    template: `
                <div>cc的子组件fff--->{{f}}
                <button @click='go'>fff点击向app触发事件</button>
                </div>
            `,
    data() {
      return {
        f: ''
      }
    },
    mounted() {
      this.f = this.$attrs.name
    },
    methods: {
      go() {
        this.$emit('hi', 'fff数据')
      }
    }
  })

  let app = new Vue({
    el: '#app',
    data() {
      return {
        num: 1000,
        name: '张三'
      }
    },
    methods: {
      hi(val) {
        console.log('app===>', val)
      }
    }
  })
  ```
