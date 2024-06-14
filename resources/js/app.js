import "./bootstrap";
import Vue from "vue";
import Home from "./home.vue";
import router from "./routes/router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

new Vue({
    render: (h) => h(Home),
    router,
}).$mount("#app");
