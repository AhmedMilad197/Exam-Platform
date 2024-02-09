<script setup>
import {ref, onMounted, reactive, computed} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import QuestionService from '@/services/QuestionService'
import { RouterLinkStub } from '@vue/test-utils';

const route = useRoute();
const router = useRouter();
const questionId = ref();
const question = ref();
const answer1 = ref();
const answer2 = ref();
const answer3 = ref();
const answer4 = ref();
const rightAnswer = ref();

function navigateTo (path) {
  router.push(path);
}

async function show (qid) {
  try {

    const response = await QuestionService.show({
      id: qid
    });
    questionId.value = response.data.id;
    question.value = response.data.content;
    answer1.value = response.data.answer1;      
    answer2.value = response.data.answer2;      
    answer3.value = response.data.answer3;      
    answer4.value = response.data.answer4;
    rightAnswer.value = response.data.rightanswer;  
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  show(route.params.id);
});

// modify this function when you connect with the api
function setAnswer (event, id) {
  if (event.target.checked) {
    rightAnswer.value = id;
  }
}

async function update () {
  try {
    const response = await QuestionService.update({
    question_id: route.params.id,
    question_content: {
      content: question.value,
      answer1: answer1.value,
      answer2: answer2.value,
      answer3: answer3.value,
      answer4: answer4.value,
      rightanswer: rightAnswer.value
    }
  });
  router.go(-1);
  } catch (error) {
    return {
      message: error.message
    }
  }
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
              hint="Insert Choice 1 please."
              persistent-hint
              v-model="answer1"
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn 
            class="mx-4" 
            color="success" 
            :model-value="(rightAnswer == 1 ? true: false)"
            @click="setAnswer($event, 1)" 
            />
        </div>
        <div class="d-flex mx-2 my-2">
          <v-responsive :width="`500px`">
            <v-text-field
              label="Choice 2"
              hint="Insert Choice 2 please."
              persistent-hint
              v-model="answer2"
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn 
            class="mx-4" 
            color="success" 
            :model-value="(rightAnswer == 2 ? true: false)"
            @click="setAnswer($event, 2)"
            />
        </div>
        <div class="d-flex mx-2 my-2">
          <v-responsive :width="`500px`">
            <v-text-field
              label="Choice 3"
              hint="Insert Choice 3 please."
              persistent-hint
              v-model="answer3"
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn 
            class="mx-4" 
            color="success" 
            :model-value="(rightAnswer == 3 ? true: false)"
            @click="setAnswer($event, 3)"
            />
        </div>
        <div class="d-flex mx-2 my-2">
          <v-responsive :width="`500px`">
            <v-text-field
              label="Choice 4"
              hint="Insert Choice 4 please."
              persistent-hint
              v-model="answer4"
            ></v-text-field>
          </v-responsive>
            <v-checkbox-btn 
            class="mx-4" 
            color="success" 
            :model-value="(rightAnswer == 4 ? true: false)"
            @click="setAnswer($event, 4)"
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
