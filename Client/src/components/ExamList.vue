<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref, onMounted} from 'vue'
import { useUserStore } from "@/stores/user";
import TeacherService from "@/services/TeacherService"

const user = useUserStore(); 
const router = useRouter()
const route = useRoute();
const exams = ref();

function navigateTo (path) {
  router.push(path);
}

async function getQuestions() {
  try {
    const response = await TeacherService.getExams({
      teacherId: user.user.id
    });
    exams.value = response.data;
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
  <v-locale-provider rtl>
    
    <v-card
    class="mx-auto"
    max-width="800"
    >
    <v-toolbar color="purple">
      <v-toolbar-title>Exams List</v-toolbar-title>
    </v-toolbar>
      <div class="d-flex flex-column">
        <div class="mx-4 my-4">
          <!-- <v-btn color="primary" class="mx-2" @click="navigateTo({name: 'exam-create', params: { subject: route.params.subject }})">Mid-Term</v-btn>
          <v-btn color="primary" class="mx-2" @click="navigateTo({name: 'exam-create', params: { subject: route.params.subject }})">Final Exam</v-btn> -->
          <v-btn color="primary" class="mx-2" @click="navigateTo({name: 'exam-create', params: { subject: route.params.subject }})">Create Exam</v-btn>
          <v-btn color="blue-grey-darken-4" class="ml-2" @click="navigateTo({ name: 'teacher-questions', params: { subject: route.params.subject }})">My Questions</v-btn>
          <v-btn color="pink-darken-2" class="mx-2" @click="navigateTo({ name: 'teacher-student', params: { subject: route.params.subject }})">My Students</v-btn>
        </div><hr>
        <div>
          <v-list>
            <div v-for="exam in exams" :key="exam.id">
              <v-list-item>
                <div class="d-flex mx-4">
                  <b>
                    {{ exam.name }}
                  </b>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" class="mx-2" @click="navigateTo({name: 'view-exam', params: { id: exam.id }})">View</v-btn>
                  <v-btn color="red" class="mx-2">DELETE</v-btn>
                </div>
              </v-list-item>
            </div>
          </v-list>
        </div>
      </div>
    </v-card>
    </v-locale-provider>
</template>

<style scoped>

.list-item {
  transition: 0.5s;
}

.list-item:hover{
  background-color: bisque;
}

</style>
