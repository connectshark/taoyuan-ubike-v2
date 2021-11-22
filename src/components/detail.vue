<template>
<div class="detail">
  <h3 class="title">{{name}}</h3>
  <div class="state" v-if="serviceType === 1">正常營運</div>
  <div class="state disable" v-else>無法使用</div>
  <div class="stop-group">
    <div class="stop">
      <div class="stop-title">可租借車數</div>
      <div class="stop-amount">{{available}}</div>
    </div>
    <div class="stop">
      <div class="stop-title">可歸還車數</div>
      <div class="stop-amount">{{availableReturn}}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    serviceType: Number,
    available: Number,
    availableReturn: Number
  },
  setup () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.detail{
  text-align: center;
  .title{
    font-size: 20px;
    line-height: 2;
    color: #fff;
    background-color: #022020;
  }
  .state{
    font-size: 14px;
    font-weight: bold;
    color: #07B041;
    line-height: 3;
  }
  .disable{
    color: #C02D2D;
  }
  .stop-group{
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .stop{
      position: relative;
      &:nth-child(1){
        &::before{
          content: '';
          position: absolute;
          width: 1px;
          height: 50%;
          background-color: #8C8C8C;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }
    
    .stop-title{
      color: #6D6D6D;
      font-size: 14px;
      line-height: 1.5;
    }
    .stop-amount{
      font-size: 24px;
      line-height: 2;
      color: #022020;
      font-weight: bold;
    }
  }
}
</style>