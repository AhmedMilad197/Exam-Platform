<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import TeacherService from "@/services/TeacherService";

const router = useRouter()
const route = useRoute();

function navigateTo (path) {
  router.push(path);
}

const examTitle = ref();
const examDescription = ref();

const questions = ref();
  
async function updateExam() {
  try {
    navigateTo({
      name: 'exam-list',
      params: {
        subject: route.params.subject
      }
    });
  } catch (error) {

  }
}

async function getQuestions() {
  try {
    const response = await TeacherService.questions();
    questions.value = response.data.data
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getQuestions();
});

</script>

<template>
  <div>
      <v-card
      class="mx-auto"
      max-width="1000"
      >
      <v-toolbar color="purple">
        <v-toolbar-title>Create Exam</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex flex-column mx-4 my-4">
          <span class="text-h6 my-auto mr-4">
            Exam Title:
          </span>
          <div>
            <v-text-field
              label="Exam Title"
              v-model="examTitle"
              hint="Enter Exam Title."
              persistent-hint
            ></v-text-field>
          </div>
        </div>
        <div class="d-flex flex-column mx-4 my-4">
          <span class="text-h6 my-auto mr-4">
            Exam Description:
          </span>
          <div>
            <v-text-field
              label="Exam Description"
              v-model="examDescription"
              hint="Enter Exam Description."
              persistent-hint
            ></v-text-field>
          </div>
        </div>
        <div class="d-flex">
          <v-btn color="primary" class="mx-4" @click="updateExam()">Create Exam</v-btn>
        </div>
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
            <th class="text-left">
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
              <v-checkbox class="custom-checkbox" :label=question.question />
            </td>
            <td>
              <div class="d-flex">
                <div>
                  <v-btn color="indigo-darken-3">VIEW</v-btn>
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

.list-item {
  transition: 0.5s;
}

.list-item:hover{
  background-color: bisque;
}

.custom-checkbox >>> .v-input__details {
  display: none;
}

</style>
