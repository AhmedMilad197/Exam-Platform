<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from 'vue-router'
import ExamService from "@/services/ExamService"
import ExamStudentService from "@/services/ExamStudentService"
import StudentExamHistoryService from "@/services/StudentExamHistoryService";

const route = useRoute();
const router = useRouter();
const score = ref([]);
const answers = ref();
const maxScore = ref();
const user = useUserStore();
const studentAnswers = ref({});

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
    let temp_mark = 0
    while(length--) {
      temp_mark += response.data.questions[length].mark
      score.value.push(0);
      temp_array.push([0, 0, 0, 0]);
    }
    maxScore.value = temp_mark
    answers.value = temp_array
    console.log(response.data.questions);
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function updateScore(index, question_id, answer, right_answer, mark, event) {
  if (event.target.checked) {
    for (let i = 0; i < 4; i++) {
      answers.value[index][i] = false;
    }
    answers.value[index][answer - 1] = true
    if (answer == right_answer) {
      score.value[index] = mark;
    } else {
      score.value[index] = 0;
    }
    studentAnswers.value[question_id] = answer;
  } else {
    studentAnswers.value[question_id] = -1;
    score.value[index] = 0;
  }
}

async function submit() {
  try {
    let max_score = parseInt(maxScore.value)
    let student_score = 0
    score.value.forEach(element => {
      student_score += parseInt(element)
    });
    let ans = parseInt(student_score / max_score * 100)
    StudentExamHistoryService.create({
      examId: exam.value.id,
      studentId: user.user.id,
      history: studentAnswers.value
    });
    const response = ExamStudentService.create({
      studentId: user.user.id,
      examId: route.params.exam,
      score: ans
    });
    router.go(-1);
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getExam()
});

</script>

<template>
  <v-locale-provider rtl>
    <v-card
    class="mx-auto mt-10"
    max-width="800"
    >

      <v-toolbar rtl>
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
                  @click="updateScore(index, question.id, 1, question.rightanswer, question.mark, $event)"
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
                @click="updateScore(index, question.id, 2, question.rightanswer, question.mark, $event)"
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
                @click="updateScore(index, question.id, 3, question.rightanswer, question.mark, $event)"
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
                @click="updateScore(index, question.id, 4, question.rightanswer, question.mark, $event)"
                v-model="answers[index][3]"
                />
            </div>
          </v-list>
        </v-list>
        <v-btn color="primary" class="mx-5">تخطي</v-btn>
      </div>
    
      <div class="d-flex flex-row">
        <v-btn color="primary" class="mx-auto my-4" @click="submit()">إرسال</v-btn>
      </div>
    
    </v-card>
  </v-locale-provider>
</template>

<style scoped>

</style>
