import "./bootstrap";
import Vue from "vue";
import Home from "./home.vue";
import router from "./routes/router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import store from "./store/store";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSweetalert2);

new Vue({
    store,
    render: (h) => h(Home),
    router,
}).$mount("#app");