import Vuex from "vuex";
import Vue from "vue";
import http from "../axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        getAllProducts: [],
        getCategoryId: null,
        addCategoryName: "",
        is_featured: null,
        getProductData: "",
    },
    mutations: {
        getProducts(state, products) {
            state.getAllProducts = products;
        },
        getProductCategoryId(state, newId) {
            state.getCategoryId = newId;
            console.log(state.getCategoryId);
        },
        addCategory(state, newCategory) {
            state.addCategoryName = newCategory;
            state.addCategoryName = "";
        },
        updateFeaturedImage(state, image) {
            if (state.is_featured == image) {
                state.is_featured = null;
            } else {
                state.is_featured = image;
                state.getProductData.productimages.map((product) => {
                    if (state.is_featured.id == product.id) {
                        product.is_featured = 1;
                    } else {
                        product.is_featured = 0;
                    }
                });
            }
        },
    },
    actions: {
        getProducts() {
            http.get("view-products")
                .then((response) => {
                    this.getAllProducts = response.data.product.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        addCategory({ commit, state }) {
            http.post("categories", { name: state.addCategoryName })
                .then((response) => {
                    commit("addCategory", response.data.data.name);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateFeaturedImage({ commit }, image) {
            commit("updateFeaturedImage", image);
        },
    },
    getters: {},
    modules: {},
});

export default store;
