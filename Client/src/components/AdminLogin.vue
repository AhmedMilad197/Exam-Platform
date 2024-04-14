<script setup>
import { useUserStore } from "@/stores/user";
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminService from "../services/AdminService";

const user = useUserStore(); 
const router = useRouter();
const username = ref();
const password = ref();
const error = ref();

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

async function login () {
  try {
    const response = await AdminService.login({
      nameadmin: username.value,
      password: password.value,
    })
    user.user = response.data.admin;
    user.token = response.data.token;
    user.role = response.data.role;
    navigateTo({ name: 'teachers' });
  } catch (err) {
    error.value = 'البيانات الدخلة غير صحيحة'
    return {
      message: err.message
    }
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
          class="ml-2 mr-2"
          v-model="username"
          hint="أدخل إسم المستخدم"
          :rules="[v => !!v || 'يجب إدخال إسم المستخدم']"
          persistent-hint
        ></v-text-field>
        <v-text-field
          type="password"
          label="الرمز السري"
          class="ml-2 mr-2"
          v-model="password"
          hint="أدخل الرمز السري"
          :rules="[v => !!v || 'يجب إدخال الرمز السري']"
          persistent-hint
        ></v-text-field>
        <div class="error d-flex">
          <div class="mx-auto">
            {{ error }}
          </div>
        </div>
        <div class="d-flex">
          <v-btn type="submit" color="primary" class="mx-auto my-4" @click="login()">تسجيل الدخول</v-btn>
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
