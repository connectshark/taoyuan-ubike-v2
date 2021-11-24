<template>
  <HeadWrapper/>
  <router-view></router-view>
  <FooterWrapper/>
</template>

<script>
import HeadWrapper from './components/headWrapper.vue'
import FooterWrapper from './components/footerWrapper.vue'
export default {
  name: 'App',
  components: {
    HeadWrapper,
    FooterWrapper
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
.material-icons-outlined {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
</style>
