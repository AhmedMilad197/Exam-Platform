<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedItem = ref();
const subjects = ref([
    {
      id: 1,
      name: 'This is the first subject.',
      description: 'this is the description of subject'
    },
    {
      id: 2,
      name: 'This is the second subject.',
      description: 'this is the description of subject'
    },
    {
      id: 3,
      name: 'This is the third subject.',
      description: 'this is the description of subject'
    },
    {
      id: 4,
      name: 'This is the fourth subject.',
      description: 'this is the description of subject'
    },
    {
      id: 5,
      name: 'This is the fifth subject.',
      description: 'this is the description of subject'
    },
  ]);

function navigateTo (route) {
  router.push(route);
}

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
        <v-btn color="primary" class="my-4 mx-4" @click="navigateTo({name: 'add-subject'})">ADD subject</v-btn>
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
        <v-toolbar-title>subjects List</v-toolbar-title>
      </v-toolbar>
      <v-table
        fixed-header
        height="100%"
        density="comfortable"
      >
        <thead>
          <tr>
            <th class="text-left">
              Subject
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
            v-for="subject in subjects"
            :key="subject.id"
            style="height: 50px;"
          >
            <td>{{ subject.name }}</td>
            <td>{{ subject.id }}</td>
            <td>
              <div class="d-flex">
                <div class="mx-auto">
                  <v-btn color="yellow" class="mr-4" @click="navigateTo({name: 'subject', params: {id: subject.id}})">VIEW</v-btn>
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