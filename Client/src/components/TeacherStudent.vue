<script setup>

import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import StudentService from '@/services/Student'

const router = useRouter()
const students = ref();
const error = ref(null);

function navigateTo (routeName) {
  router.push({
    name: routeName
  });
}

async function getStudnets(teacherId) {

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
      <v-toolbar-title>Questions List</v-toolbar-title>
      <div style="width: 200px;" class=" my-auto mr-4">
        <v-combobox
        label="Subject"
        :items="['Math', 'Physics', 'Chemistry', 'Geometry']"
        v-model="selectedItem"
      ></v-combobox>
      </div>
    </v-toolbar>
    <v-table
      fixed-header
      height="100%"
      density="comfortable"
    >
      <thead>
        <tr>
          <th class="text-left">
            Question
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
          v-for="question in questions"
          :key="question.id"
          style="height: 50px;"
        >
          <td>{{ question.question }}</td>
          <td>{{ question.id }}</td>
          <td>
            <div class="d-flex">
              <div class="mx-auto">
                <v-btn color="blue" class="mr-4" @click="navigateTo({name: 'edit-question', params: {id: question.id}})">EDIT</v-btn>
                <v-btn color="red">DELETE</v-btn>
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
