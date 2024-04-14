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
const showQuestion = ref([]);
const isSkipped = ref(false);
const storeAnswers = ref([]);
const error = ref();
const items = ref([
  {
    title: 'المواد الدراسية',
    value: {
      name: 'student-subject-list'
    }
  },
  {
    title: 'تسجيل الخروج',
    color: 'red',
    value: {
      name: 'logout'
    }
  }
]);
const drawer = ref(false);
const logoutDialog = ref(false);

function navigateTo(path) {
  router.push(path);
}

function handleRequest(title, value) {
  if (title == 'تسجيل الخروج') {
    logoutDialog.value = true;
  } else {
    navigateTo(value)
  }
}

function deleteStoredUser() {
  user.user = null;
  user.token = null;
  user.role = null;
}

async function logout() {
  deleteStoredUser();
  logoutDialog.value = false;
  navigateTo({
    name: 'LandingPageView'
  })
}

const exam = ref([]);

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

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
      examId: route.params.exam,
      studentId: user.user.id
    })
    response.data.questions = shuffle(response.data.questions)
    exam.value = response.data
    let length = response.data.questions.length;
    let temp_array = []
    let temp_mark = 0
    while (length--) {
      temp_mark += response.data.questions[length].mark
      score.value.push(-1);
      storeAnswers.value.push(0);
      temp_array.push([0, 0, 0, 0]);
      showQuestion.value.push(1);
    }
    maxScore.value = temp_mark
    answers.value = temp_array
    console.log(response.data);
    exam.value.start_time = getDate(exam.value.start_time)[0] + " " + getTime(exam.value.start_time)
    exam.value.end_time = getDate(exam.value.end_time)[0] + " " + getTime(exam.value.end_time)
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
    score.value[index] = -1;
  }
}

