<template>
    <div v-if="auth.state.value.isAuthenticated && !isLoading">
        <h1>Home</h1>
        <p>{{ auth.state.value.isAuthenticated ? 'Logged in' : 'NOT logged in' }}</p>
        <p>{{ auth.state.value.userDetails }}</p>
        <p>{{ UserEmailOnly }}</p>
        <button @click="handleLogout">Logout</button>
        <button @click="handleNav">go to another view</button>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { useAuth } from '../authHelper';
import { useRouter } from "vue-router";
import axios from "axios";

const auth = useAuth();
const router = useRouter();
const isLoading = ref(true);
const UserEmailOnly = ref('');


onMounted(async () => {
    await auth.checkAuth();
    if (!auth.state.value.isAuthenticated) {
        await router.push('/login');
    }
    await getEmailOnly();
});

const handleLogout = async () => {
    await auth.logout();
    await router.push('/login');
};

const handleNav = async () => {
    await router.push('/test');
};


const getEmailOnly = async () => {
    try {
        const userResponse = await axios.get('api/getEmailOnly');
        UserEmailOnly.value = userResponse.data;
    } catch (error) {
        console.error('Error getting email only', error);
        // if we get anything other than a 200 status code, we'll log the error and redirect to the login page
        await router.push('/login');
    } finally {
        isLoading.value = false;
    }
}

</script>
