<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from 'vue-router'
import ExamService from "@/services/ExamService"

const route = useRoute();
const router = useRouter();
const user = useUserStore();
const exam = ref([]);
const score = ref();
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

async function getExam() {
  try {
    const response = await ExamService.getExam({
      examId: route.params.id,
      studentId: user.user.id
    })
    let maxScore = 0;
    score.value = 0
    exam.value = response.data
    exam.value.start_time = getDate(exam.value.start_time)[0] + " " + getTime(exam.value.start_time)
    exam.value.end_time = getDate(exam.value.end_time)[0] + " " + getTime(exam.value.end_time)
    exam.value.questions.forEach(question => {
      let studentAnsewer = 0;
      if (question.studentexamhistory[0]) {
        studentAnsewer = question.studentexamhistory[0].student_answer
      }
      if (studentAnsewer == question.rightanswer) {
        score.value += question.mark;
      }
      maxScore += question.mark;
    });
    score.value = parseInt(score.value / maxScore * 100);
  } catch (error) {
    return {
      message: error.message
    }
  }
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
    <v-layout class="mt-10">

      <v-app-bar color="primary" prominent height="100">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>
          <span class="title-text" @click="navigateTo({ name: 'LandingPageView' })">
            Exam Platform
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>

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
    <v-card class="mx-auto mt-15" max-width="800">
      <div class="px-4 py-4" style="background-color: #F5F5DC;">
        ملاحظات
        <ol class="mx-4">
          <li>
            إجابتك تعرض باللون الأزرق.
          </li>
          <li>
            في حال عدم مطابقة إجابتك بالإجابة الصحيحة تعرض الإجابة الصحيحة باللون الأخضر.
          </li>
        </ol>
      </div>

      <div width="100%" class="exam-details d-flex flex-column pb-4">
        <span class="mx-auto my-4">
          <b>
            بيانات الإمتحان
          </b>
        </span>
        <span style="font-size: 20px;" class="mx-auto">
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

      <div class="d-flex flex-column result-content">
        <div class="mx-auto my-2">
          لقد تحصلت على
        </div>
        <div class="mx-auto mb-4">
          <v-progress-circular color="primary" :size="100" :width="15" :model-value="score" class="mb-4">
            <b>
              {{ score }}%
            </b>
          </v-progress-circular>
        </div>
      </div>

      <v-toolbar rtl>
        <v-toolbar-title class="mx-5">اسئلة</v-toolbar-title>
      </v-toolbar>

      <div v-for="(question, index) in exam.questions" :key="question.id">
        <div v-if="question.studentexamhistory[0] != null">
          <v-list lines="three" select-strategy="classic">
            <div class="question-content">
              {{ index + 1 }}. {{ question.content }}
            </div>
            <hr>
            <span style="font-size: 20px; padding: 10px;">
              الإختيارات
            </span>
            <v-list>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`90%`">
                  <v-text-field label="Choice 1" v-model="question.answer1" hint="Insert Choice 1 please."
                    class="no-select" persistent-hint></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4 no-select"
                  :color="(question.rightanswer == 1) ? (question.rightanswer == question.studentexamhistory[0].student_answer) ? 'primary' : 'success' : 'primary'"
                  :model-value="((question.rightanswer == 1 || question.studentexamhistory[0].student_answer == 1) ? true : false)" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`90%`">
                  <v-text-field label="Choice 2" v-model="question.answer2" hint="Insert Choice 2 please."
                    class="no-select" persistent-hint></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4 no-select"
                  :color="(question.rightanswer == 2) ? (question.rightanswer == question.studentexamhistory[0].student_answer) ? 'primary' : 'success' : 'primary'"
                  :model-value="((question.rightanswer == 2 || question.studentexamhistory[0].student_answer == 2) ? true : false)" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`90%`">
                  <v-text-field label="Choice 3" v-model="question.answer3" hint="Insert Choice 3 please."
                    class="no-select" persistent-hint></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4 no-select"
                  :color="(question.rightanswer == 3) ? (question.rightanswer == question.studentexamhistory[0].student_answer) ? 'primary' : 'success' : 'primary'"
                  :model-value="((question.rightanswer == 3 || question.studentexamhistory[0].student_answer == 3) ? true : false)" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`90%`">
                  <v-text-field label="Choice 4" v-model="question.answer4" hint="Insert Choice 4 please."
                    class="no-select" persistent-hint></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4 no-select"
                  :color="(question.rightanswer == 4) ? (question.rightanswer == question.studentexamhistory[0].student_answer) ? 'primary' : 'success' : 'primary'"
                  :model-value="((question.rightanswer == 4 || question.studentexamhistory[0].student_answer == 4) ? true : false)" />
              </div>
            </v-list>
          </v-list>
        </div>
      </div>

      <div class="d-flex flex-row">
        <v-btn color="primary" class="mx-auto my-4" @click="router.go(-1)">العودة</v-btn>
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
.question-content {
  font-size: 25px;
  background-color: #f7f7f7;
  padding: 20px;
}

.no-select {
  pointer-events: none;
}

.title-text {
  cursor: pointer;
  font-size: 40px;
}

.result-content {
  background-color: #E0F2F1;
}

.exam-details {
  background-color: #F0FFFF;
  font-size: 25px;
}

</style>
