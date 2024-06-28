<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-else>
    <b-container>
      <div class="d-flex border" style="width: 100%;">
        <div style="width: 70%; height: 100%;" class="border p-5">
          <div class="" style="width: 80%;">
            <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab"
              style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
              <b-carousel-slide v-for="images in productData.productimages" :key="images.index" :img-src="(images.url)"
                id="image"></b-carousel-slide>
            </b-carousel>
          </div>
          <h4 class="pt-3">{{ productData.title }}</h4>
          <h5>Description:{{ productData.description }}</h5>
          <h5>Price:{{ productData.price }}</h5>
          <div class="d-flex">
            <h5>Quantity:</h5>
            <b-form-select v-model="productAdd.products[0].quantity" :options="options" size="sm"
              class="text-center mb-3" style="width: 5%;"></b-form-select>
          </div>
          <div class="pt-3">
            <p v-if="isProductExist == true">Your product is already exist in cart</p>
            <b-button variant="success" type="submit" @click="addToCartProduct()" v-else>Add to
              Cart</b-button>
          </div>
        </div>
        <div style="width: 30%;" class="p-5">
          <div class="d-flex justify-content-between">
            <h4>Total price:</h4>
            <p id="price">{{ productAdd.products[0].quantity * productData.price }}</p>
          </div>
          <hr>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import http from '../axios';
import Loader from './loader.vue'

export default {
  name: 'ProductView',
  components: {
    Loader,
  },
  data() {
    return {
      productData: {
        title: '',
        description: '',
        price: '',
        category_id: '',
        productimages: [],
      },
      slide: 0,
      sliding: null,
      loading: true,
      productAdd:
      {
        products: [
          {
            product_id: this.$route.params.id,
            quantity: 1,
          }
        ]
      },
      options: [
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 },
      ],
      cartDetails: '',
      isProductExist: false,
    }
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      http.get(`products/${this.$route.params.id}`)
        .then((repsonse) => {
          this.getCartItem();
          this.loading = false;
          this.productData = repsonse.data.product;
          this.priceUpdate = repsonse.data.product.price;
        }).catch((error) => {
          console.log(error);
        })
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    addToCartProduct() {
      http.post('carts', this.productAdd)
        .then((repsonse) => {
          this.getProduct();
          this.$emit('increment');
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getCartItem() {
      http.get('carts')
        .then((response) => {
          this.cartDetails = response.data.carts[0]['cart_products'];
          if (this.cartDetails.some(obj => obj.product_id == this.productData.id)) {
            this.isProductExist = true;
          }
          else {
            this.isProductExist = false;
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },
}
</script>

<style scoped>
#image {
  height: 320px;
  width: 100%;
  object-fit: contain;
  overflow: hidden;
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>