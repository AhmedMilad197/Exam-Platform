<script setup>
  import AuthenticationService from "../services/AuthenticationService";

  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter();
  const first_name = ref('');
  const last_name = ref('');
  const email = ref('');
  const password = ref('');
  const error = ref(null);

  function navigateTo (path) {
    router.push(path)
  }

  async function register () {
    try {
      const response = await AuthenticationService.register({
        firstname: first_name.value,
        lastname: last_name.value,
        email: email.value,
        password: password.value,
      })
      console.log(response);
      navigateTo({name: 'home'})
    } catch (err) {
      console.log(err.message);
    }
  }

</script>

<template>

    <v-sheet width="600px" class="mx-auto">
      <v-toolbar color="primary">
        <v-toolbar-title>
          Register
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="mt-4">
        <v-text-field
          label="First name"
          class="ml-2 mr-2"
          v-model="first_name"
        ></v-text-field>
        <v-text-field
          label="Last name"
          class="ml-2 mr-2"
          v-model="last_name"
        ></v-text-field>
        <v-text-field
          label="Email"
          class="ml-2 mr-2"
          v-model="email"
        ></v-text-field>
        <v-text-field
          type="password"
          label="Password"
          class="ml-2 mr-2"
          v-model="password"
        ></v-text-field>
        <div class="error ml-2" />
        
        <div class="d-flex">
          <v-btn type="submit" class="mx-auto my-2" @click="register()">Register</v-btn>
        </div>
        <div class="d-flex">
          <div class="mx-auto my-4">
            <span class="info">
              If you already have an account you can
            </span>
            <span class="sign-in" @click="navigateTo({name: 'login'})">
              Sign in
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
  .sign-in {
    cursor: pointer;
    text-decoration: underline;
    color: blue;
  }
  
  .info {
    color: gray;
  }
</style>
