<template>
  <div>
    <div>name:{{firstName}}</div>
    <div>name:{{fullName}}</div>
    <input type="text" v-model="firstName" />
    <input type="text" v-model="lastName" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "randy",
      lastName: "72"
    };
  },
  methods: {},
  computed: {
    fullName() {
      return this.firstName + this.lastName;
    }
  },
  watch: {
    firstName() {
      console.log("firstName change");
    },
    lastName(newValue, oldValue) {
      console.log(newValue);
      console.log(oldValue);
    }
  }
};
</script>

<style>
</style>
