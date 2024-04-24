<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/stores/user";
import StudentService from "@/services/StudentService";
import imgUrl from '../assets/exams-header.jpg'

const user = useUserStore(); 
const router = useRouter();
const route = useRoute();
const exams = ref();
const enableExams = ref();
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

function handleRequest (title, value) {
  if (title == 'تسجيل الخروج') {
    logoutDialog.value = true;
  } else {
    navigateTo(value)
  }
}

function deleteStoredUser () {
  user.user = null;
  user.token = null;
  user.role = null;
}

async function logout () {
  deleteStoredUser();
  logoutDialog.value = false;
  navigateTo({
    name: 'LandingPageView'
  })
}

function navigateTo (path) {
  router.push(path);
}

function triggerAtBeginningOfNextMinute() {
  const currentTime = new Date();
  const secondsRemaining = 60 - currentTime.getSeconds();
  const millisecondsRemaining = secondsRemaining * 1000;
  
  setTimeout(() => {
    checkTime();
    setInterval(checkTime, 60000); // Trigger every minute thereafter
  }, millisecondsRemaining);
}

function initEnableExams(length) {
  let temp_array = []
  while(length--) temp_array.push(true);
  enableExams.value = temp_array;
}

async function getExams() {
  try {
    const response = await StudentService.getExams({
      studentId: user.user.id,
      courseId: route.params.id
    });
    exams.value = response.data;
    initEnableExams(response.data.length);
    checkTime()
    triggerAtBeginningOfNextMinute()
  } catch (error) {
    return {
      message: error.message
    }
  }
}

const checkTime = () => {
  let currentTime = new Date();
  currentTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
  currentTime = currentTime.toISOString()
  exams.value.forEach(async (exam, index) => {
    const start_time = exam.start_time;
    const end_time = exam.end_time;
    if (currentTime >= start_time && currentTime <= end_time) {
      enableExams.value[index] = false
    } else {
      enableExams.value[index] = true
    }
  });
};

onMounted(() => {
  getExams();
});

</script>

<template>
  <v-locale-provider rtl>
    <v-layout>
    
        <v-app-bar
          color="primary"
          prominent
          height="100"
        >
          <v-app-bar-nav-icon 
            @click.stop="drawer = !drawer"
          />
          <v-toolbar-title>
            <span class="title-text">
              Exam Platform
            </span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="right"
      >
        <v-list density="compact">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item.value"
            style="text-align: right;"
            @click="handleRequest(item.title, item.value)"
          >
            <div v-if="item.title == 'تسجيل الخروج'">
              <v-list-item-title 
                style="color: red;"
                >
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

    <div class="mx-auto">
      <img :src="imgUrl" alt="Logo" style="width: 1400px; height: 450px;">
    </div>

    <v-card
      class="mx-auto"
      max-width="1000"
    >
    <v-toolbar>
      <v-toolbar-title>اختبارات</v-toolbar-title>
      <v-btn color="white" class="primary" @click="router.go(-1)">العودة</v-btn>
    </v-toolbar>

      <v-table
          fixed-header
          height="100%"
          density="comfortable"
        >
        <thead>
          <tr>
            <th class="text-right">
              الإختبارات
            </th>
            <th class="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
              v-for="(exam, index) in exams" :key="index"
              style="height: 50px;"
            >
              <td>{{ exam.name }}</td>
              <td>
                <div class="d-flex">
                  <div class="mx-auto">
                    <div class="d-flex">
                      <div v-if="exam.examstudents.length == 0">
                        <v-btn 
                        color="purple" 
                        class="my-auto mx-4"
                        width="100"
                        @click="navigateTo({name: 'exam', params: { exam: exam.id }})"
                        :disabled="enableExams[index]"
                        >إبدأ الإختبار</v-btn>
                      </div>
                      <div v-else>
                        <v-btn 
                        color="green" 
                        class="my-auto mx-4"
                        width="100"
                        @click="navigateTo({name: 'student-exam-history', params: { id: exam.id }})"
                        >عرض إجاباتي</v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
        </tbody>
      </v-table>

    </v-card>
    <v-dialog v-model="logoutDialog" max-width="500px">
        <v-card 
          prepend-icon="mdi-alert-circle"
          text="هل تريد تسجيل الخروج؟"
          title="تأكيد"
          color="orange"
        >
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

.list-item {
  transition: 0.5s;
}

.list-item:hover{
  background-color: bisque;
}

.primary {
  background-color: RGB(24,103,192);
}

.title-text {
  pointer-events: none;
  font-size: 40px;
}

</style>
