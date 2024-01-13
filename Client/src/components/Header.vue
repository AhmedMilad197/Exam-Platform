<script setup>
import { useRouter } from 'vue-router'
import {ref} from 'vue'

const router = useRouter()
const color = ref('primary')

const items = ref([
  {
    title: 'Teachers',
    value: 'teachers'
  },
  {
    title: 'Students',
    value: 'teachers'
  },
  {
    title: 'Questions',
    value: 'question'
  }
]);
const drawer = ref(false);
const group = ref(null);

function navigateTo (route) {
  router.push({name: 'welcome'});
}
  
</script>

<template>
  <v-card>
    <v-layout class="mb-15">

      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="title-text">Exam Platform</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-magnify"></v-btn>

        <v-btn variant="text" icon="mdi-filter"></v-btn>

        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="left"
        temporary
      >
        <v-list
          :items="items"
        ></v-list>
      </v-navigation-drawer>

    </v-layout>
  </v-card>

</template>

<style scoped>
.title-text {
  cursor: pointer;
}
</style>
