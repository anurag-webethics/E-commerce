<template>
  <div id="loader">
    <b-spinner style="width: 3rem; height: 3rem;" variant="primary" label="Text Centered"></b-spinner>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
#loader{
  height: 70vh;
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>