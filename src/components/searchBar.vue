<template>
<div class="search">
  <div class="content">
    <label for="bar" class="label">搜尋站點</label>
    <input type="search" placeholder="站點名稱" id="bar" list="station">
  </div>
</div>
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
.search{
  height: 100%;
  &::before{
    content: '';
    width: 0;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  .content{
    display: inline-block;
    vertical-align: middle;
    .label{
      display: block;
      font-size: 20px;
      line-height: 1.5;
    }
      #bar{
        width: 300px;
        padding: 10px 20px;
        box-sizing: border-box;
        border: none;
        border-radius: 20px;
        font-size: 16px;
        line-height: 1.5;
        outline: none;
        box-shadow: 0 0 0 1px #222;
      }
  }
  
}
</style>