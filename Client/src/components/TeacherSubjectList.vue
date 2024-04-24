<script setup>

import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import SubjectService from '@/services/SubjectService'
import { useUserStore } from "@/stores/user";

const user = useUserStore(); 
const router = useRouter()
const route = useRoute();
const teachers = ref();
const dialog = ref(false);
const currentTeacher = ref();
const error = ref(null);
const deleteSuccessfully = ref(false)
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

function navigateTo (path) {
  router.push(path);
}

async function getTeachers() {
  try {
    const response = await SubjectService.getTeachers(route.params.id);
    teachers.value = response.data.Teachers
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function removeTeacherConfrimation(teacher) {
  currentTeacher.value = teacher;
  dialog.value = true;
}

async function removeTeacher () {
  try {
    const response = await SubjectService.removeTeacher({
      teacherId: currentTeacher.value.id,
      courseId: route.params.id
    });
    getTeachers();
    dialog.value = false;
    deleteSuccessfully.value = true;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function goBack() {
  router.go(-1);  
}

onMounted(() => {
  getTeachers();
});

</script>

<template>

<div>
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
    <v-card
      class="mx-auto mt-16"
      max-width="1000"
      max-height="100vh"
    >
      <v-toolbar>
        <v-toolbar-title>الأساتذة</v-toolbar-title>
        <div class="d-flex mx-4 my-4">
          <v-btn color="white" class="pink-darken" @click="navigateTo({name: 'subject-teacher', params: {course: route.params.id}})">إضافة أستاذ</v-btn>
          <v-btn color="white" class="mx-4 primary" @click="goBack()">العودة</v-btn>
        </div>
      </v-toolbar>
      <v-table
        fixed-header
        height="100%"
        density="comfortable"
      >
        <thead>
          <tr>
            <th class="text-right">
              إسم الأستاذ
            </th>
            <th class="text-right">
              التخصص
            </th>
            <th class="text-right">
              رقم
            </th>
            <th class="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="teacher in teachers"
            :key="teacher.id"
            style="height: 50px;"
          >
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.specialist }}</td>
            <td>{{ teacher.id }}</td>
            <td>
              <div class="d-flex">
                <div class="mx-auto">
                  <v-icon
                    size="small"
                    color="red"
                    @click="removeTeacherConfrimation(teacher)"
                  >
                    mdi-delete
                  </v-icon>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-alert-circle"
        text="هل تريد إزالة هذا الأستاذ من المادة الحالية؟"
        title="تأكيد"
        color="orange">
        <v-card>
          <template v-slot:actions>
            <v-btn color="white" class="red" @click="removeTeacher()">نعم</v-btn>
            <v-btn color="white" class="primary" @click="dialog = false">العودة</v-btn>
          </template>
        </v-card>
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
    <v-snackbar v-model="deleteSuccessfully" :timeout="2000" color="red">
      <template v-slot:actions />
      تم حذف الأستاذ من المادة
    </v-snackbar>
  </v-locale-provider>
</div>
</template>

<style scoped>
  .error {
    color: red;
  }

  .pink-darken {
    background-color: rgb(194,24,91)
  }

  .primary {
    background-color: RGB(24,103,192);
  }

  .red {
    background-color: #E53935;
  }

.title-text {
  pointer-events: none;
  font-size: 40px;
}

</style>
