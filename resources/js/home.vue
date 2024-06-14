<!-- resources/js/app.vue -->
<template>
  <div>
    <Header cartCount=5></Header>
    <router-view @increment="increment" @decrement="decrement" />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './common/header.vue';
import Footer from './common/footer.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      cart: [],
      cartCount: 0,
    }
  },
  methods: {
    increment() {
      this.cartCount++;
      console.log(this.cartCount);
    },
    decrement() {
      this.cartCount--;
      console.log(this.cartCount);
    }
  },
};
</script>

<style>
/* Add your styles here */
</style>
