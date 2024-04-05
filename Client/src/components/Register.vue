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

function navigateTo (path) {
  router.push(path)
}

async function register () {
  try {
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
  } catch (err) {
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

    <v-sheet width="600px" class="mx-auto">
      <v-toolbar>
        <v-toolbar-title>
          إنشاء حساب
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="mt-4">
        <v-text-field
          label="الإسم بالكامل"
          class="ml-2 mr-2 mb-2"
          v-model="name"
          hint="أدخل الإسم بالكامل"
          :rules="[v => !!v || 'يجب إدخال الإسم بالكامل']"
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
        <div class="error ml-2 mb-2" />
        
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
</style>