async function submit() {
  try {
    let max_score = parseInt(maxScore.value)
    let student_score = 0
    let skippedQuestionCounter = 0;
    score.value.forEach(element => {
      if (element == -1) {
        skippedQuestionCounter++;
        if (!isSkipped.value || skippedQuestionCounter > 1) {
          error.value = 'يرجى الإجابة على جميع الأسئلة'
          return;
        }
      } else {
        student_score += parseInt(element)
      }
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

function skipQuestion(index) {
  showQuestion.value[index] = 0;
  isSkipped.value = true;
  storeAnswers.value[index] = score.value[index];
  score.value[index] = -1;
}

function unSkipQuestion(index) {
  showQuestion.value[index] = 1;
  isSkipped.value = false;
  score.value[index] = storeAnswers.value[index];
}

function getDate(date) {
  const dateTimeString = date;
  return dateTimeString.split("T");
}

function getTime(date) {
  const dateTimeParts = date.split("T");
  return dateTimeParts[1].slice(0, -5);
}

onMounted(() => {
  getExam()
});

</script>

<template>
  <v-locale-provider rtl>
    <v-layout>
      <v-locale-provider rtl>
        <v-app-bar color="primary" prominent height="100">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
          <v-toolbar-title>
            <span class="title-text" @click="navigateTo({ name: 'LandingPageView' })">
              Exam Platform
            </span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
      </v-locale-provider>

      <v-navigation-drawer v-model="drawer" location="right">
        <v-list density="compact">
          <v-list-item v-for="(item, i) in items" :key="i" :value="item.value" style="text-align: right;"
            @click="handleRequest(item.title, item.value)">
            <div v-if="item.title == 'تسجيل الخروج'">
              <v-list-item-title style="color: red;">
                {{ item.title }}
              </v-list-item-title>
            </div>
            <div v-else>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
    <v-card style="margin-left: auto; margin-right: auto; margin-top: 10%;" max-width="800">
      <div width="100%" class="exam-details d-flex flex-column">
        <span class="mx-auto">
          بيانات الإمتحان
        </span><br>
        <span style="font-size: 20px;">
          <div class="d-flex">
            <div class="mx-4">
              العنوان : <br>
              الوصف : <br>
              موعد البدأ : <br>
              موعد الإنتهاء : <br>
            </div>
            <div>
              {{ exam.name }} <br>
              {{ exam.description }} <br>
              {{ exam.start_time }} <br>
              {{ exam.end_time }} <br>
            </div>
          </div>

        </span>
      </div>
      <v-toolbar rtl>
        <v-toolbar-title class="mx-5">اسئلة</v-toolbar-title>
      </v-toolbar>

      <div v-for="(question, index) in exam.questions" :key="index">
        <div v-if="showQuestion[index] == 1">
          <v-list lines="three" select-strategy="classic">
            <v-sheet class="question-content">
              {{ index + 1 }}. {{ question.content }}
            </v-sheet>
            <hr>
            <span style="font-size: 20px; padding: 10px;">
              الإختيارات
            </span>
            <v-list>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`90%`">
                  <v-text-field label="الإختيار الأول" v-model="question.answer1" persistent-hint class="disabled-field"
                    readonly />
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success"
                  @click="updateScore(index, question.id, 1, question.rightanswer, question.mark, $event)"
                  v-model="answers[index][0]" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`90%`">
                  <v-text-field label="الإختيار الثاني" v-model="question.answer2" persistent-hint
                    class="disabled-field" />
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success"
                  @click="updateScore(index, question.id, 2, question.rightanswer, question.mark, $event)"
                  v-model="answers[index][1]" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`90%`">
                  <v-text-field label="الإختيار الثالث" v-model="question.answer3" persistent-hint
                    class="disabled-field" />
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success"
                  @click="updateScore(index, question.id, 3, question.rightanswer, question.mark, $event)"
                  v-model="answers[index][2]" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`90%`">
                  <v-text-field label="الإختيار الرابع" v-model="question.answer4" persistent-hint
                    class="disabled-field" />
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success"
                  @click="updateScore(index, question.id, 4, question.rightanswer, question.mark, $event)"
                  v-model="answers[index][3]" />
              </div>
            </v-list>
          </v-list>
          <v-btn color="primary" class="mx-5" :disabled="isSkipped" @click="skipQuestion(index)">تخطي</v-btn>
        </div>
        <div v-else class="d-flex py-10 my-4 skip-question-body">
          <div class="mx-auto">
            <v-btn color="orange-darken-2" @click="unSkipQuestion(index)">
              عدم التخطي
            </v-btn>
          </div>
        </div>
      </div>

      <div class="d-flex">
        <div class="mx-auto">
          <span class="error">
            {{ error }}
          </span>
        </div>
      </div>

      <div class="d-flex flex-row">
        <v-btn color="primary" class="mx-auto my-4" @click="submit()">إرسال</v-btn>
      </div>

    </v-card>
    <v-dialog v-model="logoutDialog" max-width="500px">
      <v-card prepend-icon="mdi-alert-circle" text="هل تريد تسجيل الخروج؟" title="تأكيد" color="orange">
        <v-card>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" class="mx-2 my-4" @click="logout()">نعم</v-btn>
          <v-btn color="blue-darken-1" @click="logoutDialog = false">إلغاء</v-btn>
          <v-spacer></v-spacer>
        </v-card>
      </v-card>
    </v-dialog>
  </v-locale-provider>
</template>

<style scoped>
.title-text {
  cursor: pointer;
  font-size: 40px;
}

.disabled-field {
  pointer-events: none;
  /* Disable pointer events */
  background-color: #f0f0f0;
  /* Set a light background color */
}

.disabled-field>>>.v-input__details {
  display: none;
}

.question-content {
  font-size: 25px;
  background-color: #f7f7f7;
  padding: 20px;
}

.exam-details {
  background-color: #F0FFFF;
  font-size: 25px;
}

.skip-question-body {
  background-color: #E0E0E0;
}

.error {
  color: red;
}
</style>
