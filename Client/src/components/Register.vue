<script setup>
  import AuthenticationService from "../services/AuthenticationService";

  import { ref } from 'vue'

  const first_name = ref('');
  const last_name = ref('');
  const email = ref('');
  const password = ref('');
  const error = ref(null);

  async function register () {
    try {
      const response = await AuthenticationService.register({
        firstname: first_name.value,
        lastname: last_name.value,
        email: email.value,
        password: password.value,
      })
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  }

</script>

<template>
  <v-layout column>
    <v-sheet width="600px" class="mx-auto">
      <v-toolbar>
        <v-toolbar-title>
          Register
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="justify-center mt-4 slot-text-center">
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
        <v-col class="text-center" cols="12">
          <v-btn type="submit" @click="register">Submit</v-btn>
        </v-col>
      </v-form>
    </v-sheet>
  </v-layout>
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
</style>
