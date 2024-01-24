<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
  import StudentService from '@/services/Student'

const router = useRouter()
const route = useRoute();
const students = ref();
/*
 * required APIs:
 * api for all the subjects.
 * api for all the questions nested in the subjects.
 */

function navigateTo (path) {
  router.push(path);
}

async function index () {
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
      >
      <v-toolbar color="purple">
        <v-toolbar-title>All Students</v-toolbar-title>
      </v-toolbar>
      
      <div class="d-flex">
        <v-btn color="primary" class="mx-4 my-4" @click="createExam()">ADD STUDENT</v-btn>
      </div>
      <v-table
        fixed-header
        height="100%"
        density="comfortable"
      >
        <thead>
          <tr>
            <th class="text-left">
              First Name
            </th>
            <th class="text-left">
              Last Name
            </th>
            <th class="text-left">
              id
            </th>
            <th class="text-left">
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
            <td>
              <v-checkbox class="custom-checkbox" :label=student.firstname />
            </td>
            <td>
              {{ student.lastname }}
            </td>
            <td>
              {{ student.id }}
            </td>
            <td>
              <div class="d-flex">
                <div>
                  <v-btn color="indigo-darken-3" @click="navigateTo({name: 'student', params: {id: student.id}})">VIEW</v-btn>
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

.list-item {
  transition: 0.5s;
}

.list-item:hover{
  background-color: bisque;
}

.custom-checkbox >>> .v-input__details {
  display: none;
}
.firstname-text {
  width: 90;
}

</style>
