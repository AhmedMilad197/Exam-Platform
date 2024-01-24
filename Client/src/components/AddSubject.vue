<script setup>
  import AuthenticationService from "../services/AuthenticationService";
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  // import StudentDetails from '@/components/StudentDetails.vue'
  // import StudentService from '@/services/Student'
  
  const router = useRouter()
  const subjectName = ref();
  const desctiption = ref();
  const error = ref(null);

  function navigateTo (routeName) {
    router.push({
      name: routeName
    });
  }
  
  async function register () {
    try {
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
          Add Subject
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="justify-center mt-4 slot-text-center">
        <v-text-field
          label="Subject Name"
          class="ml-2 mr-2"
          v-model="subjectName"
        ></v-text-field>
        <v-text-field
          label="Desctiption"
          class="ml-2 mr-2"
          v-model="desctiption"
        ></v-text-field>
        <div class="error ml-2" />
        <v-col class="text-center" cols="12">
          <v-btn type="submit" @click="register" color="primary">ADD SUBJECT</v-btn>
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
