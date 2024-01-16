<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref, watch} from 'vue'
import EditQuestion from '@/components/EditQuestion.vue'

const router = useRouter()
const route = useRoute();

/*
 * required APIs:
 * api for all the subjects.
 * api for all the questions nested in the subjects.
 */ 

function navigateTo (id) {
  // router.push({name: 'welcome'});
  router.push(`question/${id}`);
}

const show = ref(false);

const question = ref();

function showModal (value) {
  show.value = true;
  question.value = value;
}

function closeModal () {
  show.value = false;
}

const questions = ref([
    {
      id: 1,
      question: 'This is the first Question.',
    },
    {
      id: 2,
      question: 'This is the second Question.',
    },
    {
      id: 3,
      question: 'This is the third Question.'
    },
    {
      id: 4,
      question: 'This is the fourth Question.'
    },
    {
      id: 5,
      question: 'This is the fifth Question.'
    },
  ]);
  
  const selectedItem = ref('All Questions');    

  watch(selectedItem, (newX) => {
    console.log(`x is ${newX}`)
  })

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
                  <v-btn color="blue" class="mr-4" @click="showModal(question.question)">EDIT</v-btn>
                  <v-btn color="red">DELETE</v-btn>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <EditQuestion @close="closeModal()" :show="show" :question="question"/>
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
