<template>
  <div class='wrapper'>
    <div>插值绑定</div>
    <div ref="text" v-text="'<span>hello randy</span>'"></div>
    <div>{{<span>hello randy</span>}}</div>
    <div ref="html" v-html="'<span>hello randy</span>'"></div>
    <div>{{'hello randy'}}</div>
    <div>
      <router-link to="/">返回</router-link>
    </div>
  </div>
</template>

<script>
