<script setup>
  import TeacherService from "../services/TeacherService";
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
      const response = await TeacherService.login({
        username: username.value,
        password: password.value,
      })
      user.user = response.data.teacher;
      user.token = response.data.token;
      navigateTo({ name: 'home' });
    } catch (err) {
      console.log(err.message);
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
        <div class="error ml-2" />
        <div class="d-flex">
          <span class="sign-in mx-2 my-2" @click="navigateTo({ name: 'send-otp' })">
            نسيت الرمز السري
          </span>
        </div>
        <div class="d-flex">
          <v-btn type="submit" color="primary" class="mx-auto my-2" @click="login()">تسجيل الدخول</v-btn>
        </div>
        <div class="d-flex">
          <div class="mx-auto my-4">
            <span class="info">
              إذا لم يكن لديك حساب يمكنك
            </span>
            <span class="sign-in" @click="navigateTo({ name: 'register' })">
              انشاء حساب
            </span>
            <span class="info">
              جديد
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
</style>
