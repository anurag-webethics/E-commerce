import registration from "../registration.vue";
import login from "../login.vue";
import Index from "../components/index.vue";
import UserDetail from "../user/userDetail.vue";
import UserDetailEdit from "../user/userDetailEdit.vue";
import AddProduct from "../components/addProductForm.vue";
import ProductView from "../components/productView.vue";
import CartView from "../components/cartView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Index,
    },
    {
        path: "/sign-up",
        name: "registration",
        component: registration,
    },
    {
        path: "/login",
        name: "login",
        component: login,
    },
    {
        path: "/profile/view",
        name: "profile",
        component: UserDetail,
        // meta: { requiresAuth: true },
    },
    {
        path: "/profile/edit",
        name: "profile-edit",
        component: UserDetailEdit,
    },
    {
        path: "/product/add",
        name: "product-add",
        component: AddProduct,
    },
    {
        path: "/product/edit/:id",
        name: "product-edit",
        component: AddProduct,
    },
    {
        path: "/product/view/:id",
        name: "product-view",
        component: ProductView,
    },
    {
        path: "/view/cart",
        name: "cart-view",
        component: CartView,
    },
];

export default routes;
