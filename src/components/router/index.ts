import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

const routes: Array<RouteRecordRaw> = [
    { path: "/", name: "Login", component: Login },
    { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
