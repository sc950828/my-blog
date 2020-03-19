<template>
  <div class="wrapper">
    <div>获取动态路由参数{{$route.params.id}}</div>
    <div>
      <router-link to="/router1/52">/router1/52</router-link>
    </div>
  </div>
</template>

<script>
export default {
  // 路由进入
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter to", to);
    console.log("beforeRouteEnter from", from);
    next();
  },
  // 路由更新  监听路由参数变化的第一种方法
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate to", to);
    console.log("beforeRouteUpdate from", from);
    next();
  },
  // 路由离开
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave to", to);
    console.log("beforeRouteLeave from", from);
    next();
  },
  // 监听路由参数变化的第二种方法
  watch: {
    $route(newval, oldval) {
      console.log("watch", newval);
      console.log("watch", oldval);
    }
  }
};
</script>
