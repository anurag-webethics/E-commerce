<template>
  <transition name="modal">
    <div class="modal-container">
      <div class="modal-box">
        <slot name="header"></slot>
        <hr>
        <slot name="body"></slot>
        <hr>
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
}
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: white;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.445);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.8s ease;
}

.modal-box {
  border: red;
  background-color: white;
  margin: 0 auto;
  width: 45%;
  height: auto;
  padding: 20px 30px;
  transition: all 0.3s ease;
  border-radius: 5px;
}
</style>