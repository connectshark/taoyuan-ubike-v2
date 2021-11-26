<template>
<div class="home">
  <div class="hero">
    <main class="panel">
      <h2>TYBIKE</h2>
      <p>專為桃園人所打造的找UBike平台</p>
      <p>快速瀏覽周遭周遭站點資訊</p>
      <router-link to="/bike" class="btn">找UBike</router-link>
    </main>
  </div>
  <section class="introduce">
    <Card
      :content="'在地圖上尋找ubike站點位置'"
      :btnType="1"
    />
    <Card
      :icon="'bx-share-alt'"
      :content="'分享這個好用的網站'"
      :btnType="2"
    />
    <Card
      :icon="'bx-map'"
      :content="'授權定位能更快找到附近的站點'"
      :btnType="1"
    />
  </section>
  <section class="links">
    <h3>相關站點</h3>
    <ul>
      <li>
        <a class="link" href="https://shopee.nosegates.com/" target="_blank" rel="noopener noreferrer">蝦皮短網址</a>
      </li>
    </ul>
  </section>
</div>
</template>

<script>
import Card from '../components/card.vue'
export default {
  components: {
    Card
  },
  setup () {
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/color.scss';
@import '../assets/scss/mixin.scss';
.home{
  background-color: #F6F7F9;
  width: 100%;
  max-width: 600px;
  margin: auto;
  .hero{
    background-image: url('https://source.unsplash.com/random/600x600/');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 500px;
    &::before{
      content: '';
      width: 0;
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .panel{
      display: inline-block;
      vertical-align: middle;
      width: 80%;
      border-radius: 10px;
      margin: auto;
      height: 60%;
      background-color: #ffffffee;
      padding: 20px 0 0;
      box-sizing: border-box;
      h2{
        font-size: 24px;
        line-height: 4;
        font-weight: bold;
      }
      p{
        font-size: 16px;
        line-height: 2;
        margin-bottom: 20px;
      }
    }
  }
  section{
    padding: 40px 0;
  }
  .links{
    background-image: linear-gradient(to bottom,#F6F7F9 0% ,#fff 100% );
    h3{
      font-size: 20px;
      line-height: 2;
      font-weight: bold;
    }
    ul{
      li{
        padding: 10px 0;
      }
    }
  }
}

</style>