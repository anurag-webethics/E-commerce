<template>
  <div id="sidebar">
    <h2 class="pt-3 ps-2">Category</h2>
    <div class="py-3">
      <form @submit.prevent="addCategory" class="d-flex justify-content-around">
        <input type="text" name="name" v-model="$store.state.addCategoryName" placeholder="Add Category">
        <div v-if="loading">
          <b-button type="submit" name="submit" variant="success" disabled>Add</b-button>
        </div>
        <div v-else>
          <b-button type="submit" name="submit" variant="success">Add</b-button>
        </div>
      </form>
    </div>
    <div>
      <div v-if="loading" class="text-center">
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div v-else v-for="category in categories" :key="category.id" class="d-flex justify-content-between"
        id="category">
        <span @click="selectCategory(category)">{{ category.name }}</span>
        <!-- <span @click="$store.dispatch('getProducts')">{{ category.name }}</span> -->
        <!-- <span @click="setCategory(category.id)">{{ category.name }}</span> -->
        <span v-on:click="deleteCategory(category.id)" class="text-dark"><b-icon-trash /></span>
      </div>
    </div>
  </div>

</template>

<script>
import http from '../axios';

export default {
  name: 'Sidebar',
  data() {
    return {
      categories: [],
      name: '',
      loading: true,
    }
  },
  mounted() {
    this.getCategories();
  },
  methods: {
   async addCategory() {
    await this.$store.dispatch('addCategory');
      this.loading = true;
      this.getCategories();
      // setTimeout(() => {
      //   this.getCategories();
      // }, 2000)
    },
    getCategories() {
      http.get('view-categories')
        .then((response) => {
          this.loading = false;
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    deleteCategory(id) {
      this.$swal.fire({
        title: "Are you sure?",
        text: "you want to delete this category",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#36A745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          http.delete(`categories/${id}`)
            .then((response) => {
              this.getCategories();
              this.loading = true;
            }).catch((error) => {
              console.log(error);
            })
          this.$swal.fire({
            title: "Deleted!",
            text: "Your category has been deleted.",
            icon: "success"
          });
        }
      });
    },
    selectCategory(category) {
      this.$emit('category-selected', category)
    },
    setCategory(category) {
      return this.$store.commit('getProductCategoryId', category)
    }
  },
}

</script>

<style scoped>
#sidebar {
  width: 300px;
  height: 100%;
  background-color: #E7F8FF;
  box-shadow: 7px -1px 7px 0px #b1bcbdb5;
}

#category {
  width: 100%;
  height: 50px;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 20px;
}

#category:hover {
  background-color: rgba(0, 255, 255, 0.315);
  cursor: pointer;
}
</style>