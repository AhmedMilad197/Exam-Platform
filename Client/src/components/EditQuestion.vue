<script setup>
import {ref, onMounted, reactive, computed} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import QuestionService from '@/services/Question'

const route = useRoute();
const router = useRouter();
const questionId = ref();
const question = ref();
let answers = ref([
  {
    id: 1,
    value: null,
    isAnswer: false
  },
  {
    id: 2,
    value: null,
    isAnswer: false
  },{
    id: 3,
    value: null,
    isAnswer: false
  },{
    id: 4,
    value: null,
    isAnswer: false
  }
]);

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
      answers.value = response.data.body.answers;
      
    } catch (error) {
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
  });

  // modify this function when you connect with the api
  function setAnswer (event, id) {
    if (event.target.checked) {
      answers.value[id].isAnswer = true;
    } else {
      answers.value[id].isAnswer = false;
    }
    console.log(answers.value);
  }

</script>

<template>
  <v-layout column>
    <v-sheet width="600px" class="mx-auto">
      <v-toolbar color="primary">
        <v-toolbar-title>
          Edit Question
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="mt-4">
        <div class="mx-4">
          <span class="text-h5">
            Question
          </span>
        </div>
        <v-text-field
          label="Question"
          class="ml-2 mr-2"
          v-model="question"
          hint="Edit the question if you want."
          persistent-hint
        ></v-text-field>
        <div class="error ml-2" />
        <div class="mx-4">
          <span class="text-h5">
            Choices
          </span>
        </div>
        <v-list class="mx-4">
        <div class="d-flex mx-2 my-2">
          <v-responsive :width="`500px`">
            <v-text-field
              label="Choice 1"
              v-model="answers[0].value"
              hint="Insert Choice 1 please."
              persistent-hint
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn 
            class="mx-4" 
            color="success" 
            @click="setAnswer($event, 0)" 
            :model-value="answers[0].isAnswer"
            />
        </div>
        <div class="d-flex mx-2 my-2">
          <v-responsive :width="`500px`">
            <v-text-field
              label="Choice 2"
              v-model="answers[1].value"
              hint="Insert Choice 2 please."
              persistent-hint
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn 
            class="mx-4" 
            color="success" 
            @click="setAnswer($event, 1)"
            :model-value="answers[1].isAnswer"
            />
        </div>
        <div class="d-flex mx-2 my-2">
          <v-responsive :width="`500px`">
            <v-text-field
              label="Choice 3"
              v-model="answers[2].value"
              hint="Insert Choice 3 please."
              persistent-hint
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn 
            class="mx-4" 
            color="success" 
            @click="setAnswer($event, 2)"
            :model-value="answers[2].isAnswer"
            />
        </div>
        <div class="d-flex mx-2 my-2">
          <v-responsive :width="`500px`">
            <v-text-field
              label="Choice 4"
              v-model="answers[3].value"
              hint="Insert Choice 4 please."
              persistent-hint
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn 
            class="mx-4" 
            color="success" 
            @click="setAnswer($event, 3)"
            :model-value="answers[3].isAnswer"
            />
        </div>
      </v-list>

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
