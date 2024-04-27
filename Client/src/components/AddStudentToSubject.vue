<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'
import StudyService from '@/services/StudyService'
import { useUserStore } from "@/stores/user";

const user = useUserStore(); 
const router = useRouter()
const route = useRoute();
const students = ref();

/*
 * required APIs:
 * api for all the subjects.
 * api for all the questions nested in the subjects.
 */

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

function navigateTo (path) {
  router.push(path);
}

async function index () {
  try {
    const response = await StudentService.availableStudents(route.params.subject);
    students.value = response.data;
    console.log(response.data)
  } catch (error) {
    return {
      message: error.message
    }
  }
}

const selectedStudents = [];

function updateSelectedItems(event, id) {
  if (event.target.checked) {
    selectedStudents.push(id);
  } else {
    var index = selectedStudents.indexOf(id);
    if (index !== -1) {
      selectedStudents.splice(index, 1);
    }
  }
}

async function addStudent() {
  try {
    const response = await StudyService.create({
      teacherId: user.user.id,
      courseId: route.params.subject,
      students: selectedStudents
    });
    router.go(-1);
  } catch (error) {

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

    <div>
        <v-card
        class="mx-auto mt-10"
        max-width="1000"
        >
        <v-toolbar>
          <v-toolbar-title>الطلبة</v-toolbar-title>
          <div class="d-flex">
            <v-btn color="white" class="mx-4 my-4 success-green" @click="addStudent()">إضافة</v-btn>
            <v-btn color="white" class="ml-4 my-4 primary" @click="router.go(-1)">العودة</v-btn>
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
                إسم الطالب
              </th>
              <th class="text-right">
                إسم الأب
              </th>
              <th class="text-right">
                إسم الجد
              </th>
              <th class="text-right">
                اللقب
              </th>
              <th class="text-right">
                إسم المستخدم
              </th>
              <th class="text-right">
                id
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in students"
              :key="student.id"
              style="height: 50px;"
            >
              <td>
                <v-checkbox class="custom-checkbox" :label=student.name @click="updateSelectedItems($event, student.id)" />
              </td>
              <td>
                {{ student.father_name }}
              </td>
              <td>
                {{ student.grandfather_name }}
              </td>
              <td>
                {{ student.last_name }}
              </td>
              <td>
                {{ student.username }}
              </td>
              <td>
                {{ student.id }}
              </td>
              <!-- <td>
                <div class="d-flex">
                  <div>
                    <v-btn color="indigo-darken-3" @click="navigateTo({name: 'student', params: {id: student.id}})">VIEW</v-btn>
                  </div>
                </div>
              </td> -->
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </div>
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

.custom-checkbox >>> .v-input__details {
  display: none;
}
.firstname-text {
  width: 90;
}

.success-green {
  background-color: rgb(24, 103, 24)
}

.primary {
  background-color: rgb(24,103,192);
}

.title-text {
  pointer-events: none;
  font-size: 40px;
}

</style>
