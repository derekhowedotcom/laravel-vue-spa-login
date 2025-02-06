<template>
    <router-view></router-view>
</template>

<script setup>
import { provideAuth } from '../authHelper';

provideAuth();
</script>
