<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log(this.$store.state.login)
  }
}
</script>

<style lang="scss">
@import url("./assets/css/bootstrap.min");
@import url("./assets/css/common");
@import url("./assets/css/reset");
*{
  margin: 0;
  padding: 0;
}
html{
  font-size: 13.333333vw;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
</style>
