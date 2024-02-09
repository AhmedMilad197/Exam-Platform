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
    <v-sheet width="600px" class="mx-auto">
      <v-toolbar color="primary">
        <v-toolbar-title>
          Login
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="mt-4">
        <v-text-field
          label="username"
          class="ml-2 mr-2"
          v-model="username"
        ></v-text-field>
        <v-text-field
          type="password"
          label="Password"
          class="ml-2 mr-2"
          v-model="password"
        ></v-text-field>
        <div class="error ml-2" />
        <div class="d-flex">
          <v-btn type="submit" class="mx-auto my-2" @click="login()">Login</v-btn>
        </div>
        <div class="d-flex">
          <div class="mx-auto my-4">
            <span class="info">
              If you don't have an account you can
            </span>
            <span class="sign-un" @click="navigateTo({ name: 'register' })">
              Sign up
            </span>
          </div>
        </div>
      </v-form>
    </v-sheet>
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
