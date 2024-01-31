<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StudentService from '@/services/StudentService'

const router = useRouter()
const selectedItem = ref();
const students = ref();

function navigateTo (route) {
  router.push(route);
}

async function index() {
  try {
    const response = await StudentService.index();
    students.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  index();
});

</script>

<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="1000"
      max-height="100vh"
      >
      <div class="d-flex">
        <v-spacer/>
        <v-btn color="primary" class="my-4 mx-4" @click="navigateTo({name: 'add-student'})">ADD STUDENT</v-btn>
        <v-btn color="green" class="my-4 mr-4">UPDATE LIST</v-btn>
        <div style="width: 200px;" class=" my-auto mr-4">
          <v-combobox
          label="Subject"
          :items="['Math', 'Physics', 'Chemistry', 'Geometry']"
          v-model="selectedItem"
          ></v-combobox>
        </div>
      </div>
      <v-toolbar color="purple">
        <v-toolbar-title>Students List</v-toolbar-title>
      </v-toolbar>
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
                  <v-btn color="yellow" class="mr-4" @click="navigateTo({name: 'student', params: {id: student.id}})">VIEW</v-btn>
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

</style>