import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Home from "@/vue/Home.vue";
import OptVerification from "@/components/OptVerification.vue";

const routes: Array<RouteRecordRaw> = [
    { path: "/", name: "Login", component: Login },
    { path: "/register", name: "Register", component: Register },
    {
        path: '/home',
        name: 'home',
        component: Home,
        beforeEnter: (to, from, next) => {
            if (canActivate()) {
                next();
            } else {
                next('/');
            }
        },
    },
    {
        path:"/verify-opt", name:"OptVerification", component:OptVerification
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
