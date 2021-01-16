### jsx 简介

JSX 是一种 Javascript 的语法扩展，JSX = Javascript + XML，即在 Javascript 里面写 XML，因为 JSX 的这个特性，所以他即具备了 Javascript 的灵活性，同时又兼具 html 的语义化和直观性。

### 函数式组件

第一种通过配置 通过 functional 配置为 ture 就是函数式组件

```js
export default {
  // 通过配置functional属性指定组件为函数式组件
  functional: true,
  /**
   * 渲染函数
   * @param {*} h
   * @param {*} context 函数式组件没有this, props, slots等都在context上面挂着
   */
  render(h, context) {
    const { props } = context;
    if (props.avatar) {
      return <img src={props.avatar}></img>;
    }
    return <img src="default-avatar.png"></img>;
  },
};
```

第二种 Vue.2.5 之后，函数式组件也可以使用模板语法,但使用 JSX 可能会更方便一些

```html
<template functional> </template>
```

### createElement 方法

createElement 函数返回的值称之为虚拟节点，即 VNode，而由 VNode 扎堆组成的树便是大名鼎鼎的虚拟 DOM。

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
        someProp: "foobar",
      },
    }),
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

### jsx 语法

当你选择使用 JSX 的时候，你就要做好和指令说拜拜的时候了，在 JSX 中， 你唯一可以使用的指令是 v-show（vShow）,除此之外，其他指令都是不可以使用的。经测试(Vue2.6.11),Vue 在 JSX 中已对 v-model 进行了支持，大家可以直接使用`<input v-model={this.value}>`

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

### v-model

通过事件和 value 重写语法糖

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

### v-for

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

### v-if

v-if 可以使用三元运算符等代替

```js
const isGirl = false;
return isGirl ? <span>小妹，哥哥教你写Vue</span> : <span>鸟你干啥</span>;
```

### v-bind

```js
render() {
  return <input value={this.name}></input>
}

```

### v-html 与 v-text

```js
// v-html
export default {
  data() {
    return {
      content: "<div>这是子君写的一篇新的文章</div>",
    };
  },
  render() {
    // v-html 指令在JSX的写法是 domPropsInnerHTML
    return <div domPropsInnerHTML={this.content}></div>;
  },
};

// v-text
export default {
  data() {
    return {
      content: "这是子君写的一篇新的文章的内容",
    };
  },
  render() {
    return <div domPropsInnerText={this.content}></div>;
    // return <div>{this.content}</div> innertext也可以这样写
  },
};
```

### 使用自定义组件

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

### 事件，class,style,ref 等等怎么绑定？

普通事件通过 on + 事件名称的大驼峰写法来监听，原生事件通过 nativeOn + 事件名称的大驼峰写法来监听

```js
render() {
  return <CustomSelect onChange={this.$_handleChange}></CustomSelect>
}

render() {
  // 监听下拉框根元素的click事件
  return <CustomSelect nativeOnClick={this.$_handleClick}></CustomSelect>
}
```

除了上面的监听事件的方式之外，我们还可以使用对象的方式去监听事件

```js
// 使用对象的方式
render() {
  return (
    <ElInput
      value={this.content}
      on={{
        focus: this.$_handleFocus,
        input: this.$_handleInput
      }}
      nativeOn={{
        click: this.$_handleClick
      }}
    ></ElInput>
  )
}

```

事件修饰符

.stop ： 阻止事件冒泡，在 JSX 中使用 event.stopPropagation()来代替

.prevent：阻止默认行为，在 JSX 中使用 event.preventDefault() 来代替

.self：只当事件是从侦听器绑定的元素本身触发时才触发回调，使用下面的条件判断进行代替

```js
if (event.target !== event.currentTarget) {
  return;
}
```

.enter 与 keyCode: 在特定键触发时才触发回调

```js
if (event.keyCode === 13) {
  // 执行逻辑
}
```

对于.once,.capture,.passive,.capture.once

```js
render() {
  return (
    <div
      on={{
        // 相当于 :click.capture
        '!click': this.$_handleClick,
        // 相当于 :input.once
        '~input': this.$_handleInput,
        // 相当于 :mousedown.passive
        '&mousedown': this.$_handleMouseDown,
        // 相当于 :mouseup.capture.once
        '~!mouseup': this.$_handleMouseUp
      }}
    ></div>
  )
}
```

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
      // 作用域插槽
      scopedSlots
      slot="slot">
    </div>
  )
}
```

默认插槽

使用`this.$slots.default`获取默认插槽

```js
// 定义
render() {
  return (
    <ElDialog title="弹框标题" visible={this.visible}>
      {/*这里就是默认插槽*/}
      <div>这里是弹框内容</div>
    </ElDialog>
  )
}

// 获取
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  render() {
    return (
      <div class="custom-dialog" vShow={this.visible}>
        {/**通过this.$slots.default获取默认插槽*/}
        {this.$slots.default}
      </div>
    )
  }
}
```

具名插槽

```js
// 定义
render() {
  return (
    <ElDialog title="弹框标题" visible={this.visible}>
      <div>这里是弹框内容</div>
      {/** 定义具名插槽 */}
      <template slot="footer">
        <ElButton>确定</ElButton>
        <ElButton>取消</ElButton>
      </template>
    </ElDialog>
  )
}

// 获取
render() {
  return (
    <div class="custom-dialog" vShow={this.visible}>
      {this.$slots.default}
      {/**获取自定义的具名插槽*/}
      <div class="custom-dialog__foolter">{this.$slots.footer}</div>
    </div>
  )
}
```

作用域插槽

```js
data() {
  return {
    data: [
      {
        name: '子君'
      }
    ]
  }
},
render() {
  return (
    {/**scopedSlots即作用域插槽，default为默认插槽，如果是具名插槽，将default该为对应插槽名称即可*/}
    <ElTable data={this.data}>
      <ElTableColumn
        label="姓名"
        scopedSlots={{
          default: ({ row }) => {
            return <div style="color:red;">{row.name}</div>
          }
        }}
      ></ElTableColumn>
    </ElTable>
  )
}
```
