<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  setup () {
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Roboto Mono', monospace, 'openhuninn', 'Noto Sans TC', sans-serif;
  text-align: center;
}
.icon{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #331245;
  text-align: center;
  position: relative;
  p{
    color: #fff;
    line-height: 50px;
    font-size: 20px;
  }
  &::before{
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 90%;
    margin: auto;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 20px solid #331245;
  }
}
</style>
