<template>
  <div id="app-wrapper">
    <h1>router test</h1>
    <router-link to="/home">home</router-link>
    <router-link to="/home" tag="li">home li tag</router-link>
    <router-link to="/home" replace>home replace</router-link><br/>

    <router-link :to="{path: '/home'}">home</router-link><br/>
    <router-link :to="{path: '/home', query: {id: '1'}}">home query</router-link><br/>
    <router-link :to="{path: '/home', params: {id: '1'}}">home params 拿不到</router-link><br/>
    <router-link :to="{name: 'home', params: {userName: 'randy'}}">home params只能使用name</router-link><br/>

    <div @click="push">push方法</div>
    <div @click="replace">replace方法</div>
    <div @click="go">go方法</div>
    <div @click="back">back方法</div>
    <div @click="forward">forward方法</div>

    <router-link to="/m">main alias m</router-link><br/>
    <router-link to="/main">main</router-link><br/>

    <router-link to="/content">content redirect to home</router-link><br/>

    <router-link to="/about/randy">dynamic params</router-link><br/>
    <router-link to="/about/demi">dynamic params</router-link><br/>

    <router-link to="/all">name view</router-link><br/>

    <h1>axios test</h1>
    <router-link to="/axios">axios</router-link>

    <h1>vuex test</h1>
    <router-link to="/vuex">vuex</router-link>

    <h1>component test</h1>
    <component-test :list="list" @click.native="alert" @alertAge="alertPeopleName">
      <div slot="start">名字开始</div>
      <div slot="end">名字结束</div>
    </component-test>

    <h1>directive test</h1>
    <div>
      <div v-focus>aa</div>
    </div>

    <h1>elementui test</h1>
    <router-link to="/layout">layout</router-link>
    <router-link to="/container">container</router-link>
    <router-link to="/table">table</router-link>

    <h1>echarts test</h1>
    <router-link to="/allEcharts">allEcharts</router-link>

    <h1>transition test</h1>
    <router-link to="/transitiontest">transition</router-link>

    <h1>methods test</h1>
    <transition>
      <router-link to="/methodstest">methodstest</router-link>
    </transition>

    <h1>event test</h1>
    <transition>
      <router-link to="/eventtest">eventtest</router-link>
    </transition>

    <h1>lifecycle test</h1>
    <transition>
      <router-link to="/lifecycletest">lifecycletest</router-link>
    </transition>

    <h1>eventmodifier test</h1>
    <transition>
      <router-link to="/eventmodifiertest">eventmodifiertest</router-link>
    </transition>

    <h1>xunhuan test</h1>
    <transition>
      <router-link to="/xunhuan">xunhuan</router-link>
    </transition>

    <h1>methods test</h1>
    <transition>
      <router-link to="/methods">methods</router-link>
    </transition>

    <h1>filters test</h1>
    <transition>
      <router-link to="/filters">filters</router-link>
    </transition>

    <h1>watch test</h1>
    <transition>
      <router-link to="/watch">watch</router-link>
    </transition>

    <h1>slot test</h1>
    <keep-alive>
      <Slot>
        <span slot="header">我是header</span><br/>
        <span slot="footer">我是footer</span><br/>
        <span >我是没有名字的slot</span>
      </Slot>
    </keep-alive>
    <h1>elementui test</h1>
    <router-link to="/elementlayout">elementlayout</router-link>


    <hr/>
    <h1>视图区</h1>
    <transition name="slide-left">
      <router-view></router-view>
    </transition>

    <router-view name="home"></router-view>
    <router-view name="main"></router-view>
  </div>
</template>

<script>
  import ComponentTest from './components/ComponentTest'
  import Slot from './views/slot'

export default {
  name: 'App',
  data() {
    return {
      list:[
        {name: 'randy', age: 24},
        {name: 'demi', age: 25}
      ],
      show: true
    }
  },
  methods: {
    alert() {
      window.alert('组件绑定原生事件要加.native');
    },
    alertPeopleName(age) {
      window.alert(age);
    },
    push() {
      // this.$router.push({path: '/home', query: {id: 1}})
      // this.$router.push({path: '/home', params: {id: 1}}) //拿不到params里面的参数
      // this.$router.push({name: 'home', params: {id: 1}})
      this.$router.push('/home')
    },

    replace() {
      // this.$router.replace('/home')
      // this.$router.replace({path: '/home', query: {id: 1}})
      // this.$router.replace({path: '/home', params: {id: 1}}) //拿不到params里面的参数
      this.$router.replace({name: 'home', params: {id: 1}})
    },

    go() {
      this.$router.go(-1)
    },

    back() {
      this.$router.back()
    },

    forward() {
      this.$router.forward()
    }

  },
  components: {
    'component-test': ComponentTest,
    Slot
  },
  directives: {
    focus: {
      bind: function(el, bing){
        console.log('指令所绑定的元素：',el)
        console.log('包含指令相关的对象:', bing)
        console.log('directive bind')
      },
      // 指令的定义
      inserted: function (el) {
        console.log('directive inserted')
      },
      update: function () {
        console.log('directive update')
      },
      componentUpdated: function () {
        console.log('directive component update')
      },
      unbind: function () {
        console.log('directive unbind')
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 100px;
}
</style>
