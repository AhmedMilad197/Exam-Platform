<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ExamService from "@/services/ExamService"

const route = useRoute();
const router = useRouter();
const score = ref([]);
const answers = ref()

const exam = ref([]);

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

async function getExam() {
  try {
    const response = await ExamService.getExam({
      examId: route.params.exam
    })
    response.data.questions = shuffle(response.data.questions) 
    exam.value = response.data
    let length = response.data.questions.length;
    let temp_array = []
    while(length--) {
      score.value.push(0);
      temp_array.push([0, 0, 0, 0]);
    }
    answers.value = temp_array
    console.log(response.data.questions)
  } catch (error) {
    console.log(error.message)
    return {
      message: error.message
    }
  }
}

function updateScore(question_id, answer, right_answer, mark) {
  for (let i = 0; i < 4; i++) {
    answers.value[question_id][i] = false;
  }
  answers.value[question_id][answer - 1] = true
  if (answer == right_answer) {
    score.value[question_id] = mark;
  } else {
    score.value[question_id] = 0;
  }
}

onMounted(() => {
  getExam()
});

</script>

<template>
  <v-locale-provider rtl>
    <v-card
      class="mx-auto"
      max-width="800"
    >

      <v-toolbar color="purple" rtl>
            <v-toolbar-title class="mx-5">اسئلة</v-toolbar-title>
      </v-toolbar>

      <div v-for="(question, index) in exam.questions" :key="question.id">

        <v-list lines="three" select-strategy="classic">
          <v-sheet class="text-h5 mx-4 my-4">
            {{ index + 1 }}. {{ question.content }}
          </v-sheet> <hr>
          <span class="text-h5 mx-2 mt-2">
              Choices
          </span>
          <v-list>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`90%`">
                <v-text-field
                  label="Choice 1"
                  v-model="question.answer1"
                  hint="Insert Choice 1 please."
                  persistent-hint
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                  class="mx-4" 
                  color="success" 
                  @click="updateScore(index, 1, question.rightanswer, question.mark)"
                  v-model="answers[index][0]"
                  />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`90%`">
                <v-text-field
                  label="Choice 2"
                  v-model="question.answer2"
                  hint="Insert Choice 2 please."
                  persistent-hint
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4" 
                color="success" 
                @click="updateScore(index, 2, question.rightanswer, question.mark)"
                v-model="answers[index][1]"
                />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`90%`">
                <v-text-field
                  label="Choice 3"
                  v-model="question.answer3"
                  hint="Insert Choice 3 please."
                  persistent-hint
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4" 
                color="success" 
                @click="updateScore(index, 3, question.rightanswer, question.mark)"
                v-model="answers[index][2]"
                />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`90%`">
                <v-text-field
                  label="Choice 4"
                  v-model="question.answer4"
                  hint="Insert Choice 4 please."
                  persistent-hint
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4" 
                color="success"
                @click="updateScore(index, 4, question.rightanswer, question.mark)"
                v-model="answers[index][3]"
                />
            </div>
          </v-list>
        </v-list>
        <v-btn color="primary" class="mx-5">تخطي</v-btn>
      </div>
    
      <div class="d-flex flex-row">
        <v-btn color="primary" class="mx-auto my-4">Submit</v-btn>
      </div>
    
    </v-card>
  </v-locale-provider>
</template>

<style scoped>

</style>
