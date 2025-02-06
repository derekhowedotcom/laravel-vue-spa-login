<template>
    <div v-if="auth.state.value.isAuthenticated">
        <p>Another view</p>
        <button @click='handleBackClick'>back</button>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script setup>
import {onMounted } from 'vue';
import { useAuth } from '../authHelper';
import { useRouter } from "vue-router";

const auth = useAuth();
const router = useRouter();

onMounted(async () => {
    await auth.checkAuth(true);
    if (!auth.state.value.isAuthenticated) {
        await router.push('/login');
    }
});

const handleBackClick = () => {
     router.back();
};
</script>
