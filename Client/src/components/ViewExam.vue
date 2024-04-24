<script setup>
import ExamService from '@/services/ExamService';
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const route = useRoute();
const router = useRouter();
const name = ref();
const description = ref();
const start_time = ref();
const end_time = ref();
const questions = ref();
const dialog = ref(false);

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

async function getExam() {
  try {
    const response = await ExamService.viewExam({
      examId: route.params.id
    })
    name.value = response.data.name;
    description.value = response.data.description;
    start_time.value = response.data.start_time;
    end_time.value = response.data.end_time;
    questions.value = response.data.questions;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function destroy() {
  try {
    const response = await ExamService.delete(route.params.id)
    dialog.value = false;
    router.go(-1);
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getExam();
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
    <v-card class="mx-auto mt-16" max-width="1000" max-height="100vh">
      <v-toolbar>
        <v-toolbar-title>بيانات الإختبار</v-toolbar-title>
        <v-btn color="white" class="blue" @click="navigateTo({ name: 'student-exam-marks' })">درجات الطلبة</v-btn>
        <v-btn color="white" class="mx-2 primary" @click="router.go(-1)">
              العودة
            </v-btn>
      </v-toolbar>
      <v-table fixed-header height="100%" density="comfortable">
        <thead>
          <tr>
            <th class="text-rigth">
              البيانات
            </th>
            <th class="text-rigth">
              القيمة
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style="height: 50px;">
            <td>
              <b>
                عنوان الإختبار
              </b>
            </td>
            <td>
              {{ name }}
            </td>
          </tr>
          <tr style="height: 50px;">
            <td>
              <b>
                وصف الإختبار
              </b>
            </td>
            <td>
              {{ description }}
            </td>
          </tr>
          <tr style="height: 50px;">
            <td>
              <b>
                وقت البدء
              </b>
            </td>
            <td>
              {{ start_time }}
            </td>
          </tr>
          <tr style="height: 50px;">
            <td>
              <b>
                وقت الإنتهاء
              </b>
            </td>
            <td>
              {{ end_time }}
            </td>
          </tr>
        </tbody>
      </v-table>
      <hr>
      <div>
        <div class="mx-4 my-4">
          <span class="text-h5 mx-4 my-4">
            الأسئلة
          </span>
        </div>
      </div>
      <div>
        <v-table fixed-header height="100%" density="comfortable">
          <thead>
            <tr>
              <th class="text-right">
                السؤال
              </th>
              <th class="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="question in questions" :key="question.id" style="height: 50px;">
              <td>
                {{ question.content }}
              </td>
              <td>
                <div class="d-flex">
                  <div class="mx-auto">
                    <v-btn color="indigo-darken-3"
                      @click="navigateTo({ name: 'view-question', params: { id: question.id, subject: route.params.subject } })">عرض</v-btn>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div class="d-flex">
        <div class="mx-auto">
          <v-btn color="red" class="my-4 mx-2" @click="dialog = true">حذف</v-btn>
          <v-btn color="primary" class="my-4 mx-2" @click="router.go(-1)">العودة</v-btn>
        </div>
      </div>
    </v-card>
    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-alert-circle" text="هل تريد حذف هذا الإختبار؟" title="تأكيد">
        <template v-slot:actions>
          <v-btn color="red" @click="destroy()">نعم</v-btn>
          <v-btn color="primary" @click="dialog = false">العودة</v-btn>
        </template>
      </v-card>
    </v-dialog>
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

.blue {
  background-color: #0091EA
}

.title-text {
  pointer-events: none;
  font-size: 40px;
}

.primary {
  background-color: rgb(24,103,192);
}

</style>
