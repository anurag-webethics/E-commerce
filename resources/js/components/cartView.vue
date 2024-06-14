<template>
  <div>
    <b-container>
      <div id="cart">
        <!-- {{ cartDetails }} -->
        <!-- {{ productDetails }} -->
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

export default {
  name: 'CartView',
  props: ['cart'],
  data() {
    return {
      cartDetails: '',
      productDetails: [],
    }
  },
  mounted() {
    this.getCartItem();
  },
  methods: {
    getCartItem() {
      http.get('carts')
        .then((response) => {
          console.log(response.data.carts);
          this.cartDetails = response.data.carts[0]['cart_products'];
          this.cartDetails.forEach(cart => {
            this.getFetchProductData(cart.product_id);
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
  border: 1px solid black;
  padding: 2rem;
}
</style>
