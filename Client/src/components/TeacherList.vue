<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TeacherService from '@/services/TeacherService'

const selectedItem = ref();
const router = useRouter();
const id = ref();
const show = ref(false);
const name = ref();
const username = ref();
const last_login = ref();
const active = ref();
const teachers = ref();

function navigateTo (route) {
  router.push(route);
}

async function index () {
  try {
    const response = await TeacherService.index();
    teachers.value = response.data;
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
      <v-toolbar color="purple">
        <v-toolbar-title>Teachers List</v-toolbar-title>
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
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.id }}</td>
            <td>
              <div class="d-flex">
                <div class="mx-auto">
                  <v-btn color="yellow" class="mr-4" @click="navigateTo({ name: 'teacher', params: {id: teacher.id} })">VIEW</v-btn>
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