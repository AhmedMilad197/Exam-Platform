<script setup>
  import TeacherService from "../services/TeacherService";
  import { useUserStore } from "@/stores/user";

  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const user = useUserStore(); 
  const router = useRouter();
  const email = ref();
  const error = ref(null);

  function navigateTo (path) {
    router.push(path)
  }

  async function sendOTP () {
    try {
      const response = await TeacherService.sendOTP({
        email: email.value,
      })
      navigateTo({ name: 'otp-verification' });
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
        <div class="error ml-2" />
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
</style>
