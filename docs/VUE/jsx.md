### 1、createElement 方法

主要有三个参数 标签 属性 子标签

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  "div",

  // {Object}
  // 一个与模板中 attribute 对应的数据对象。可选。
  {
    // 属性
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    "先写一些文字",
    createElement("h1", "一则头条"),
    createElement(MyComponent, {
      props: {
        someProp: "foobar"
      }
    })
  ]
);
```

常用属性

```js
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```

### 2、jsx 语法

当遇到< 标签时 JSX 就当 HTML 解析，遇到{就当 JavaScript 解析。

js 表达式我们可以写在 render 方法的 return 语句上

js 变量我们使用{}包裹

```js
render(){
  let ifText
  if(this.show){
      ifText=<p>你帅</p>
  }else{
      ifText=<p>你丑</p>
  }
  return (
    <div>
      {ifText}
    </div>
  )
}
```

### 3、v-for

我们使用 map 代替 v-for

```js
data(){
  return{
    show:false,
    list:[1,2,3,4]
  }
},
render(){
  return (
    <div>
      {this.list.map((v)=>{
        return <p>{v}</p>
      })}
    </div>
  )
}
```

### 4、v-model

```js
<script>
  export default {
    name: "item",
    data(){
      return{
        show:false,
        list:[1,2,3,4],
        text:'',
      }
    },
    methods:{
      input(e){
        this.text=e.target.value
      }
    },
    render(){
      return (
        <div>
          <input type="text" value={this.text} onInput={this.input}/>
          <p>{this.text}</p>
        </div>
      )
    }
  }
</script>
```

### 5、使用自定义组件

很简单，只需要导入进来，不用再在 components 属性声明了，直接写在 jsx 中

```js
<script>
import HelloWolrd from './HelloWorld'
export default {
  name: "item",
  render(){
    return (
        <HelloWolrd/>
    )
  }
}
</script>
```

### 6、事件，class,style,ref 等等怎么绑定？

```js
render (h) {
  return (
    <div
      // normal attributes or component props.
      id="foo"
      // DOM properties are prefixed with `domProps`
      domPropsInnerHTML="bar"
      // event listeners are prefixed with `on` or `nativeOn`
      onClick={this.clickHandler}
      nativeOnClick={this.nativeClickHandler}
      // other special top-level properties
      class={{ foo: true, bar: false }}
      style={{ color: 'red', fontSize: '14px' }}
      key="key"
      ref="ref"
      // assign the `ref` is used on elements/components with v-for
      refInFor
      slot="slot">
    </div>
  )
}
```
