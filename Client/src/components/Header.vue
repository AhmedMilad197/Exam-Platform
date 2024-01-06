<script setup>
import { useRouter } from 'vue-router'
import {ref} from 'vue'

const router = useRouter()
const color = ref('primary')

function navigateTo (route) {
  router.push({name: 'welcome'});
}
  
</script>

<template>
  <v-toolbar title="Exam Platform" @click="navigateTo('home')" :color="color">
  </v-toolbar>
</template>

<style scoped>
.v-toolbar-title__placeholder {
  cursor: pointer;
}
</style>
