<script setup>
import AuthenticationService from "../services/AuthenticationService";
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from "@/stores/user";

const user = useUserStore(); 
const router = useRouter();
const name = ref('');
const username = ref('');
const email = ref('');
const specialist = ref('');
const password = ref('');
const error = ref(null);
const teacherForm = ref();
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

async function register () {
  try {
    const { valid, errors } = await teacherForm.value?.validate();
    if (valid) {
      const response = await AuthenticationService.register({
        name: name.value,
        username: username.value,
        email: email.value,
        specialist: specialist.value,
        password: password.value,
      })
      user.user = response.data.teacher;
      user.token = response.data.token;
      navigateTo({name: 'home'})
    }
  } catch (err) {
    error.value = 'اسم المستخدم او الإيميل موجود مسبقا'
  }
}

function emailRule (value) {
  if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
  return 'بيانات البريد الإلكتروني غير صحيحة'
}

function nameRule(value) {
  if (!value) {
    return 'يجب أدخال بيانات هذا الحقل';
  }
  if (!/^[\p{L}\s]*$/u.test(value)) {
    return 'يجب على هذا الحقل أن لا يحتوي على أرقام';
  }
  return true;
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

    <v-sheet width="600px" class="mx-auto mt-16">
      <v-toolbar>
        <v-toolbar-title>
          إنشاء حساب
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="mt-4" ref="teacherForm">
        <v-text-field
          label="الإسم بالكامل"
          class="ml-2 mr-2 mb-2"
          v-model="name"
          hint="أدخل الإسم بالكامل"
          :rules="[v => nameRule(v)]"
          persistent-hint
        ></v-text-field>
        <v-text-field
          label="اسم المستخدم"
          class="ml-2 mr-2 mb-2"
          v-model="username"
          hint="أدخل الإسم المستخدم"
          :rules="[v => !!v || 'يجب إدخال إسم المستخدم']"
          persistent-hint
        ></v-text-field>
        <v-text-field
          label="البريد الإلكتروني"
          class="ml-2 mr-2 mb-2"
          v-model="email"
          hint="أدخل البريد الإلكتروني"
          :rules="[v => emailRule(v)]"
          persistent-hint
        ></v-text-field>
        <v-text-field
          label="التخصص"
          class="ml-2 mr-2 mb-2"
          v-model="specialist"
          hint="أدخل التخصص"
          :rules="[v => !!v || 'يجب إدخال التخصص']"
          persistent-hint
        ></v-text-field>
        <v-text-field
          type="password"
          label="الرمز السري"
          :rules="[v => !!v || 'يجب إدخال الرمز السري']"
          class="ml-2 mr-2 mb-2"
          v-model="password"
          hint="أدخل الرمز السري"
          persistent-hint
        ></v-text-field>
        <div class="error d-flex">
          <div class="mx-auto my-4 error-text">
            {{ error }}
          </div>
        </div>
        <div class="d-flex">
          <v-btn type="submit" color="primary" class="mx-auto my-2" @click="register()">تسجيل</v-btn>
        </div>
        <div class="d-flex">
          <div class="mx-auto my-4">
            <span class="info">
              إذا قمت بإنشاء حساب في وقت سابق يمكنك 
            </span>
            <span class="sign-in" @click="navigateTo({name: 'login'})">
              تسجيل الدخول
            </span>
          </div>
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
  border: 1px rgb(238,238,238) solid;
  border-radius: 2px;
}

.slot-text-center {
  text-align: center;
}
.sign-in {
    cursor: pointer;
  text-decoration: underline;
  color: blue;
}

.info {
  color: gray;
}

.title-text {
  pointer-events: none;
  font-size: 40px;
}

</style>
