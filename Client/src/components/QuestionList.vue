<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref, watch, onMounted} from 'vue'
import QuestionService from '@/services/Question'

const router = useRouter()
const route = useRoute();

/*
 * required APIs:
 * api for all the subjects.
 * api for all the questions nested in the subjects.
 */

function navigateTo (path) {
  router.push(path);
}

const show = ref(false);

const questionId = ref();
const question = ref();

function showModal () {
  show.value = true;
}

function closeModal () {
  show.value = false;
}

const questions = ref();

async function index () {
    try {

      const response = await QuestionService.index();
      console.log(response.data)
      questions.value = response.data;
      
    } catch (error) {
      console.log(error.message);
      return {
        message: error.message
      }
    }
  }

onMounted(() => {
  index();
});
  
const selectedItem = ref('All Questions');    

  // watch(selectedItem, (newX) => {
  //   console.log(`x is ${newX}`)
  // })

</script>

<template>
  <div>
      <!-- {{ selectedItem }} -->
      <v-card
      class="mx-auto"
      max-width="1000"
      max-height="100vh"
      >
      <v-toolbar color="purple">
        <v-toolbar-title>Questions List</v-toolbar-title>
        <div style="width: 200px;" class=" my-auto mr-4">
          <v-combobox
          label="Subject"
          :items="['Math', 'Physics', 'Chemistry', 'Geometry']"
          v-model="selectedItem"
        ></v-combobox>
        </div>
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
            <td>{{ question.question }}</td>
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
