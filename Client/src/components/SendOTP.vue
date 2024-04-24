<script setup>
  import TeacherService from "../services/TeacherService";
  import { useUserStore } from "@/stores/user";

  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const user = useUserStore(); 
  const router = useRouter();
  const email = ref();
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

async function sendOTP () {
  try {
    const response = await TeacherService.sendOTP({
      email: email.value,
    })
    navigateTo({ name: 'otp-verification' });
  } catch (err) {
    error.value = 'لا يوجد مستخدم بهذا الحساب'
    console.log(err.message);
  }
}

function emailRule (value) {
  if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
  return 'بيانات البريد الإلكتروني غير صحيحة'
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
          البريد الإلكتروني
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="mt-4">
        <div class="d-flex">
          <span class="text-h7 mx-2 mb-4" style="color: gray;">
            يرجى إدخال البريد الإلكتروني لإرسال رمز التحقق
          </span>
        </div>
        <v-text-field
          label="البريد الإلكتروني"
          :rules="[v => emailRule(v)]"
          class="ml-2 mr-2"
          v-model="email"
          hint="أدخل البريد الإلكتروني"
          persistent-hint
        ></v-text-field>
        <div class="d-flex">
          <div class="error mx-auto" >
            {{ error }}
          </div>
        </div>
        <div class="d-flex">
          <v-btn type="submit" color="primary" class="mx-auto mt-2 mb-4" @click="sendOTP()">إرسال</v-btn>
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
.sign-in {
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
