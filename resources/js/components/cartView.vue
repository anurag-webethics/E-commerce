<template>
  <div v-if="loading">
    <Loader/>
  </div>
  <div v-else>
    <b-container>
      <div id="cart">
        <div v-for="( cartDetail, index ) in cartDetails" :key="index" class="mb-3">
          <div class="d-flex">
            <img :src="productDetails[index].productimages[0].url" alt="" height="250px">
            <div class="ps-5">
              <h2>Name: {{ productDetails[index].title }}</h2>
              <h4>Description: {{ productDetails[index].description }}</h4>
              <h4>Price: {{ productDetails[index].price }}</h4>
              <h5>Quantity: {{ cartDetail['quantity'] }}</h5>
              <h4>Total price: {{ productDetails[index].price * cartDetail['quantity'] }}</h4>
              <a href="#" @click="deleteProductToCart(cartDetail.cart_id, productDetails[index].id)">Remove from
                cart</a>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import http from '../axios';
import Loader from './loader.vue';

export default {
  name: 'CartView',
  components: {
    Loader,
  },
  props: ['cart'],
  data() {
    return {
      cartDetails: '',
      productDetails: [],
      loading: true,
    }
  },
  mounted() {
    this.getCartItem();
  },
  methods: {
    getCartItem() {
      http.get('carts')
        .then((response) => {
          console.log(response.data.carts[0]['cart_products'].length);
          this.cartDetails = response.data.carts[0]['cart_products'];
          this.cartDetails.forEach(cart => {
            this.getFetchProductData(cart.product_id);
            this.loading = false;
          })
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getFetchProductData(product_Id) {
      if (product_Id) {
        http.get(`products/${product_Id}`)
          .then((response) => {
            let productData = response.data.product;
            this.productDetails.push(productData)
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    deleteProductToCart(cartId, productId) {
      if (confirm('Are you sure to remove the product from cart')) {
        http.delete(`carts/${cartId}/products/${productId}`)
          .then((repsonse) => {
            this.getCartItem();
            this.$emit('cart');
            console.log(this.$emit('decrement'));
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  }
}
</script>

<style scoped>
#cart {
  height: 100vh;
  margin: 20px 0;
  border: 1px solid rgba(0, 0, 0, 0.356);
  padding: 2rem;
}
</style>
