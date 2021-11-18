<template>
<div class="modal-background" @click="$emit('update:modal', false)" v-if="modal">
  <div class="modal">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  props: ['modal'],
  emits: ['update:modal']
}
</script>

<style lang="scss" scoped>
@keyframes pop {
  0%{
    transform: translateY(60vh);
  }
  100%{
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  0%{
  background-color: #cccccc00;
  }
  100%{
  background-color: #cccccccc;
  }
}
.modal-background{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  animation: fadeIn .4s ease-in-out;
  background-color: #cccccccc;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-end;
  .modal{
    width: 90%;
    height: 60vh;
    background-color: #fff;
    border-radius: 20px 20px 0 0;
    padding: 20px;
    box-sizing: border-box;
    animation: pop .4s ease-in-out;
  }
}
</style>