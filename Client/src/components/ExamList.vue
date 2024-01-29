<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref} from 'vue'

const router = useRouter()
const route = useRoute();

function navigateTo (path) {
  router.push(path);
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
    <v-toolbar-title>Exams List</v-toolbar-title>
  </v-toolbar>
    <div class="d-flex flex-column">
      <div class="mx-4 my-4">
        <v-btn color="primary" @click="navigateTo({name: 'exam-create', params: { subject: route.params.subject }})">CREATE EXAM</v-btn>
        <v-btn color="blue-grey-darken-4" class="ml-4" @click="navigateTo({ name: 'teacher-questions', params: { subject: route.params.subject }})">My Questions</v-btn>
        <v-btn color="pink-darken-2" class="mx-4" @click="navigateTo({ name: 'teacher-student', params: { subject: route.params.subject }})">My Students</v-btn>
      </div><hr>
      <div>
        <v-list>
          <div v-for="exam in exams" :key="exam.id">
            <v-list-item>
              <div class="d-flex">
                {{ exam.exam }}
                <v-spacer></v-spacer>
                <v-btn color="red" class="mx-2">DELETE</v-btn>
              </div>
            </v-list-item>
          </div>
        </v-list>
      </div>
    </div>
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
