<script setup>
import { useRouter } from 'vue-router'
import {ref} from 'vue'

const router = useRouter()

function navigateTo (link) {
  router.push({
    name: link.name,
    params: link.params
  });
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
  },
  {
    title: 'Log Out',
    color: 'red',
    value: {
      name: 'logout'
    }
  }
]);

const drawer = ref(false);

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
          <span class="title-text" @click="navigateTo({ name: 'home' })">
            Exam Platform
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
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
            @click="navigateTo(item.value)"
          >
            <div v-if="item.title == 'Log Out'">
              <v-list-item-title style="color: red;">{{ item.title }}</v-list-item-title>
            </div>
            <div v-else>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </div>
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
