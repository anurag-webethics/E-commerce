<template>

  <div id="sidebar">
    <h2 class="pt-3 ps-2">Category</h2>
    <div class="py-3">
      <form @submit.prevent="addCategory" class="d-flex justify-content-around">
        <input type="text" name="name" v-model="name" placeholder="Add Category">
        <b-button type="submit" name="submit" variant="success">Add</b-button>
      </form>
    </div>
    <div v-if="loading" class="text-center">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <div v-for="category in categories" :key="categories.id" class="d-flex justify-content-between" id="category">
      {{ category.name }}
      <span v-on:click="deleteCategory(category.id)">&#10060</span>
    </div>
  </div>

</template>


<script>
import http from '../axios';

export default {
  name: 'Sidebar',
  data() {
    return {
      categories: '',
      name: '',
      loading: true,
    }
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      http.get('categories')
        .then((response) => {
          this.categories = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    addCategory() {
      http.post('categories', { name: this.name })
        .then((response) => {
          this.getCategories();
        })
        .catch((error) => {
          console.log(error);
        })
    },
    deleteCategory(id) {
      if (confirm('Are you sure delete the category')) {
        http.delete(`categories/${id}`)
          .then((response) => {
            this.getCategories();
            console.log(response);
          }).catch((error) => {
            console.log(error);
          })
      }
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