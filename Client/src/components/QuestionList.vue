<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref, onMounted} from 'vue'
import QuestionService from '@/services/QuestionService'

const router = useRouter()
const route = useRoute();
const questions = ref();
const selectedItem = ref('All Questions');    

function navigateTo (path) {
  router.push(path);
}

async function index () {
  try {
    const response = await QuestionService.index();
    questions.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function destroy (question_id) {
  try {
    const response = await QuestionService.delete(question_id);
    index();
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  index();
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
      <v-toolbar-title>Questions List</v-toolbar-title>
      <!-- <div style="width: 200px;" class=" my-auto mr-4">
        <v-combobox
        label="Subject"
        :items="['Math', 'Physics', 'Chemistry', 'Geometry']"
        v-model="selectedItem"
      ></v-combobox>
      </div> -->
    </v-toolbar>
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
                <v-btn color="red" @click="destroy(question.id)">DELETE</v-btn>
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
