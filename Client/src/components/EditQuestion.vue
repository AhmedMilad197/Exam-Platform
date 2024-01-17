<script setup>
import {ref, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import QuestionService from '@/services/Question'

const route = useRoute();
const router = useRouter();
const questionId = ref();
const question = ref();

function navigateTo (path) {
  router.push(path);
}

async function show (qid) {
    try {
      const response = await QuestionService.show({
        id: qid
      });
      questionId.value = response.data.body.id;
      question.value = response.data.body.question;
    } catch (error) {
      console.log(error.message);
      return {
        message: error.message
      }
    }
  }

  function update () {

    navigateTo({
      name: 'questions',
      params: {subject: 'all'}
    });
  }

  onMounted(() => {
    show(route.params.id);
  })

</script>

<template>
  <!-- <h1>Edit Question, question id is {{ route.params.id }}</h1> -->
  <v-layout column>
    <v-sheet width="600px" class="mx-auto">
      <v-toolbar color="primary">
        <v-toolbar-title>
          Edit Question
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="justify-center mt-4 slot-text-center">
        <v-text-field
          label="Question"
          class="ml-2 mr-2"
          v-model="question"
        ></v-text-field>
        <div class="error ml-2" />
        <v-col class="text-center" cols="12">
          <v-btn color="primary" @click="update()">UPDATE</v-btn>
        </v-col>
      </v-form>
    </v-sheet>
  </v-layout>
  
</template>

<style scoped>
  .error {
    color: red;
  }

  .v-sheet {
    border: 1px rgb(185, 175, 175) solid;
    border-radius: 2px;
  }

  .slot-text-center {
    text-align: center;
  }
</style>
