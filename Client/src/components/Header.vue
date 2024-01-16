<script setup>
import { useRouter } from 'vue-router'
import {ref} from 'vue'

const router = useRouter()
const color = ref('primary')

function navigateTo (link) {
  console.log(link);
  router.push({
    name: link.name,
    params: link.params
  });
  // router.push({ name: 'questions', params: { subject: 'all' } });
}

const items = ref([
  {
    title: 'Teachers',
    value: {
      name: 'teachers'
    }
  },
  {
    title: 'Students',
    value: {
      name: 'students'
    }
  },
  {
    title: 'Questions',
    value: {
      name: 'questions',
      params: {
        subject: 'all'
      }
    }
  },
  {
    title: 'Subjects',
    value: {
      name: 'subjects'
    }
  }
]);

const drawer = ref(false);
const group = ref(null);

</script>

<template>
  <v-card>
    <v-layout class="mb-15">

      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>
          <span class="title-text">
            Exam Platform
          </span>
        </v-toolbar-title>

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

      <v-list density="compact">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item.value"
          color="primary"
          @click="navigateTo(item.value)"
        >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

      </v-navigation-drawer>

    </v-layout>
  </v-card>

</template>

<style scoped>
.title-text {
  cursor: pointer;
}
</style>
