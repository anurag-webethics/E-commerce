import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("authToken");
    if (to.matched.some((record) => record.meta.requireAuth)) {
        if (!token) {
            next({ path: "/login" });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
