<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Toast from './components/templates/Toast.vue'
</script>

<template>
  <Toast />
  <Header />
  <RouterView />
</template>
