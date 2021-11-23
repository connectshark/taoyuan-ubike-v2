<template>
<transition name="fade">
  <div class="modal-background" @click="$emit('update:modal', false)" v-if="modal">
    <div class="modal" @click.stop>
      <slot/>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  props: ['modal'],
  emits: ['update:modal']
}
</script>

<style lang="scss" scoped>
.modal-background{
  font-family: 'Roboto Mono', monospace, 'openhuninn', 'Noto Sans TC', sans-serif;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #000000cc;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-end;
  .modal{
    width: 100%;
    max-width: 600px;
    height: 60vh;
    min-height: 300px;
    background-color: #fff;
    border-radius: 20px 20px 0 0;
    box-sizing: border-box;
    transition: transform .3s ease-in-out;
  }
}

.fade-enter-from, .fade-leave-to{
  background-color: #00000000;
  .modal{
    transform: translateY(60vh);
  }
}
.fade-enter-to, .fade-leave-from{
  background-color: #000000cc;
  .modal{
    transform: translateY(0);
  }
}
.fade-enter-active, .fade-leave-active{
  transition: background .3s ease;
}
</style>