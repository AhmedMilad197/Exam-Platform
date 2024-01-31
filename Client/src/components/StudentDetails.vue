<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import StudentService from '@/services/StudentService'
import router from '@/router';

const route = useRoute();
const id = ref();
const name = ref();
const username = ref();
const password = ref();
const phone = ref();
const address = ref();

async function getStudent (studentId) {
  try {
    const response = await StudentService.show({
      id: studentId
    });
    id.value = response.data.id;
    name.value = response.data.name;
    username.value = response.data.username;
    password.value = response.data.password;
    phone.value = response.data.phone;
    address.value = response.data.address;
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

</script>

<template>
  <v-card
      class="mx-auto"
      max-width="1000"
      max-height="100vh"
      >
      <v-toolbar color="purple">
        <v-toolbar-title>Student Details</v-toolbar-title>
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
                First Name
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
                Last Name
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
                Password
              </b>
            </td>
            <td>
              <b>
                {{ password }}
              </b>
            </td>
          </tr>
          <tr style="height: 50px;">
            <td>
              <b>
                Phone
              </b>
            </td>
            <td>
              <b>
                {{ phone }}
              </b>
            </td>
          </tr>
          <tr style="height: 50px;">
            <td>
              <b>
                Address
              </b>
            </td>
            <td>
              <b>
                {{ address }}
              </b>
            </td>
          </tr>
        </tbody>
      </v-table>
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn color="green" class="my-4 mx-2" @click="navigateTo({name: 'student-update'})">UPDATE</v-btn>
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