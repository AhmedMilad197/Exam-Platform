<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import SubjectService from '@/services/SubjectService'
import router from '@/router';

const route = useRoute();
const id = ref();
const subjectname = ref();
const desctiption = ref();
const units = ref();

function navigateTo (route) {
  router.push(route);
}

async function getSubject (subjectId) {
  try {
    const response = await SubjectService.show({
      id: subjectId
    });
    id.value = response.data.id;
    subjectname.value = response.data.name;
    desctiption.value = response.data.description;
    units.value = response.data.unit
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
      name: subjectname.value,
      description: desctiption.value,
      unit: units.value,
    }, route.params.id);
    navigateTo({name: 'subjects'});
  } catch (error) {
    return {
      message: error.message
    }
  }
}

</script>

<template>
<v-locale-provider rtl>

  <v-layout column>
      <v-sheet width="600px" class="mx-auto">
        <v-toolbar color="primary">
          <v-toolbar-title>
            Update Subject
          </v-toolbar-title>
        </v-toolbar>
        <v-form @submit.prevent class="justify-center mt-4 slot-text-center">
          <v-text-field
            label="اسم المادة"
            class="ml-2 mr-2"
            v-model="subjectname"
          ></v-text-field>
          <v-text-field
            label="وصف المادة"
            class="ml-2 mr-2"
            v-model="desctiption"
          ></v-text-field>
          <v-combobox
            class="ml-2 mr-2"
            label="الوحدات"
            :items="['1', '2', '3', '4', '5']"
            v-model="units"
          />
          <div class="error ml-2" />
          <v-col class="text-center" cols="12">
            <v-btn type="submit" color="primary" @click="update()">UPDATE</v-btn>
          </v-col>
        </v-form>
      </v-sheet>
    </v-layout>
</v-locale-provider>
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