<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/stores/user";
import StudentService from "@/services/StudentService";
import imgUrl from '../assets/books.jpg'

const user = useUserStore(); 
const router = useRouter();
const route = useRoute();
const subjects = ref();
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

async function getSubjects() {
  try {
    const response = await StudentService.getSubjects({
      studentId: user.user.id,
    });
    subjects.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  if (user.role != 'student') {
    router.go(-1);
  }
  getSubjects();
});

</script>

<template>
  <v-locale-provider rtl>
    <v-layout>
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

    <div class="mx-auto">
      <img :src="imgUrl" alt="Logo" style="width: 1400px; height: 450px;">
    </div>
    
    <v-card
    class="mx-auto"
    max-width="1000"
    >
    <v-toolbar>
      <v-toolbar-title>المواد</v-toolbar-title>
    </v-toolbar>
      <v-table
          fixed-header
          height="100%"
          density="comfortable"
        >
        <thead>
          <tr>
            <th class="text-right">
              المواد
            </th>
            <th class="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
              v-for="subject in subjects"
              :key="subject.id"
              style="height: 50px;"
            >
              <td>{{ subject.name }}</td>
              <td>
                <div class="d-flex">
                  <div class="mx-auto">
                    <div class="d-flex">
                      <v-btn 
                      color="primary" 
                      class="my-auto mx-4"
                      @click="navigateTo({ name: 'student-exam-list', params: { id: subject.id }});"
                      >الدخول</v-btn>
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

.title-text {
  pointer-events: none;
  font-size: 40px;
}

</style>
