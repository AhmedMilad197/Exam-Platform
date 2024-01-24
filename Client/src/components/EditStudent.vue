<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import StudentService from '@/services/Student'
import router from '@/router';

const route = useRoute();
const id = ref();
const firstname = ref();
const lastname = ref();
const password = ref();
const phone = ref();
const address = ref();

async function getStudent (studentId) {
  try {
    const response = await StudentService.show({
      id: studentId
    });
    id.value = response.data.body.id;
    firstname.value = response.data.body.firstname;
    lastname.value = response.data.body.lastname;
    password.value = response.data.body.password;
    phone.value = response.data.body.phone;
    address.value = response.data.body.address;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getStudent(route.params.id);
})

function navigateTo (route) {
  router.push(route);
}

async function update () {
  try {
    const response = await StudentService.update({
      id: id.value,
      firstname: firstname.value,
      lastname: lastname.value,
      phone: phone.value,
      password: password.value,
      address: address.value,
    });
    navigateTo({name: 'students'});
  } catch (error) {
    return {
      message: error.message
    }
  }
}

</script>

<template>
<v-layout column>
    <v-sheet width="600px" class="mx-auto">
      <v-toolbar color="primary">
        <v-toolbar-title>
          Update Student
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="justify-center mt-4 slot-text-center">
        <v-text-field
          class="ml-2 mr-2"
          v-model="firstname"
        ></v-text-field>
        <v-text-field
          class="ml-2 mr-2"
          v-model="lastname"
        ></v-text-field>
        <v-text-field
          class="ml-2 mr-2"
          v-model="password"
        ></v-text-field>
        <v-text-field
          class="ml-2 mr-2"
          v-model="phone"
        ></v-text-field>
        <v-text-field
          class="ml-2 mr-2"
          v-model="address"
        ></v-text-field>
        <div class="error ml-2" />
        <v-col class="text-center" cols="12">
          <v-btn type="submit" color="primary" @click="update()">UPDATE</v-btn>
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