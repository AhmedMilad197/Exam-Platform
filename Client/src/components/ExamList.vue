<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref, onMounted} from 'vue'
import { useUserStore } from "@/stores/user";
import TeacherService from "@/services/TeacherService"
import ExamService from '@/services/ExamService';
import imgUrl from '../assets/teachersubjects.jpg'

const user = useUserStore(); 
const router = useRouter()
const route = useRoute();
const exams = ref([]);
const dialog = ref(false);
const snackbar = ref(false);
const headers = ref([
  {title: 'exam', key: 'name', align: 'start'},
  {title: 'id', key: 'id'},
  {title: 'actions', key: 'actions'}
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
      params: { subject: route.params.subject }
    }
  },
  {
    title: 'إختباراتي',
    value: {
      name: 'exam-list',
      params: { subject: route.params.subject }
    }
  },
  {
    title: 'طلابي',
    value: {
      name: 'teacher-student',
      params: { subject: route.params.subject }
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

const editedIndex = ref(-1)
const currentExam = ref({
    id : '',
    name: '',
})

function navigateTo (path) {
  router.push(path);
}

async function getExams() {
  try {
    const response = await TeacherService.getExams({
      teacherId: user.user.id,
      courseId: route.params.subject
    });
    exams.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function goTo(item) {
  editedIndex.value = exams.value.indexOf(item)
  currentExam.value = Object.assign({}, item)
  navigateTo({name: 'view-exam', params: { 
    id: currentExam.value.id,
    subject: route.params.subject
  }})
}

function deleteExam(item) {
  editedIndex.value = exams.value.indexOf(item)
  currentExam.value = Object.assign({}, item)
  dialog.value = true;
}

async function destroy () {
  try {
    const response = await ExamService.delete(currentExam.value.id);
    exams.value.splice(editedIndex.value, 1)
    dialog.value = false;
    snackbar.value = true;
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
        <v-app-bar
          color="primary"
          prominent
          height="100"
        >
          <v-app-bar-nav-icon 
            @click.stop="drawer = !drawer"
          />
          <v-toolbar-title>
            <span class="title-text" @click="navigateTo({ name: 'LandingPageView' })">
              Exam Platform
            </span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
      </v-locale-provider>

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
    <v-card class="mx-auto" max-width="1000">

      <v-data-table
        :headers="headers"
        :items="theExams()"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>اختباراتك</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="600px"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  class="mb-2 purple mr-2"
                  color  = "white"
                  v-bind="props"
                  @click="navigateTo({ name: 'teacher-questions', params: { subject: route.params.subject }})"
                >
                  اسئلتي
                </v-btn>
                <v-btn
                  class="mb-2 success-green mr-2"
                  color  = "white"
                  v-bind="props"
                  @click="navigateTo({name: 'exam-create', params: { subject: route.params.subject }})"
                >
                  اضافة اختبار
                </v-btn>
  
                <v-btn
                  class="mb-2 light-red mr-2"
                  color  = "white"
                  v-bind="props"
                  @click="navigateTo({ name: 'teacher-student', params: { subject: route.params.subject }})"
                >
                  طلابي
                </v-btn>
  
                <v-btn
                  class="mb-2 primary mr-2"
                  color  = "white"
                  @click="router.go(-1)"
                >
                  العودة
                </v-btn>
                
              </template>
              
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            class="me-2"
            size="small"
            @click="goTo(item)"
          >
            mdi-eye-arrow-right
          </v-icon>
          <v-icon
            size="small"
            @click="deleteExam(item)"
            color="red"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-alert-circle"
        text="هل تريد حذف هذا الإختبار؟"
        title="تأكيد">
        <template v-slot:actions>
          <v-btn color="red" @click="destroy()">نعم</v-btn>
          <v-btn color="primary" @click="dialog = false">العودة</v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      color="success"
      variant="outlined"
    >
    <template v-slot:actions />
      تم حذف المادة بنجاح
    </v-snackbar>

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

.purple {
  background-color: RGB(128, 0, 128);
}

.primary {
  background-color: RGB(24,103,192);
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
