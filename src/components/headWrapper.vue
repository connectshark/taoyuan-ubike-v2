<template>
<header class="header">
  <router-link class="logo" to="/">
    <img src="https://i.imgur.com/j6qGsEP.jpg" alt="logo"><h1 class="title">TYBike</h1>
  </router-link>
  <nav class="nav">
    <ul class="icon-group">
      <li class="icon-item">
        <i class='bx bx-map'></i>
      </li>
    </ul>
  </nav>
</header>
</template>

<script>
export default {
  setup () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
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
        font-size: 25px;
      }
    }
  }
}
</style>