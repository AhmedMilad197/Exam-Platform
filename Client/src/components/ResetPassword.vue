<script setup>
  import TeacherService from "../services/TeacherService";
  import { useUserStore } from "@/stores/user";

  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const user = useUserStore(); 
  const router = useRouter();
  const newPassword = ref();
  const error = ref(null);

  function navigateTo (path) {
    router.push(path)
  }

  async function resetPassword () {
    try {
      const response = await TeacherService.resetPassword({
        new_password: newPassword.value,
      })
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
          رمز التحقق
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="mt-4">
        <div class="d-flex">
          <span class="text-h7 mx-2 mb-4" style="color: gray;">
            يرجى إدخال الرمز السري الجديد
          </span>
        </div>
        <v-text-field
          label="الرمز السري"
          class="ml-2 mr-2"
          v-model="newPassword"
          hint="أدخل الرمز السري"
          persistent-hint
        ></v-text-field>
        <div class="error ml-2" />
        <div class="d-flex">
          <v-btn type="submit" color="primary" class="mx-auto mt-2 mb-4" @click="resetPassword()">إرسال</v-btn>
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
