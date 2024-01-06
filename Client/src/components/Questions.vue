<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.params.subject);

</script>

<template>
  <v-container>
    {{ props }}
  </v-container>  
</template>

<style scoped>

</style>
