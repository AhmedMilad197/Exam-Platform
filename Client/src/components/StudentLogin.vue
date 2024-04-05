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

function navigateTo (path) {
  router.push(path)
}

async function login () {
  try {
    const response = await StudentService.login({
      username: username.value,
      password: password.value,
    })
    user.user = response.data.student;
    user.token = response.data.token;
    navigateTo({ name: 'student-subject-list' });
  } catch (err) {
    return err.message;
  }
}

</script>
<template>
  <v-locale-provider rtl>

    <v-sheet width="600px" class="mx-auto">
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
</style>
