<template>
<header class="header">
  <router-link class="logo" to="/">
    <img src="https://i.imgur.com/j6qGsEP.jpg" alt="logo"><h1 class="title">TYBike</h1>
  </router-link>
  <nav class="nav">
    <ul class="icon-group">
      <li class="icon-item" @click="share">
        <i class='bx bx-share-alt'></i>
      </li>
    </ul>
  </nav>
</header>
</template>

<script>
export default {
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
.header{
  position: sticky;
  background-color: #ffffffaa;
  backdrop-filter: saturate(180%) blur(20px);
  top: 0;
  left: 0;
  border-radius: 0 0 10px 10px;
  padding: 20px 10px;
  box-shadow: 0 0 5px #ccc;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  margin: auto;
  .logo{
    img{
      width: 30px;
      vertical-align: middle;
    }
    .title{
      display: inline-block;
      vertical-align: middle;
      color: #223322;
      transition: color .3s;
      font-size: 20px;
    }
    &:hover{
      .title{
        color: #6e6e6e;
      }
    }
  }
  .nav{
    .icon-group{
      .icon-item{
        cursor: pointer;
        font-size: 25px;
        display: inline-block;
        margin: 0 10px;
        transform: scale(1);
        color: inherit;
        transition: color .3s, transform .3s;
        &:hover{
          color: $main;
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>