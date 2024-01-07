<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// This will be loaded from the database.
const answers = ref([
  'First Answer',
  'Second Answer',
  'Third Answer',
  'Fourth Answer',
])

const selectedItems = []

function addOrDelete (answer) {
  var index = selectedItems.indexOf(answer);
  if (index !== -1) {
    selectedItems.splice(index, 1);
  } else {
    selectedItems.push(answer);
  }
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
        What is the question here??
      </v-sheet> <hr>
      <div v-for="(answer, index) in answers" :key="index">
        <v-list-item :value="index" @click="addOrDelete(answer)">
          
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn v-model="selectedItems" color="success" :model-value="isActive"></v-checkbox-btn> 
            </v-list-item-action>
          </template>
          
          <v-sheet class="text-h6">
            {{ answer }}
          </v-sheet>
  
        </v-list-item>
      </div>

    </v-list>
    <div class="d-flex flex-row">
      <v-textarea label="Answer" auto-grow class="my-auto ml-4"></v-textarea>
      <v-btn color="success" class="my-auto mx-2">Add Answer</v-btn>
    </div>
    <div class="d-flex flex-row">
      <v-btn color="primary" class="mx-auto my-4">Add Question</v-btn>
    </div>
  </v-card>
</template>

<style scoped>

</style>
