<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
// import StudentDetails from '@/components/StudentDetails.vue'
// import StudentService from '@/services/Student'

const router = useRouter()
const selectedItem = ref();
const id = ref();
const show = ref(false);
const name = ref();
const username = ref();
const last_login = ref();
const active = ref();
const students = ref([
    {
      id: 1,
      name: 'This is the first student.',
      username: 'username',
      lastlogin: new Date(),
      active: true,
    },
    {
      id: 2,
      name: 'This is the second student.',
      username: 'username1',
      lastlogin: new Date(),
      active: true,
    },
    {
      id: 3,
      name: 'This is the third student.',
      username: 'username2',
      lastlogin: new Date(),
      active: true,
    },
    {
      id: 4,
      name: 'This is the fourth student.',
      username: 'username3',
      lastlogin: new Date(),
      active: true,
    },
    {
      id: 5,
      name: 'This is the fifth student.',
      username: 'username4',
      lastlogin: new Date(),
      active: true,
    },
  ]);

  function showModal () {
    show.value = true;
  }

  function closeModal () {
    show.value = false;
  }

  async function getStudent (studentId) {
    try {
      const response = await StudentService.show({
        id: studentId
      });
      id.value = response.data.data.id;
      name.value = response.data.data.name;
      username.value = response.data.data.username;
      active.value = response.data.data.active;
      last_login.value = response.data.data.last_login;
      console.log(id.value);
    } catch (error) {
      console.log(error.message);
      return {
        message: error.message
      }
    }
  }

  function navigateTo (routeName) {
    router.push({
      name: routeName
    });
  }

  // async function getStudent (studentId) {
  //   try {
  //     const response = await TeacherService.show({
  //       id: studentId
  //     });
  //     id.value = response.data.data.id;
  //     name.value = response.data.data.name;
  //     username.value = response.data.data.username;
  //     active.value = response.data.data.active;
  //     last_login.value = response.data.data.last_login;
  //     console.log(id.value);
  //   } catch (error) {
  //     console.log(error.message);
  //     return {
  //       message: error.message
  //     }
  //   }
  // }

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
        <v-btn color="primary" class="my-4 mx-4" @click="navigateTo('add-student')">ADD STUDENT</v-btn>
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
                  <v-btn color="yellow" class="mr-4" @click="showModal(student.id), getStudent(student.id)">VIEW</v-btn>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <!-- <StudentDetails 
    @close="closeModal()" 
    :id="id"
    :show="show" 
    :name="name" 
    :username="username"
    :active="active" 
    :last_login="last_login"/> -->
  </div>
</template>

<style scoped>

</style>