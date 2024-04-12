<script setup>
import StudentService from "../services/StudentService";
import { useUserStore } from "@/stores/user";

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = useUserStore(); 
const router = useRouter();
const username = ref();
const password = ref();
const error = ref(null);
const items = ref([
  {
    title: 'إنشاء حساب',
    value: {
      name: 'register'
    }
  },
  {
    title: 'تسجيل الدخول كطالب',
    value: {
      name: 'student-login'
    }
  }
]);
const drawer = ref(false);
const logoutDialog = ref(true);

function navigateTo (path) {
  router.push(path);
}

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

async function login () {
  try {
    const response = await StudentService.login({
      username: username.value,
      password: password.value,
    });
    user.user = response.data.student;
    user.token = response.data.token;
    user.role = response.data.role;
    navigateTo({ name: 'student-subject-list' });
  } catch (err) {
    return err.message;
  }
}

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

    <v-sheet width="600px" class="mx-auto mt-16">
      <v-toolbar>
        <v-toolbar-title>
          تسجيل الدخول
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="mt-4">
        <v-text-field
          label="إسم المستخدم"
          hint="ادخل إسم المستخدم الخاص بك"
          :rules="[v => !!v || 'يجب إدخال إسم المستخدم']"
          persistent-hint
          class="ml-2 mr-2"
          v-model="username"
        ></v-text-field>
        <v-text-field
          type="password"
          label="الرمز السري"
          hint="ادخل الرمز السري الخاص بك"
          :rules="[v => !!v || 'يجب إدخال الرمز السري']"
          persistent-hint
          class="ml-2 mr-2"
          v-model="password"
        ></v-text-field>
        <div class="error ml-2" />
        <div class="d-flex">
          <v-btn type="submit" class="mx-auto my-2" @click="login()">Login</v-btn>
        </div>
      </v-form>
    </v-sheet>
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
.sign-un {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}

.info {
  color: gray;
}

.title-text {
  cursor: pointer;
  font-size: 40px;
}
</style>
