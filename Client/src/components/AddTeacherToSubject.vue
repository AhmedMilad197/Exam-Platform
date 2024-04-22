<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TeacherService from '@/services/TeacherService'
import SubjectService from '@/services/SubjectService'
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const router = useRouter();
const route = useRoute();
const teachers = ref();
const teacherDetailsDialog = ref(false);
const currentTeacher = ref({
  id: 0,
  name: '',
  username: '',
  email: '',
  lastlogin: '',
})
const selectedItems = [];
const teacherIndex = ref(-1)
const addSuccessfully = ref(false)
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

function close () {
  teacherDetailsDialog.value = false;
}

function navigateTo (route) {
  router.push(route);
}

async function index() {
  try {
    const response = await TeacherService.availableTeachers({
      courseId: route.params.course
    }).then(response => {
      teachers.value = response.data;
    })
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function updateSelectedItems(event, id) {
  if (event.target.checked) {
    selectedItems.push(id);
  } else {
    var index = selectedItems.indexOf(id);
    if (index !== -1) {
      selectedItems.splice(index, 1);
    }
  }
}

async function addTeacher() {
  try {
    SubjectService.addTeachers({
      courseId: route.params.course,
      teachers: selectedItems
    })
      .then(response => {
        index();
        console.log(teachers.value)
        addSuccessfully.value = true;
      })
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function teacherDetails(teacher) {
  currentTeacher.value = teacher;
  teacherDetailsDialog.value = true
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

    <div>
      <v-card
        class="mx-auto mt-16"
        max-width="1000"
        max-height="100vh"
        >
        <v-toolbar>
          <v-toolbar-title>قائمة الأساتذة</v-toolbar-title>
          <div class="d-flex">
            <v-spacer/>
            <v-btn color="white" class="my-4 success-green" @click="addTeacher()">إضافة أستاذ</v-btn>
            <v-btn color="white" class="my-4 mx-4 primary" @click="router.go(-1)">العودة</v-btn>
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
                الأستاذ
              </th>
              <th class="text-right">
                ID
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
            >
              <td>
                <v-checkbox class="custom-checkbox custom-height custom-opacity" :label=teacher.name @click="updateSelectedItems($event, teacher.id)" />
              </td>
              <td>{{ teacher.id }}</td>
              <td>
                <div class="d-flex">
                  <div class="mx-auto">
                    <v-icon
                      class="me-2"
                      size="small"
                      color="blue"
                      @click="teacherDetails(teacher)"
                    >
                      mdi-eye
                    </v-icon>
                    <!-- <v-btn color="yellow" class="mr-4" @click="navigateTo({name: 'teacher', params: {id: teacher.id}})">VIEW</v-btn> -->
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <v-dialog v-model="teacherDetailsDialog" max-width="600px">
            <v-card>
              <v-card-title>
                <span class="form-title-text"> بيانات الأستاذ </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field v-model="currentTeacher.name" class="no-select" label="إسم المدرس"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field v-model="currentTeacher.username" class="no-select" label="username"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field v-model="currentTeacher.password" class="no-select" label="الرمز السري"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field v-model="currentTeacher.lastlogin" class="no-select" label="اخر ضهور"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card>
                <div class="d-flex">
                  <v-btn color="primary" @click="close" class="mx-auto my-4">
                    العودة
                  </v-btn>
                </div>
              </v-card>
            </v-card>
          </v-dialog>

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
    <v-snackbar v-model="addSuccessfully" :timeout="2000" color="green">
      <template v-slot:actions />
      تم إضافة الأستاذ إلى المادة بنجاح
    </v-snackbar>
  </v-locale-provider>

</template>

<style scoped>
.primary {
  background-color: RGB(24,103,192);
}

.success-green {
  background-color: rgb(24, 103, 24)
}

.no-select {
  pointer-events: none;
}

.custom-checkbox /deep/ .v-input__details {
  display: none;
}

.custom-height /deep/ .v-selection-control {
  min-height: 0 !important;
}

.custom-opacity /deep/ .v-label {
  opacity: 1;
}

.title-text {
  cursor: pointer;
  font-size: 40px;
}

.form-title-text {
  font-size: 20px;
}

</style>