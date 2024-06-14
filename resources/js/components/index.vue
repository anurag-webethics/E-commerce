<template>
  <div>
    <div v-if="loading">
      <Loader />
    </div>
    <div class="d-flex">
      <div>
        <Sidebar />
      </div>

      <b-container class="bv-example-row">
        <b-alert show variant="success" class="my-4" v-if="$route.query.msg">
          <p>{{ ($route.query.msg) ? $route.query.msg : '' }}</p>
        </b-alert>
        <router-link to="/product/add"><b-button variant="success" class="my-4">Add Product</b-button> </router-link>
        <b-row class="w-100">

          <b-col cols="4" v-for="userProductDetail in userProductDetails" :key="userProductDetail.id" class="w-25 my-3">
            <div class="border">
              <div>
                <b-dropdown id="dropdown-left" text="Actions" variant="primary" class="m-2">
                  <b-dropdown-item><router-link
                      :to="`product/view/${userProductDetail.id}`">View</router-link></b-dropdown-item>
                  <b-dropdown-item><router-link
                      :to="`/product/edit/${userProductDetail.id}`">Edit</router-link></b-dropdown-item>
                  <b-dropdown-item><button
                      v-on:click="getDeleteProduct(userProductDetail.id)">Delete</button></b-dropdown-item>
                </b-dropdown>
              </div>
              <b-card v-bind:title="userProductDetail.title"
                :img-src="userProductDetail.productimages.length > 0 ? userProductDetail.productimages[0].url : ''"
                img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                <b-card-text>
                  {{ userProductDetail.description }}
                </b-card-text>
              </b-card>
            </div>
          </b-col>
        </b-row>

      </b-container>
    </div>
  </div>
</template>

<script>
import http from '../axios';
import Loader from './loader.vue'
import Sidebar from './sideBar.vue';

export default {
  name: 'Index',
  components: {
    Loader,
    Sidebar,
  },
  data() {
    return {
      userProductDetails: [],
      loading: true,
      message: '',
    }
  },
  mounted() {
    this.getAllProduct();
  },
  methods: {
    getAllProduct() {
      this.loading = true;
      http.get('products')
        .then((response) => {
          this.userProductDetails = response.data.product.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getDeleteProduct(id) {
      if (confirm('Are you sure you want to delete the product')) {
        http.delete(`products/${id}`)
          .then((response) => {
            console.log(response);
            this.getAllProduct();
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    showMessage() {

    }
  }
}
</script>

<style scoped></style>