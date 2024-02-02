<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import TeacherService from '@/services/TeacherService'
import router from '@/router';

const route = useRoute();
const id = ref();
const name = ref();
const username = ref();
const password = ref();
const lastlogin = ref();
const specialist = ref();

async function getTeacher (teacherId) {
  try {
    const response = await TeacherService.show({
      id: teacherId
    });
    id.value = response.data.id;
    name.value = response.data.name;
    username.value = response.data.username;
    password.value = response.data.password;
    lastlogin.value = response.data.lastlogin;
    specialist.value = response.data.specialist;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getTeacher(route.params.id);
})

function navigateTo (route) {
  router.push(route);
}

</script>

<template>
  <v-card
    class="mx-auto"
    max-width="1000"
    max-height="100vh"
    >
    <v-toolbar color="purple">
      <v-toolbar-title>Teacher Details</v-toolbar-title>
    </v-toolbar>
    <v-table
      fixed-header
      height="100%"
      density="comfortable"
    >
      <thead>
        <tr>
          <th class="text-left">
            DATA
          </th>
          <th class="text-left">
            VALUE
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style="height: 50px;">
          <td>
            <b>
              Name
            </b>
          </td>
          <td>
            <b>
              {{ name }}
            </b>
          </td>
        </tr>
        <tr style="height: 50px;">
          <td>
            <b>
              Username
            </b>
          </td>
          <td>
            <b>
              {{ username }}
            </b>
          </td>
        </tr>
        <tr style="height: 50px;">
          <td>
            <b>
              lastlogin
            </b>
          </td>
          <td>
            <b>
              {{ lastlogin }}
            </b>
          </td>
        </tr>
        <tr style="height: 50px;">
          <td>
            <b>
              specialist
            </b>
          </td>
          <td>
            <b>
              {{ specialist }}
            </b>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="d-flex">
      <v-spacer></v-spacer>
      <v-btn color="green" class="my-4 mx-2" @click="navigateTo({name: 'teacher-update'})">UPDATE</v-btn>
      <v-btn color="red" class="my-4 mx-2">BLOCK</v-btn>
      <v-btn color="primary" class="my-4 mx-2" @click="router.go(-1)">GO BACK</v-btn>
    </div>
  </v-card>

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