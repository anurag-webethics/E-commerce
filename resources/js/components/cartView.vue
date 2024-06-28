<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-else>
    <b-container>
      <div id="cart">
        <div v-if="cartDetails.length == 0">
          <h2>The cart is empty</h2>
        </div>
        <div v-else>
          <div v-for="( cartDetail, index ) in cartDetails" :key="index" class="mb-3">
            <div class="d-flex">
              <img :src="productDetails[index].productimages[0].url" alt="" height="250px">
              <div class="ps-5">
                <h2>Name: {{ productDetails[index].title }}</h2>
                <h4>Description: {{ productDetails[index].description }}</h4>
                <h4>Price: {{ productDetails[index].price }}</h4>
                <div class="d-flex">
                  <h5>Quantity:</h5>
                  <b-form-select v-model="cartDetail['quantity']" :options="options" size="sm" class="text-center mb-3"
                    style="width: 20%;"></b-form-select>
                </div>
                <h4>Total price: {{ productDetails[index].price * cartDetail['quantity'] }}</h4>
                <a href="#" @click="deleteProductToCart(cartDetail.cart_id, productDetails[index].id)">Remove from
                  cart</a>
              </div>
            </div>
          </div>
          <a href="#" @click="buyProducts(cartDetails[0].cart_id)">Proceed to buy</a>
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
      options: [
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 },
      ],
      productAdd:
      {
        products: []
      },
    }
  },
  mounted() {
    this.getCartItem();
  },
  methods: {
    getCartItem() {
      http.get('carts')
        .then((response) => {
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
            this.$emit('decrement');
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    buyProducts(cartId) {
      this.cartDetails.forEach(item => {
        this.productAdd.products.push({
          product_id: item.product_id,
          quantity: item.quantity
        });
      });
      http.put(`carts/${cartId}`, this.productAdd)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
    },

  }
}
</script>

<style scoped>
#cart {
  height: 100%;
  margin: 20px 0;
  border: 1px solid rgba(0, 0, 0, 0.356);
  padding: 2rem;
}
</style>
