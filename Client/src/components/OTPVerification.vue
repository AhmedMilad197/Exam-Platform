<script setup>
import TeacherService from "../services/TeacherService";
import { useUserStore } from "@/stores/user";
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = useUserStore(); 
const router = useRouter();
const code = ref();
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

async function verifyOTP () {
  try {
    const response = await TeacherService.verifyOTP({
      code: code.value,
    })
    let cached_code = response.data.cached_code.verification_code;
    if (cached_code == code.value) {
      navigateTo({ name: 'reset-password' });
    } else {
      error.value = 'هذا الرمز غير صحيح'
    }
  } catch (err) {
    console.log(err.message);
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
          رمز التحقق
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="mt-4">
        <div class="d-flex">
          <span class="text-h7 mx-2 mb-4" style="color: gray;">
            يرجى إدخال رمز التحقق المرسل إليك
          </span>
        </div>
        <v-text-field
          label="رمز التحقق"
          class="ml-2 mr-2"
          v-model="code"
          hint="أدخل رمز التحقق"
          persistent-hint
        ></v-text-field>
        <div class="d-flex">
          <div v-if="error != null" class="mx-auto">
            <span class="error">
              {{ error }}
            </span>
          </div>
        </div>
        <div class="d-flex">
          <v-btn type="submit" color="primary" class="mx-auto mt-2 mb-4" @click="verifyOTP()">تحقق</v-btn>
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
