<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'

const router = useRouter()
const name = ref();
const username = ref();
const phone = ref();
const password = ref();
const address = ref();
const error = ref(null);

function navigateTo (routeName) {
  router.push({
    name: routeName
  });
}

async function addStudent () {
  try {
    const response = await StudentService.create({
      name: name.value,
      username: username.value,
      phone: phone.value,
      password: password.value,
      address: address.value
    });
    navigateTo('students');
    console.log(response);
  } catch (err) {
    console.log(err.message);
    return {
      message: err.message
    }
  }
}

</script>

<template>
  <v-layout column>
    <v-sheet width="600px" class="mx-auto">
      <v-toolbar color="primary">
        <v-toolbar-title>
          Add Student
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="justify-center mt-4 slot-text-center">
        <v-text-field
          label="First name"
          class="ml-2 mr-2"
          v-model="name"
        ></v-text-field>
        <v-text-field
          label="Username"
          class="ml-2 mr-2"
          v-model="username"
        ></v-text-field>
        <v-text-field
          label="phone"
          class="ml-2 mr-2"
          v-model="phone"
        ></v-text-field>
        <v-text-field
          type="password"
          label="Password"
          class="ml-2 mr-2"
          v-model="password"
        ></v-text-field>
        <v-text-field
          type="address"
          label="address"
          class="ml-2 mr-2"
          v-model="address"
        ></v-text-field>
        <div class="error ml-2" />
        <v-col class="text-center" cols="12">
          <v-btn type="submit" @click="addStudent" color="primary">ADD STUDENT</v-btn>
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
