<script setup>
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import SubjectService from '@/services/SubjectService'

const router = useRouter()
const subjectName = ref();
const description = ref();
const units = ref(1);
const errorMessage = ref();
const error = ref(null);

function navigateTo (routeName) {
  router.push({
    name: routeName
  });
}

async function AddSubject () {
  try {
    await SubjectService.create({
      name: subjectName.value,
      active: true,
      description: description.value,
      image: '/todo-later',
      unit: units.value,
    });
    navigateTo('students');
  } catch (err) {
    return {
      message: err.message
    }
  }
}

</script>

<template>
  <v-layout column>
    <v-sheet width="600px" class="mx-auto">
      <v-toolbar color="primary">
        <v-toolbar-title>
          Add Subject
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="justify-center mt-4 slot-text-center">
        <v-text-field
          label="Subject Name"
          class="ml-2 mr-2"
          v-model="subjectName"
        ></v-text-field>
        <v-text-field
          label="description"
          class="ml-2 mr-2"
          v-model="description"
        ></v-text-field>
        <v-text-field
          label="units"
          class="ml-2 mr-2"
          v-model="units"
          type="number"
        ></v-text-field>
        <div v-if="error == true">
          <small class="error">
            {{ errorMessage }}
          </small>
        </div>
        <div class="error ml-2" />
        <v-col class="text-center" cols="12">
          <v-btn type="submit" @click="AddSubject" color="primary">ADD SUBJECT</v-btn>
        </v-col>
      </v-form>
    </v-sheet>
  </v-layout>
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
