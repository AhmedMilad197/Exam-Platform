<script setup>
import '@mdi/font/css/materialdesignicons.css'
import pageHeader from './components/Header.vue'
</script>

<template>
  <main style="width: 100%;">
    <!-- <pageHeader class="header"/> -->
    <div class="d-flex">
      <div class="container">
        <RouterView />
      </div>
    </div>
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
