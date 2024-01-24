<script setup>
import '@mdi/font/css/materialdesignicons.css'
import { RouterLink, RouterView } from 'vue-router'
import pageHeader from './components/Header.vue'
</script>

<template>
  <main class="container">
    <pageHeader class="header"/>
    <v-container class="container">
      <RouterView />
    </v-container>
  </main>
</template>

<style scoped>
  .container{
    width: 100%;
    z-index: 99;
  }

  .header {
    z-index: 999;
  }
  
</style>
