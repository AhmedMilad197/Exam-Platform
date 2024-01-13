<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref} from 'vue'

const router = useRouter()
const route = useRoute();

function navigateTo (id) {
  // router.push({name: 'welcome'});
  router.push(`exam/${id}`);
}
  
const exams = ref([
    {
      id: 1,
      exam: 'This is the first Exam.',
    },
    {
      id: 2,
      exam: 'This is the second Exam.',
    },
    {
      id: 3,
      exam: 'This is the third Exam.'
    }
  ]);

</script>

<template>
  
  <v-card
  class="mx-auto"
  max-width="800"
  >
  <v-toolbar color="purple">
    <v-toolbar-title>exams List</v-toolbar-title>
  </v-toolbar>
    <v-list>
      <div v-for="exam in exams">
        <v-list-item class="list-item" @click="navigateTo(exam.id)">
          {{ exam.exam }}
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>

<style scoped>

.list-item {
  transition: 0.5s;
}

.list-item:hover{
  background-color: bisque;
}

</style>
