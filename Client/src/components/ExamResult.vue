<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ExamStudentService from '@/services/ExamStudentService'
import { useUserStore } from '@/stores/user';

const user = useUserStore();
const router = useRouter();
const route = useRoute();
const drawer = ref(false);
const logoutDialog = ref(false);
const exam = ref({});
const examScore = ref({});

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

async function getExamScore() {
  try {
    const response = await ExamStudentService.getExamScore({
      studentId: user.user.id,
      examId: route.params.id,
    });
    examScore.value = response.data;
    exam.value = response.data.exam;
    exam.value.start_time = getDate(exam.value.start_time)[0] + " " + getTime(exam.value.start_time)
    exam.value.end_time = getDate(exam.value.end_time)[0] + " " + getTime(exam.value.end_time)
  } catch (error) {
    return {
      message: error.message
    }
  }
}

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

function getDate(date) {
  const dateTimeString = date;
  return dateTimeString.split("T");
}

function getTime(date) {
  const dateTimeParts = date.split("T");
  return dateTimeParts[1].slice(0, -5);
}

onMounted(() => {
  getExamScore();
});

</script>

<template>
  <v-locale-provider rtl>
    <v-layout>
      <v-locale-provider rtl>
        <v-app-bar color="primary" prominent height="100">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
          <v-toolbar-title>
            <span class="title-text">
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

    <div class="result-body">
      <div class="mx-auto result-body-content">
        <div style="font-size: 20px;" class="d-flex flex-column">

          <div width="100%" class="exam-details d-flex flex-column">
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
            <div class="mx-auto">
              <v-progress-circular color="primary" :size="100" :width="15" :model-value="examScore.score" class="mb-4">
                <b>
                  {{ examScore.score }}%
                </b>
              </v-progress-circular>
            </div>
          </div>
          <div class="mx-auto my-2">
            <v-btn color="primary" class="mx-4" @click="navigateTo({ name: 'student-subject-list' })">
              العودة
            </v-btn>
            <v-btn color="green" @click="navigateTo({ name: 'student-exam-history', params: { id: examScore.examId } })">
              إجاباتي
            </v-btn>
          </div>
        </div>
      </div>
    </div>

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
  pointer-events: none;
  font-size: 40px;
}

.result-body {
  margin-top: 10%;
  height: 150px;
}

.result-body-content {
  background-color: #E1F5FE;
  width: 50%;
  height: 100%;
}

.result-content {
  background-color: #E0F2F1;
}

.exam-details {
  background-color: #F0FFFF;
  font-size: 25px;
}
</style>
