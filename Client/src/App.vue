<script setup>
import { RouterLink, RouterView } from 'vue-router'
import pageHeader from './components/Header.vue'
</script>

<template>
  <main class="container">
    <pageHeader />
    <v-container>
      <RouterView />
    </v-container>
  </main>
</template>

<style scoped>
  .container{
  width: 100%;
}
</style>
