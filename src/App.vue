<template>
  <HeadWrapper/>
  <router-view></router-view>
</template>

<script>
import HeadWrapper from './components/headWrapper.vue'
export default {
  name: 'App',
  components: {
    HeadWrapper
  },
  setup () {
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Roboto Mono', monospace, 'openhuninn', 'Noto Sans TC', sans-serif;
  text-align: center;
  color: #223322;
}
.icon{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fda085;
  text-align: center;
  position: relative;
  span{
    color: #fff;
    line-height: 40px;
    font-size: 20px;
    font-family: 'Material Icons';
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
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 15px solid #fda085;
  }
}
</style>
