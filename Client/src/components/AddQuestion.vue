<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute();
const question = ref(null);
const currentQuestion = ref();
const answers = ref([]);
const currentAnswer = ref();
const selectedItems = [];

function addQuestion () {
  question.value = currentQuestion.value;
  console.log(question.value);
}

function addSelected (answer) {
  selectedItems.push(answer);
}

function deleteSelected (answer) {
  var index = selectedItems.indexOf(answer);
  if (index !== -1) {
    selectedItems.splice(index, 1);
  }
}

function addOrDelete (answer) {
    var index = selectedItems.indexOf(answer);
    if (index !== -1) {
      deleteSelected(answer);
    } else {
      addSelected(answer);
    }
    console.log(selectedItems);
}

function addAnswer() {
  if (currentAnswer != '') {
    answers.value.push(currentAnswer.value);
    currentAnswer.value = '';
  }
}

function deleteAnswer(answer) {
  var index = answers.value.indexOf(answer);
  if (index !== -1) {
    deleteSelected(answer);
    answers.value.splice(index, 1);
    currentAnswer.value = '';
  }
  console.log(selectedItems);
}

</script>

<template>
  <v-card
    class="mx-auto"
    max-width="800"
  >
    <v-toolbar color="purple">
      <v-toolbar-title>Add question in {{ route.params.subject }}</v-toolbar-title>
    </v-toolbar>

    <v-list lines="three" select-strategy="classic">
      <v-sheet class="text-h5 mx-4 my-4">
        <div v-if="question !== null">
          {{ question }}
        </div>
        <div v-else>
          <div class="d-flex flex-row">
            <v-textarea label="Question" auto-grow class="my-auto ml-4" v-model="currentQuestion"></v-textarea>
            <v-btn color="success" class="my-auto mx-2" @click="addQuestion()">Add Question</v-btn>
          </div>
        </div>
      </v-sheet> <hr>

      <div v-for="(answer, index) in answers" :key="index" class="d-flex">
        <v-list-item :value="index" @click="addOrDelete(answer)" width="85%">
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn color="success" :model-value="isActive"></v-checkbox-btn> 
            </v-list-item-action>
          </template>
          <div class="d-flex text-h6">
            {{ answer }}
          </div>
        </v-list-item>
        <v-btn color="red" class="my-auto mx-auto" @click="deleteAnswer(answer)">Delete</v-btn>
      </div>
    </v-list>
  
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
