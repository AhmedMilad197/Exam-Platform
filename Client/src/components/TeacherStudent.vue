<script setup>

import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import TeacherService from '@/services/TeacherService'
import { useUserStore } from "@/stores/user";

const user = useUserStore(); 
const router = useRouter()
const route = useRoute();
const students = ref();
const error = ref(null);

function navigateTo (path) {
  router.push(path);
}

async function getStudnets() {
  try {
    const response = await TeacherService.getTeacherStudent(route.params.subject, user.user.id);
    students.value = response.data;
    console.log(response.data)
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function goBack() {
  router.go(-1);  
}

onMounted(() => {
  getStudnets();
});

</script>

<template>
<div>
  <v-card
  class="mx-auto"
  max-width="1000"
  max-height="100vh"
  >
    <v-toolbar color="purple">
      <v-toolbar-title>My Students</v-toolbar-title>
    </v-toolbar>
    <div class="d-flex mx-4 my-4">
      <v-btn color="pink-darken-2" @click="navigateTo({ name: 'teacher-add-student', params: { subject: route.params.subject } })">ADD STUDENT</v-btn>
      <v-btn color="primary" class="mx-4" @click="goBack()">GO BACK</v-btn>
    </div>
    <v-table
      fixed-header
      height="100%"
      density="comfortable"
    >
      <thead>
        <tr>
          <th class="text-left">
            Student
          </th>
          <th class="text-left">
            ID
          </th>
          <th class="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in students"
          :key="student.id"
          style="height: 50px;"
        >
          <td>{{ student.name }}</td>
          <td>{{ student.id }}</td>
          <td>
            <div class="d-flex">
              <div class="mx-auto">
                <v-btn color="red">REMOVE</v-btn>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</div>
</template>

<style scoped>
  .error {
    color: red;
  }
</style>
