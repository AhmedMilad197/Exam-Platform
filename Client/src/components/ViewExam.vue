<script setup>
import ExamService from '@/services/ExamService';
import {ref, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute();
const router = useRouter();
const name = ref();
const description = ref();
const start_time = ref();
const end_time = ref();
const questions = ref();

function navigateTo (path) {
  router.push(path);
}

async function getExam () {
  try {
    const response = await ExamService.getExam({
      examId: route.params.id
    })
    name.value = response.data.name;
    description.value = response.data.description;
    start_time.value = response.data.start_time;
    end_time.value = response.data.end_time;
    questions.value = response.data.questions;
    console.log(questions.value)
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getExam();
});

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
              Exam Title
            </b>
          </td>
          <td>
            {{ name }}
          </td>
        </tr>
        <tr style="height: 50px;">
          <td>
            <b>
              Exam Description
            </b>
          </td>
          <td>
            {{ description }}
          </td>
        </tr>
        <tr style="height: 50px;">
          <td>
            <b>
              Start Time
            </b>
          </td>
          <td>
            {{ start_time }}
          </td>
        </tr>
        <tr style="height: 50px;">
          <td>
            <b>
              End Time
            </b>
          </td>
          <td>
            {{ end_time }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <hr>
    <div>
      <div class="mx-4 my-4">
        <span class="text-h5 mx-4 my-4">
          Questions
        </span>
      </div>
    </div>
    <div>
      <v-table
        fixed-header
        height="100%"
        density="comfortable"
      >
        <thead>
          <tr>
            <th class="text-left">
              Question
            </th>
            <th class="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="question in questions"
            :key="question.id"
            style="height: 50px;"
          >
          <td>
            {{ question.content }}
          </td>
            <td>
              <div class="d-flex">
                <div class="mx-auto">
                  <v-btn color="indigo-darken-3" @click="navigateTo({name: 'view-question', params: {id: question.id}})">VIEW</v-btn>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <div class="d-flex">
      <!-- <v-spacer></v-spacer> -->
      <div class="mx-auto">
        <v-btn color="red" class="my-4 mx-2">DELETE</v-btn>
        <v-btn color="primary" class="my-4 mx-2" @click="router.go(-1)">GO BACK</v-btn>
      </div>
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
