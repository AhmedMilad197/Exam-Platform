<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useUserStore } from "@/stores/user";
import TeacherService from "@/services/TeacherService"
import ExamService from '@/services/ExamService';

const user = useUserStore();
const router = useRouter()
const route = useRoute();
const exams = ref([]);
const dialog = ref(false);
const snackbar = ref(false);
const deleteSnackbar = ref(false);
const headers = ref([
  { title: 'إسم الإختبار', key: 'name', align: 'start' },
  { title: 'إسم الاستاذ', key: 'Teacher.name' },
  { title: 'درجات الطلبة', key: 'actions' }
]);
const items = ref([
  {
    title: 'المدرسين',
    value: {
      name: 'teachers'
    }
  },
  {
    title: 'الطلبة',
    value: {
      name: 'students'
    }
  },
  {
    title: 'الأسئلة',
    value: {
      name: 'questions',
      params: {
        subject: 'all'
      }
    }
  },
  {
    title: 'المواد',
    value: {
      name: 'subjects'
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

const editedIndex = ref(-1)
const currentExam = ref({
  id: '',
  name: '',
})

function navigateTo(path) {
  router.push(path);
}

async function getExams() {
  try {
    const response = await ExamService.getAllExams(
      {
        courseId: route.params.subject
      }
    );
    exams.value = response.data;
    console.log(exams.value);
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function goTo(item) {
  editedIndex.value = exams.value.indexOf(item)
  currentExam.value = Object.assign({}, item)
  navigateTo({
    name: 'student-exam-marks', params: {
      id: currentExam.value.id,
    }
  })
}

function deleteExam(item) {
  editedIndex.value = exams.value.indexOf(item)
  currentExam.value = Object.assign({}, item)
  dialog.value = true;
}

async function destroy() {
  try {
    const response = await ExamService.delete(currentExam.value.id);
    exams.value.splice(editedIndex.value, 1)
    dialog.value = false;
    snackbar.value = true;
    deleteSnackbar.value = true;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function theExams() {
  if (Object.keys(exams.value).length > 0) {
    return exams.value;
  }
  return [];
}

onMounted(() => {
  getExams();
});

</script>

<template>
  <v-locale-provider rtl>
    <v-layout class="mt-16">
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
    <!-- <div class="mx-auto">
      <img :src="imgUrl" alt="Logo" style="width: 1400px; height: 450px;">
    </div> -->
    <v-card class="mx-auto mt-16" max-width="1000">

      <v-data-table :headers="headers" :items="theExams()">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>كل الإختبارات</v-toolbar-title>
            <v-divider class="mx-4" inset vertical />
            <v-spacer></v-spacer>
            <v-btn class="mb-2 primary" color="white" @click="router.go(-1)">
              العودة
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-5" color="red" size="small" @click="goTo(item)">
            mdi-marker
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-alert-circle" text="هل تريد حذف هذا الإختبار؟" title="تأكيد">
        <template v-slot:actions>
          <v-btn color="red" @click="destroy()">نعم</v-btn>
          <v-btn color="primary" @click="dialog = false">العودة</v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="2000" color="success" variant="outlined">
      <template v-slot:actions />
      تم حذف المادة بنجاح
    </v-snackbar>

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

    <v-snackbar :timeout="2000" color="red" elevation="24" v-model="deleteSnackbar">
      تم حذف الإختبار بنجاح
    </v-snackbar>

  </v-locale-provider>
</template>

<style scoped>
.list-item {
  transition: 0.5s;
}

.list-item:hover {
  background-color: bisque;
}

.purple {
  background-color: RGB(128, 0, 128);
}

.primary {
  background-color: RGB(24, 103, 192);
}

.light-red {
  background-color: rgb(192, 38, 38)
}

.success-green {
  background-color: rgb(24, 103, 24)
}

.title-text {
  cursor: pointer;
  font-size: 40px;
}
</style>
