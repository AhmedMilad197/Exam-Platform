<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import StudentService from '@/services/Student'

const route = useRoute();
const id = ref();
const firstname = ref();
const lastname = ref();
const password = ref();
const phone = ref();
const address = ref();

async function getStudent (studentId) {
  try {
    const response = await StudentService.show({
      id: studentId
    });
    id.value = response.data.body.id;
    firstname.value = response.data.body.firstname;
    lastname.value = response.data.body.lastname;
    password.value = response.data.body.password;
    phone.value = response.data.body.phone;
    address.value = response.data.body.address;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getStudent(route.params.id);
})

const items = [
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',

  },
  // ... more items
]

</script>

<template>
  <!-- <v-layout column>
    <v-sheet width="600px" class="mx-auto">
      <v-toolbar color="primary">
        <v-toolbar-title>
          Student Details
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="justify-center mt-4 slot-text-center">
        <div class="d-flex">
          <div class="d-flex flex-column ml-10">
            <span class="text-h6">
              ID:
            </span>
            <span class="text-h6">
              First Name:
            </span>
            <span class="text-h6">
              Last Name:
            </span>
            <span class="text-h6">
              Password:
            </span>
            <span class="text-h6">
              Address:
            </span>
            <span class="text-h6">
              Phone:
            </span>
          </div>
        </div>
        <div class="error ml-2" />
        <v-col class="text-center" cols="12">
          <v-btn type="submit" color="primary" @click="register">GO BACK</v-btn>
        </v-col>
      </v-form>
    </v-sheet>
  </v-layout> -->

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
                {{ firstname }}
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
                {{ lastname }}
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
        <v-btn color="primary" class="my-4 mx-2">UPDATE</v-btn>
        <v-btn color="red" class="my-4 mx-2">BLOCK</v-btn>
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