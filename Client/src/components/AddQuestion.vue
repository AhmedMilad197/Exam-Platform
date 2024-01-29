<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QuestionService from "../services/QuestionService";

const route = useRoute();
const router = useRouter();
const question = ref();
const answers = ref([
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

function setAnswer (event, id) {
  if (event.target.checked) {
    answers.value[id].isAnswer = true;
  } else {
    answers.value[id].isAnswer = false;
  }
}

async function addQuestion() {
  try {
    
    navigateTo({ 
      name: 'teacher-questions',
      params: {
        subject: route.params.subject
      }
    })
  } catch (error) {

  }
}

</script>

<template>
  <v-card
  class="mx-auto"
  max-width="800">
    <v-toolbar color="purple">
      <v-toolbar-title>Add Question</v-toolbar-title>
    </v-toolbar>
    <div class="d-flex flex-column">
      <span class="text-h5 mx-2 my-2">
          Question
      </span>
      <div class="mx-2 my-2">
        <v-text-field
            label="Question"
            v-model="question"
            hint="Insert a question please."
            persistent-hint
          ></v-text-field>
      </div>
      <span class="text-h5 mx-2 mt-2">
          Choices
      </span>
      <v-list>
        <div class="d-flex mx-2 my-2">
          <v-responsive :width="`400px`">
            <v-text-field
              label="Choice 1"
              v-model="answers[0].value"
              hint="Insert Choice 1 please."
              persistent-hint
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn class="mx-4" color="success" @click="setAnswer($event, 0)" />
        </div>
        <div class="d-flex mx-2 my-2">
          <v-responsive :width="`400px`">
            <v-text-field
              label="Choice 2"
              v-model="answers[1].value"
              hint="Insert Choice 2 please."
              persistent-hint
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn class="mx-4" color="success" @click="setAnswer($event, 1)"/>
        </div>
        <div class="d-flex mx-2 my-2">
          <v-responsive :width="`400px`">
            <v-text-field
              label="Choice 3"
              v-model="answers[2].value"
              hint="Insert Choice 3 please."
              persistent-hint
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn class="mx-4" color="success" @click="setAnswer($event, 2)"/>
        </div>
        <div class="d-flex mx-2 my-2">
          <v-responsive :width="`400px`">
            <v-text-field
              label="Choice 4"
              v-model="answers[3].value"
              hint="Insert Choice 4 please."
              persistent-hint
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn class="mx-4" color="success" @click="setAnswer($event, 3)"/>
        </div>
      </v-list>
      <v-btn color="blue" 
        :width="`200px`"
        class="mx-auto mb-4"
        @click="addQuestion()"
        >
        Add Question
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
</style>
