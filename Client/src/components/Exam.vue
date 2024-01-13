<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();

const exam = ref([
  {
    id: 1,
    question: 'This is the first question.',
    answers: [
      {
        id: 1,
        answer: 'This is the first answer to the first question.'
      },
      {
        id: 2,
        answer: 'This is the second answer to the first question.'
      },
      {
        id: 3,
        answer: 'This is the third answer to the first question.'
      },
      {
        id: 4,
        answer: 'This is the fourth answer to the first question.'
      },
    ]
  },
  {
    id: 2,
    question: 'This is the second question.',
    answers: [
      {
        id: 1,
        answer: 'This is the first answer to the second question.'
      },
      {
        id: 2,
        answer: 'This is the second answer to the second question.'
      },
      {
        id: 3,
        answer: 'This is the third answer to the second question.'
      },
      {
        id: 4,
        answer: 'This is the fourth answer to the second question.'
      },
    ]
  }
]);

</script>

<template>
  <v-card
    class="mx-auto"
    max-width="800"
  >
    <v-toolbar color="purple">
      <v-toolbar-title>Add question in {{ route.params.subject }}</v-toolbar-title>
    </v-toolbar>

    <div v-for="(question, index) in exam">

      <v-list lines="three" select-strategy="classic">
        <v-sheet class="text-h5 mx-4 my-4">
          <b>#{{ index + 1 }}:</b> {{ question.question }}
        </v-sheet> <hr>
  
        <div v-for="(answer, index) in question.answers" :key="index" class="d-flex">
          <v-list-item :value="index" width="100%">
            <template v-slot:prepend="{ isActive }">
              <v-list-item-action start>
                <v-checkbox-btn color="success" :model-value="isActive"></v-checkbox-btn> 
              </v-list-item-action>
            </template>
            <div class="d-flex text-h6">
              {{ answer.answer }}
            </div>
          </v-list-item>
        </div>
      </v-list>

    </div>

  
    <div v-if="question">
      <div class="d-flex flex-row">
        <v-textarea label="Answer" auto-grow class="my-auto ml-4" v-model="currentAnswer"></v-textarea>
        <v-btn color="success" class="my-auto mx-2" @click="addAnswer()">Add Answer</v-btn>
      </div>
    </div>

    <div class="d-flex flex-row">
      <v-btn color="primary" class="mx-auto my-4">Add Question</v-btn>
    </div>
  
  </v-card>
</template>

<style scoped>

</style>
