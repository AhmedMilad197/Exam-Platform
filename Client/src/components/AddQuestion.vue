<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QuestionService from "../services/QuestionService";
import { useUserStore } from "@/stores/user"

const user = useUserStore();
const route = useRoute();
const router = useRouter();
const question = ref();
const showChoices = ref(false)
const buttonMessage = ref('اظافة اختيارات')
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

let answerId = 0;

function setAnswer (event, id) {
  if (event.target.checked) {
    answerId = id + 1;
    answers.value[id].isAnswer = true;
  } else {
    answers.value[id].isAnswer = false;
  }
}

async function addQuestion() {
  try {
    await QuestionService.create({
      courseid: route.params.subject,
      teacherid: user.user.id,
      content: question.value,
      answer1: answers.value[0].value,
      answer2: answers.value[1].value,
      answer3: answers.value[2].value,
      answer4: answers.value[3].value,
      rightanswer: answerId,
      mark: 22
    });
    router.go(-1);
  } catch (error) {
    return error.message;
  }
}

function toggle() {
  if (showChoices.value) {
    showChoices.value = false;
    buttonMessage.value = 'اظافة اختيارات';
  } else {
    buttonMessage.value = 'اخفاء الاختيارات';
    showChoices.value = true;
  }
  console.log(showChoices.value)
}

function goBack() {
  router.go(-1);  
}

</script>

<template>
  <v-locale-provider rtl>
    <v-card
    class="mx-auto"
    max-width="800">
      <v-toolbar color="purple">
        <v-toolbar-title>Add Question</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex flex-column">
        <div class="d-flex">
          <span class="text-h5 mx-4 my-4">
            Question
          </span>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mx-4 my-4" @click="goBack()">GO BACK</v-btn>
        </div>
        <div class="mx-2 my-2">
          <v-text-field
              label="Question"
              v-model="question"
              hint="Insert a question please."
              persistent-hint
            ></v-text-field>
        </div>
        <div class="mx-2">
          <v-btn color="primary" @click="toggle()">{{ buttonMessage }}</v-btn>
        </div>
        <div v-if="showChoices">
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
        </div>
        <v-btn color="blue" 
          :width="`200px`"
          class="mx-auto mb-4"
          @click="addQuestion()"
          >
          Add Question
        </v-btn>
      </div>
    </v-card>
  </v-locale-provider>
</template>

<style scoped>
</style>
