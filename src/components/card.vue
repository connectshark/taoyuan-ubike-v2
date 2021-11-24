<template>
<div class="card">
  <div class="icon-p">
    <i v-if="icon" class='bx bx-tada-hover' :class="icon"></i>
    <span v-else class="material-icons-outlined">directions_bike</span>
  </div>
  <p class="content">{{content}}</p>
  <router-link to="/bike" class="btn" v-if="btnType === 1">找UBike</router-link>
  <a href="javascript:;" class="btn" v-else-if="btnType === 2" @click="share">分享</a>
</div>
</template>

<script>
export default {
  props: {
    content: {
      type: String
    },
    icon: {
      type: String
    },
    btnType: {
      type: Number
    }
  },
  setup () {
    const share = () => {
      if (navigator.share) {
        navigator.share({
          title: 'TYBike',
          text: '專為桃園人所打造的找UBike平台',
          url: 'https://connectshark.github.io/taoyuan-ubike-v2/',
        })
      }
    }
    return {
      share
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/color.scss';
@import '../assets/scss/mixin.scss';
.card{
  width: 60%;
  margin: auto;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 40px;
  background-color: #fff;
  .icon-p{
    span, i{
      font-size: 60px;
      color: $main;
    }
  }
  .content{
    font-size: 16px;
    line-height: 2;
    padding: 20px 0;
  }
}
</style>