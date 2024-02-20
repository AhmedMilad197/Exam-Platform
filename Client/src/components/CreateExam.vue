<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import TeacherService from '@/services/TeacherService'
import ExamService from '@/services/ExamService'
import { useUserStore } from "@/stores/user";

const user = useUserStore(); 
const router = useRouter()
const route = useRoute();
const starthour = ref();
const startminute = ref();
const endhour = ref();
const endminute = ref();
const date = ref()

function formatDate(hour, minute) {
  const dateObject = new Date(date.value);
  dateObject.setHours(hour);
  dateObject.setMinutes(minute);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Africa/Tripoli'
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(dateObject);

  const formattedDateTime = `${parts[4].value}-${parts[0].value}-${parts[2].value} ${parts[6].value}:${parts[8].value}:${parts[10].value}`;
  
  return formattedDateTime
}

function navigateTo (path) {
  router.push(path);
}

const examTitle = ref();
const examDescription = ref();

const questions = ref();
  
async function createExam() {
  try {
    router.go(-1);
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function getQuestions() {
  try {
    const response = await TeacherService.getQuestions({
      teacherId: user.user.id,
      couresId: route.params.subject
    })
    questions.value = response.data
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function updateSelectedItems(event, id) {
  if (event.target.checked) {
    selectedItems.push(id);
  } else {
    var index = selectedItems.indexOf(id);
    if (index !== -1) {
      selectedItems.splice(index, 1);
    }
  }
}

async function addQuestions() {
  try {
    const response = await SubjectService.addTeachers({
      courseId: route.params.course,
      teachers: selectedItems
    });
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getQuestions()
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
      <div class="d-flex my-4">
        <div class="mx-4">
          <v-date-picker
            header="Exam Date"
            bg-color="primary"
            v-model="date"
          ></v-date-picker>
        </div>
        <div class="d-flex flex-column" style="width: 500px;">
          <div class="mx-4">
            <span class="text-h5">Start Time</span>
            <div>
              <div class="mx-2 my-2">
                <v-combobox
                  label="hour"
                  :items="['8', '9', '10', '11', '12','1', '2', '3', '4', '5']"
                  v-model="starthour"
                ></v-combobox>
              </div>
              <div class="mx-2 my-2">
                <v-combobox
                  label="minutes"
                  :items="['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']"
                  v-model="startminute"
                ></v-combobox>
              </div>
            </div>
          </div>
          <div class="mx-4">
            <span class="text-h5">End Time</span>
            <div>
              <div class="mx-2 my-2">
                <v-combobox
                  label="hour"
                  :items="['8', '9', '10', '11', '12','1', '2', '3', '4', '5']"
                  v-model="endhour"
                ></v-combobox>
              </div>
              <div class="mx-2 my-2">
                <v-combobox
                  label="minutes"
                  :items="['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']"
                  v-model="endminute"
                ></v-combobox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex">
        <v-btn color="primary" class="mx-auto" @click="createExam()">Create Exam</v-btn>
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
              <v-checkbox class="custom-checkbox" :label=question.content />
            </td>
            <td>
              <div class="d-flex">
                <div>
                  <v-btn color="indigo-darken-3" @click="navigateTo({name: 'view-question', params: {id: question.id}})">VIEW</v-btn>
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
