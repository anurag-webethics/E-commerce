<template>
  <div>
    <Header :cartCount=cartLength :key="$route.fullPath" @data="getHomePath($event)"></Header>
    <router-view @increment="increment()" @decrement="decrement()" :homePath="getPath" />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './common/header.vue';
import Footer from './common/footer.vue';
import http from './axios';

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      cartLength: '',
      getPath: '',
    }
  },
  mounted() {
    this.getCartItem();
  },
  methods: {
    increment() {
      this.cartLength++;
    },
    decrement() {
      this.cartLength--;
    },
    getHomePath(title) {
      this.getPath = title;
    },
    getCartItem() {
      http.get('carts')
        .then((response) => {
          this.cartLength = response.data.carts[0]['cart_products'].length;
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
