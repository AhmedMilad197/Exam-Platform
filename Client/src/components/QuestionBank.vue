<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useUserStore } from "@/stores/user"
import QuestionService from '@/services/QuestionService'

const router = useRouter()
const route = useRoute();
const user = useUserStore();
const userData = ref();

/*
 * required APIs:
 * api for all the subjects.
 * api for all the questions nested in the subjects.
 */

function navigateTo (path) {
  router.push(path);
}

const questions = ref();

async function getTeacherQuestions() {
  const response = await QuestionService.getTeacherQuestions({
    teacherId: user.user.id
  });
  questions.value = response.data;
}

onMounted(() => {
  getTeacherQuestions();
});

</script>

<template>
  <div>
      <v-card
      class="mx-auto"
      max-width="1000"
      max-height="100vh"
      >
      <v-toolbar color="purple">
        <v-toolbar-title>My Questions</v-toolbar-title>
      </v-toolbar>
      <v-btn color="blue-grey-darken-4" class="mx-4 my-4" @click="navigateTo({ name: 'add-question', params: {subject: route.params.subject} })">ADD QUESTION</v-btn>
      <v-table
        fixed-header
        height="100%"
        density="comfortable"
      >
        <thead>
          <tr>
            <th class="text-left">
              Question
            </th>
            <th class="text-left">
              ID
            </th>
            <th class="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="question in questions"
            :key="question.id"
            style="height: 50px;"
          >
            <td>{{ question.content }}</td>
            <td>{{ question.id }}</td>
            <td>
              <div class="d-flex">
                <div class="mx-auto">
                  <v-btn color="blue" class="mr-4" @click="navigateTo({name: 'edit-question', params: {id: question.id}})">EDIT</v-btn>
                  <v-btn color="red">DELETE</v-btn>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<style scoped>

.list-item {
  transition: 0.5s;
}

.list-item:hover{
  background-color: bisque;
}

</style>
