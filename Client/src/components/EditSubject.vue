<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import SubjectService from '@/services/Subject'
import router from '@/router';

const route = useRoute();
const id = ref();
const subjectname = ref();
const desctiption = ref();

function navigateTo (route) {
  router.push(route);
}

async function getSubject (subjectId) {
  try {
    const response = await SubjectService.show({
      id: subjectId
    });
    id.value = response.data.body.id;
    subjectname.value = response.data.body.subjectname;
    desctiption.value = response.data.body.desctiption;
  } catch (error) {
    console.log(error.message)
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getSubject(route.params.id);
})

async function update () {
  try {
    const response = await SubjectService.update({
      id: id.value,
      subjectname: subjectname.value,
      desctiption: desctiption.value,
    });
    navigateTo({name: 'subjects'});
  } catch (error) {
    return {
      message: error.message
    }
  }
}

</script>

<template>
<v-layout column>
    <v-sheet width="600px" class="mx-auto">
      <v-toolbar color="primary">
        <v-toolbar-title>
          Update Subject
        </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent class="justify-center mt-4 slot-text-center">
        <v-text-field
          class="ml-2 mr-2"
          v-model="subjectname"
        ></v-text-field>
        <v-text-field
          class="ml-2 mr-2"
          v-model="desctiption"
        ></v-text-field>
        <div class="error ml-2" />
        <v-col class="text-center" cols="12">
          <v-btn type="submit" color="primary" @click="update()">UPDATE</v-btn>
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