<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TeacherService from '@/services/TeacherService'
import SubjectService from '@/services/SubjectService'

const router = useRouter();
const route = useRoute();
const teachers = ref();
const selectedItems = [];

function navigateTo (route) {
  router.push(route);
}

async function index() {
  try {
    const response = await TeacherService.availableTeachers({
      courseId: route.params.course
    });
    teachers.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function updateSelectedItems(event, id) {
  if (event.target.checked) {
    selectedItems.push(id);
  } else {
    var index = selectedItems.indexOf(id);
    if (index !== -1) {
      selectedItems.splice(index, 1);
    }
  }
}

async function addTeacher() {
  try {
    const response = await SubjectService.addTeachers({
      courseId: route.params.course,
      teachers: selectedItems
    });
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
        <v-btn color="primary" class="my-4 mx-4" @click="addTeacher()">ADD TEACHER</v-btn>
      </div>
      <v-toolbar color="purple">
        <v-toolbar-title>Teacher List</v-toolbar-title>
      </v-toolbar>
      <v-table
        fixed-header
        height="100%"
        density="comfortable"
      >
        <thead>
          <tr>
            <th class="text-left">
              Teacher
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
            v-for="teacher in teachers"
            :key="teacher.id"
            style="height: 50px;"
          >
            <td>
              <v-checkbox class="custom-checkbox" :label=teacher.name @click="updateSelectedItems($event, teacher.id)" />
            </td>
            <td>{{ teacher.id }}</td>
            <td>
              <div class="d-flex">
                <div class="mx-auto">
                  <v-btn color="yellow" class="mr-4" @click="navigateTo({name: 'teacher', params: {id: teacher.id}})">VIEW</v-btn>
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