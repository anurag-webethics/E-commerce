<template>
  <div class="container">
    <div class="row  justify-content-center ">
      <div class="col col-sm-12 col-lg-4 form my-5">
        <Modal>
          <template v-slot:header>
            <div class="d-flex justify-content-between header">
              <h3 class=" fs-2 fw-bold">{{ editProduct == false ? 'Add product' : 'Edit product' }}</h3>
              <button @click="close">
                x
              </button>
            </div>
          </template>
          <template v-slot:body>
            <div v-if="loading">
              <Loader />
            </div>
            <form enctype="multipart/form-data" v-else>
              <div class="d-flex flex-wrap gap-4">
                <div class="">
                  <label for="title" class="form-label pt-4 text-secondary fw-bold fs-6">Title</label>
                  <div class="login-input border d-flex p-2 align-items-center">
                    <input type="text" name="title" class="form-control d-block fs-5 rounded-0 input border border-0"
                      id="title" v-model="addProduct.title" placeholder="Title">
                  </div>
                  <span class="text-danger">
                    {{ responseError.title ? responseError.title[0] : '' }}
                  </span>
                </div>

                <div class="mt-4">
                  <label for="category" class="form-label text-secondary fw-bold fs-6">Category</label>
                  <div class="login-input border d-flex p-2 align-items-center">
                    <select class="form-select border-0 fs-5" aria-label="Default select example" name="category"
                      v-model="addProduct.category_id">
                      <option value="Select your category">Select your category</option>
                      <option :value="category.id" v-for="category in categories" :key="category.id">
                        {{ category.name }}
                      </option>
                    </select>
                  </div>
                  <span class="text-danger">
                    {{ responseError.category_id ? responseError.category_id[0] : '' }}
                  </span>
                </div>

                <div>
                  <label for="price" class="form-label  text-secondary fw-bold fs-6">Price</label>
                  <div class="login-input border d-flex p-2 align-items-center">
                    <input type="number" class="form-control d-block fs-5  rounded-0  input border border-0" id="price"
                      name="price" placeholder="Price" v-model="addProduct.price">
                  </div>
                  <span class="text-danger">
                    {{ responseError.price ? responseError.price[0] : '' }}
                  </span>
                </div>

                <div>
                  <label for="images" class="form-label text-secondary fw-bold fs-6">Images</label>
                  <div class="login-input border d-flex p-2 align-items-center">
                    <input type="file" @change="onImageChange" name="images" multiple>
                  </div>
                  <span class="text-danger">
                    {{ responseError.image ? responseError.image[0] : '' }}
                  </span>
                </div>
                <div v-if="editProduct">
                  <div class="border gap-2 d-flex flex-wrap p-2" style="width: 730px;">
                    <div v-for="(image, index) in productImages" :key="image.id" class="position-relative">
                      <div class="text-center">
                        <div>
                          <span class="fs-1 position-absolute" style="top: -18px;left: 80px;cursor: pointer;"
                            @click="imageDelete(image.image_id)">&#735;</span>
                          <img :src="image.url" alt="" height="70px">
                        </div>
                          <input type="checkbox" name="check-image" id="check-image" :value="image"
                          :checked="image.is_featured == 1" @change="imageId(image)">
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="description" class="form-label text-secondary fw-bold fs-6">Description</label>
                  <div class="d-flex align-items-center">
                    <textarea name="description" v-model="addProduct.description" cols="78" rows="5">
                    </textarea>
                  </div>
                </div>
                <span class="text-danger">
                  {{ responseError.description ? responseError.description[0] : '' }}
                </span>
              </div>
            </form>
          </template>
          <template v-slot:footer>
            <button type="submit" name="submit" @click.prevent="handleSubmit"
              class="btn btn-primary rounded-0 btn-lg login-form-btn rounded-1 fw-bold border-0"
              style="margin-left: 85%;">
              Save
            </button>
          </template>
        </Modal>
      </div>
    </div>
  </div>

</template>

<script>
import http from '../axios';
import Loader from './loader.vue';
import Modal from './modal.vue';

export default {
  name: 'AddProduct',
  props: ['productId'],
  components: {
    Loader,
    Modal,
  },
  data() {
    return {
      addProduct: {
        title: '',
        description: '',
        price: '',
        image: [],
        category_id: '',
        is_featured: '',
      },
      editProduct: false,
      categories: '',
      loading: this.productId ? true : false,
      productImages: [],
      responseError: '',
    }
  },

  mounted() {
    if (this.productId) {
      this.getProductData();
    }
    this.getCategories();
    if (this.productId) {
      this.editProduct = true;
    }
  },

  methods: {
    onImageChange(event) {
      this.addProduct.image = Array.from(event.target.files);
    },
    imageId(image) {
      this.$store.dispatch('updateFeaturedImage', image)
      this.addProduct.is_featured = image.id;
    },
    handleSubmit() {
      if (this.editProduct) {
        http.post(`updateproducts/${this.productId}`, this.$store.state.getProductData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
          .then((response) => {
            if (response.status == 200) {
              console.log(response);
              this.close();
              this.$swal.fire({
                position: "center",
                icon: "success",
                title: "Your product has been edited successfully",
                showConfirmButton: false,
                timer: 2500
              });
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
            if (response.status == 200) {
              this.close();
              this.$swal.fire({
                position: "center",
                icon: "success",
                title: "Your product has been added successfully",
                showConfirmButton: false,
                timer: 2500
              });
            }
          })
          .catch((error) => {
            this.responseError = error.response.data.errors;
            console.log(error);
          })
      }
    },
    getProductData() {
      http.get(`products/${this.productId}`)
        .then((response) => {
          this.addProduct = response.data.product;
          this.$store.state.getProductData = response.data.product;
          this.productImages = response.data.product.productimages;
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
    },
    close() {
      this.$emit('close');
      this.$emit('data', true)
    },
  },
}
</script>

<style scoped></style>