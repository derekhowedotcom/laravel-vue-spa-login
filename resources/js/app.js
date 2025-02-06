import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './components/App.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Test from "./components/Test.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/test', component: Test },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
