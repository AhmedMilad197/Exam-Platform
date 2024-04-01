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

async function goBack () {
  try {
    router.go(-1);
  } catch (error) {
    return {
      message: error.message
    }
  }
}

</script>

<template>
  <v-locale-provider rtl>

    <v-layout column>
      <v-sheet width="600px" class="mx-auto">
        <v-toolbar>
          <v-toolbar-title>
            عرض السؤال
          </v-toolbar-title>
        </v-toolbar>
        <v-form @submit.prevent class="mt-4">
          <div class="mx-4">
            <span class="text-h5">
              السؤال
            </span>
          </div>
          <v-text-field
            label="السؤال"
            class="ml-2 mr-2 no-select"
            v-model="question"
            hint="نص السؤال"
            persistent-hint
          ></v-text-field>
          <div class="error ml-2" />
          <div class="mx-4">
            <span class="text-h5">
              الإختيارات
            </span>
          </div>
          <v-list class="mx-4">
          <div class="d-flex mx-2 my-2">
            <v-responsive :width="`500px`">
              <v-text-field
                label="الإختيار الأول"
                hint="نص الإختيار الأول"
                persistent-hint
                v-model="answer1"
                class="no-select"
              ></v-text-field>
            </v-responsive>
              <v-checkbox-btn 
              class="mx-4" 
              color="success" 
              :model-value="(rightAnswer == 1 ? true: false)"
              disabled
              />
          </div>
          <div class="d-flex mx-2 my-2">
            <v-responsive :width="`500px`">
              <v-text-field
                label="الإختيار الثاني"
                hint="نص الإختيار الثاني"
                persistent-hint
                v-model="answer2"
                class="no-select"
              ></v-text-field>
            </v-responsive>
              <v-checkbox-btn 
              class="mx-4" 
              color="success" 
              :model-value="(rightAnswer == 2 ? true: false)"
              disabled
              />
          </div>
          <div class="d-flex mx-2 my-2">
            <v-responsive :width="`500px`">
              <v-text-field
                label="الإختيار الثالث"
                hint="نص الإختيار الثالث"
                persistent-hint
                v-model="answer3"
                class="no-select"
              ></v-text-field>
            </v-responsive>
              <v-checkbox-btn 
              class="mx-4" 
              color="success" 
              :model-value="(rightAnswer == 3 ? true: false)"
              disabled
              />
          </div>
          <div class="d-flex mx-2 my-2">
            <v-responsive :width="`500px`">
              <v-text-field
                label="الإختيار الرابع"
                hint="نص الإختيار الرابع"
                persistent-hint
                v-model="answer4"
                class="no-select"
              ></v-text-field>
            </v-responsive>
              <v-checkbox-btn 
              class="mx-4" 
              color="success" 
              :model-value="(rightAnswer == 4 ? true: false)"
              disabled
              />
          </div>
        </v-list>
          <v-col class="text-center" cols="12">
            <v-btn color="primary" @click="goBack()">العودة</v-btn>
          </v-col>
        </v-form>
      </v-sheet>
    </v-layout>
  </v-locale-provider>
  
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

  .no-select {
    pointer-events: none;
  }
</style>
