<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div class="container" v-else>

    <div class="row  justify-content-center ">

      <div class="col col-sm-12 col-lg-4 form my-5">

        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">

          <h3 class=" fs-2 fw-bold">Add product form</h3>

          <div>
            <label for="userName" class="form-label pt-4 text-secondary fw-bold fs-6">Title</label>
            <div class="login-input border d-flex p-2 align-items-center">
              <input type="text" name="userName" class="form-control d-block fs-5  rounded-0  input border border-0"
                id="userName" v-model="addProduct.title" placeholder="Title">
            </div>
          </div>

          <div class="mb-3">
            <label for="fname" class="form-label pt-4 text-secondary fw-bold fs-6">Description</label>
            <div class="d-flex p-2 align-items-center">
              <textarea name="" v-model="addProduct.description" id="" cols="35" rows="5"></textarea>
            </div>
          </div>

          <div class="mb-3">
            <label for="lname" class="form-label  text-secondary fw-bold fs-6">Price</label>

            <div class="login-input border d-flex p-2 align-items-center">
              <input type="number" class="form-control d-block fs-5  rounded-0  input border border-0" id="lastName"
                name="lname" placeholder="Price" v-model="addProduct.price">
            </div>
          </div>

          <div class="mb-3">
            <label for="images" class="form-label text-secondary fw-bold fs-6">Images</label>
            <div class="login-input border d-flex p-2 align-items-center">
              <input type="file" @change="onImageChange" multiple>
            </div>
          </div>

          <div v-if="editProduct">
            <div class="mb-3 border gap-2 d-flex flex-wrap p-2" style="width: 355px;">
              <div v-for="(image, index) in productImages" :key="image.id" class="position-relative">
                <div class="text-center">
                  <div>
                    <span class="fs-1 position-absolute" style="top: -18px;left: 80px;cursor: pointer;"
                      @click="imageDelete(image.image_id)">&#735;</span>
                    <img :src="image.url" alt="" height="70px">
                  </div>
                  <input type="checkbox" v-model="addProduct.featured_image">
                </div>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="country" class="form-label  text-secondary fw-bold fs-6">Category</label>
            <div class="login-input border d-flex p-2 align-items-center">
              <select class="form-select border-0 fs-5" aria-label="Default select example" name="country"
                v-model="addProduct.category_id">
                <option value="Select your category">Select your category</option>
                <option :value="category.id" v-for="category in categories" :key="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <button type="submit" name="submit"
            class="btn btn-primary rounded-0 btn-lg login-form-btn rounded-1 form-btn fw-bold border-0">
            {{ editProduct ? 'Update form' : 'Submit' }}
          </button>
        </form>

      </div>

    </div>

  </div>

</template>

<script>
import http from '../axios';
import Loader from './loader.vue';

export default {
  name: 'AddProduct',
  components: {
    Loader,
  },
  data() {
    return {
      addProduct: {
        title: '',
        description: '',
        price: '',
        image: [],
        category_id: '',
        successMessage: '',
        featured_image: '',
      },
      editProduct: false,
      categories: '',
      loading: this.$route.params.id ? true : false,
      productImages: '',
    }
  },

  mounted() {
    if (this.$route.params.id) {
      this.getProductData();
    }
    this.getCategories();
    if (this.$route.params.id) {
      this.editProduct = true;
    }
  },

  methods: {
    onImageChange(event) {
      this.addProduct.image = Array.from(event.target.files);
    },
    handleSubmit() {
      if (this.editProduct) {
        http.post(`updateproducts/${this.$route.params.id}`, this.addProduct, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              // this.$router.push({ path: '/', query: { msg: 'Your product is edit successfully' } })
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }
      else {
        http.post('products', this.addProduct, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
          .then((response) => {
            this.$router.push('/')
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    getProductData() {
      http.get(`products/${this.$route.params.id}`)
        .then((response) => {
          this.addProduct = response.data.product;
          this.productImages = response.data.product.productimages;
          this.featuredImage = response.data.product.featured_image;
          this.loading = false
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getCategories() {
      http.get('categories')
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    imageDelete(id) {
      if (confirm('Are you sure to delete the image')) {
        http.delete(`deleteimage/${id}`)
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  }
}
</script>

<style scoped></style>