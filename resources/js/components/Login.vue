<!-- resources/js/components/Login.vue -->
<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
    try {
        await axios.post('/login', { email: email.value, password: password.value });
        router.push('/');
    } catch (error) {
        console.error('Login failed', error);
    }
};
</script>
