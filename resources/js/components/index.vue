<template>
  <div>
    <div v-if="loading">
      <Loader />
    </div>
    <div class="d-flex" v-else>
      <div>
        <Sidebar @category-selected="filterProducts" />
      </div>
      <b-container class="bv-example-row">
        <b-button variant="success" class="my-4" @click="getAddproduct">Add Product</b-button>
        <div class="modal-mask" v-if="showModal">
          <AddProductForm @close="closeModal" @data="getAllProduct" :productId="productId" />
        </div>
        <b-row class="w-100">
          <b-col cols="4" v-for="userProductDetail in filteredProducts" :key="userProductDetail.id" class="w-25 my-3">
            <div>
              <div>
                <b-dropdown id="dropdown-left" text="Actions" variant="primary" class="m-2">
                  <b-dropdown-item><router-link
                      :to="`product/view/${userProductDetail.id}`">View</router-link></b-dropdown-item>
                  <div v-if="userId == userProductDetail.user_id">
                    <b-dropdown-item>
                      <b-link @click="getEditProduct(userProductDetail.id)"
                        text="primary">Edit</b-link></b-dropdown-item>
                    <b-dropdown-item><b-link
                        v-on:click="getDeleteProduct(userProductDetail.id)">Delete</b-link></b-dropdown-item>
                  </div>
                </b-dropdown>
              </div>

              <b-card v-bind:title="userProductDetail.title"
                :img-src="userProductDetail.productimages.length > 0 ? userProductDetail.productimages[0].url : ''"
                img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                <!-- :img-src="userProductDetail.productimages.length > 0 ? userProductDetail.productimages[0].url : ''" -->
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
import Modal from './modal.vue';
import AddProductForm from './addProductForm.vue';

export default {
  name: 'Index',
  props: ['homePath'],
  components: {
    Loader,
    Sidebar,
    Modal,
    AddProductForm,
  },
  data() {
    return {
      userProductDetails: [],
      loading: true,
      message: '',
      selectedCategory: '',
      userId: localStorage.getItem('userID'),
      showModal: false,
      productId: null,
      productDetail: null,
    }
  },
  mounted() {
    this.getAllProduct();
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory.id) {
        return this.userProductDetails.filter(product => product.category_id === this.selectedCategory.id);
      }
      else {
        return this.userProductDetails;
      }
    }
  },
  methods: {
    getAllProduct() {
      http.get('view-products')
        .then((response) => {
          this.userProductDetails = response.data.product.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        })
      // this.userProductDetails = this.$store.actions.getProducts;
      // console.log(this.userProductDetails);
    },
    getDeleteProduct(id) {
      this.$swal.fire({
        title: "Are you sure?",
        text: "you want to delete this product",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#36A745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          http.delete(`products/${id}`)
            .then((response) => {
              this.getAllProduct();
            })
            .catch((error) => {
              console.log(error);
            })
          this.$swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          });
        }
      });
    },
    getEditProduct(id) {
      this.productId = id;
      this.showModal = true
    },
    getAddproduct() {
      this.showModal = true;
      this.getEditProduct(null);
    },
    filterProducts(category) {
      this.selectedCategory = category;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  watch: {
    homePath(newValue) {
      this.filterProducts(newValue);
    }
  },
}
</script>

<style scoped></style>