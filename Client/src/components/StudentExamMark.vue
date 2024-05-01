<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ExamStudentService from '@/services/ExamStudentService'
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const router = useRouter();
const route = useRoute();
const studentExams = ref([]);
const addSuccessfully = ref(false);
const search = ref();
const headers = ref([
  { title: 'رقم القيد', key: 'student.id', align: 'start' },
  { title: 'السم الطالب', key: 'student.name' },
  { title: 'الدرجة', key: 'score' },
]);

const items = ref([
  {
    title: 'موادي',
    value: {
      name: 'home'
    }
  },
  {
    title: 'أسئلتي',
    value: {
      name: 'teacher-questions',
      params: { subject: route.params.id }
    }
  },
  {
    title: 'إختباراتي',
    value: {
      name: 'exam-list',
      params: { subject: route.params.id }
    }
  },
  {
    title: 'طلابي',
    value: {
      name: 'teacher-student',
      params: { subject: route.params.id }
    }
  },
  {
    title: 'تسجيل الخروج',
    color: 'red',
    value: {
      name: 'student-login'
    }
  }
]);
const drawer = ref(false);
const logoutDialog = ref(false);

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

function navigateTo(path) {
  router.push(path);
}

async function index() {
  try {
    const response = await ExamStudentService.getStudents(route.params.id);
    studentExams.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function storeToExcel() {
  try {
    const response = await ExamStudentService.storeToExcel(route.params.id);
    addSuccessfully.value = true;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  index();
});

</script>

<template>
  <v-locale-provider rtl>
    <v-layout class="mt-16">
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
    <v-card class="mx-auto mt-16" max-width="1000" label="البحث">
      <template v-slot:text>
        <v-text-field v-model="search" label="إبحث عن درجة الطالب" hide-details />
      </template>
      <v-data-table :headers="headers" :items="studentExams" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>درجات الطلبة</v-toolbar-title>
            <v-divider class="mx-4" inset vertical />
            <v-spacer></v-spacer>
            <v-btn color="white" class="success-green" @click="storeToExcel()">طباعة إلى excel</v-btn>
            <v-btn class="primary mx-2" color="white" @click="router.go(-1)">
              العودة
            </v-btn>
          </v-toolbar>
        </template>
      </v-data-table>
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
    <v-snackbar v-model="addSuccessfully" :timeout="2000" color="green">
      <template v-slot:actions />
      تم تحميل درجات الطلبة بنجاح
    </v-snackbar>
  </v-locale-provider>

</template>

<style scoped>
.no-select {
  pointer-events: none;
}

.success-green {
  background-color: rgb(24, 103, 24)
}

.title-text {
  pointer-events: none;
  font-size: 40px;
}

.primary {
  background-color: rgb(24, 103, 192);
}
</style>