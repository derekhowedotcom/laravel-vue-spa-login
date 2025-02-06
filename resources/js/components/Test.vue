<template>
    <div v-if="auth.state.value.isAuthenticated ">
        <p>Another view</p>
        <button @click='handleBackClick'>back</button>
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



onMounted(async () => {
    await auth.checkAuth();
    if (!auth.state.value.isAuthenticated) {
        await router.push('/login');
    }
});

const handleBackClick = () => {
     router.back();
};



</script>
