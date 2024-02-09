<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import SubjectService from '@/services/SubjectService'
import router from '@/router';

const route = useRoute();
const id = ref();
const subjectName = ref();
const subjectDescription = ref();
const units = ref();

async function getSubject (subjectId) {
  try {
    const response = await SubjectService.show({
      id: subjectId
    });
    id.value = response.data.id;
    subjectName.value = response.data.name;
    subjectDescription.value = response.data.description;
    units.value = response.data.unit;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getSubject(route.params.id);
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
      <v-toolbar-title>Subject Details</v-toolbar-title>
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
              Subject Name
            </b>
          </td>
          <td>
            {{ subjectName }}
          </td>
        </tr>
        <tr style="height: 50px;">
          <td>
            <b>
              Subject Description
            </b>
          </td>
          <td>
            {{ subjectDescription }}
          </td>
        </tr>
        <tr style="height: 50px;">
          <td>
            <b>
              Number of units
            </b>
          </td>
          <td>
            {{ units }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="d-flex">
      <v-spacer></v-spacer>
      <v-btn color="red-darken-4" class="my-4 mx-2" @click="navigateTo({name: 'subject-teacher', params: {course: id}})">ADD TEACHER</v-btn>
      <v-btn color="green" class="my-4 mx-2" @click="navigateTo({name: 'subject-update', params: {id: id}})">UPDATE</v-btn>
      <v-btn color="red" class="my-4 mx-2">DELETE</v-btn>
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