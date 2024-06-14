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
          <p>Description:{{ productData.description }}</p>
          <h5>Price:{{ productData.price }}</h5>
          <div class="d-flex">
            <!-- <button v-on:click="decrement(number--)">-</button> -->
            <input type="number" name="number" id="number" v-model="productAdd.products[0].quantity" style="width: 5%;"
              class="text-center">
            <!-- <button v-on:click="increment(number++)">+</button> -->
          </div>
          <div class="pt-3">
            <b-button variant="success" type="submit" @click="addToCartProduct">Add Cart</b-button>
          </div>
        </div>
        <div style="width: 30%;" class="p-5">
          <div class="d-flex justify-content-between">
            <h4>Price:</h4>
            <p id="price">{{ priceUpdate }}</p>
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
      priceUpdate: "",
      productAdd:
      {
        products: [
          {
            product_id: this.$route.params.id,
            quantity: 1,
          }
        ]
      }
    }
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.loading = true;
      http.get(`products/${this.$route.params.id}`)
        .then((repsonse) => {
          console.log(repsonse.data.product);
          this.productData = repsonse.data.product;
          this.priceUpdate = repsonse.data.product.price;
          this.loading = false;
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
      let data = this.productAdd;
      http.post('carts', this.productAdd)
        .then((repsonse) => {
          this.$emit('cart');
          console.log(this.$emit('increment'));
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

/* 
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
} */
</style>