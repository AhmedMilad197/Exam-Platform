<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref, onMounted} from 'vue'
import { useUserStore } from "@/stores/user";
import TeacherService from "@/services/TeacherService"
import ExamService from '@/services/ExamService';

const user = useUserStore(); 
const router = useRouter()
const route = useRoute();
const exams = ref([]);
const dialog = ref(false);
const snackbar = ref(false);
const headers = ref([
  {title: 'exam', key: 'name', align: 'start'},
  {title: 'id', key: 'id'},
  {title: 'actions', key: 'actions'}
]);

const editedIndex = ref(-1)
const currentExam = ref({
    id : '',
    name: '',
})

function navigateTo (path) {
  router.push(path);
}

async function getExams() {
  try {
    const response = await TeacherService.getExams({
      teacherId: user.user.id,
      courseId: route.params.subject
    });
    exams.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function goTo(item) {
  editedIndex.value = exams.value.indexOf(item)
  currentExam.value = Object.assign({}, item)
  navigateTo({name: 'view-exam', params: { id: currentExam.value.id }})
}

function deleteExam(item) {
  editedIndex.value = exams.value.indexOf(item)
  currentExam.value = Object.assign({}, item)
  dialog.value = true;
}

async function destroy () {
  try {
    const response = await ExamService.delete(currentExam.value.id);
    exams.value.splice(editedIndex.value, 1)
    dialog.value = false;
    snackbar.value = true;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function theExams() {
  if (Object.keys(exams.value).length > 0) {
    return exams.value;
  }
  return [];
}

onMounted(() => {
  getExams();
});

</script>

<template>
  <v-locale-provider rtl>
    
    <!-- <v-card
    class="mx-auto"
    max-width="800"
    >
    <v-toolbar color="purple">
      <v-toolbar-title>Exams List</v-toolbar-title>
    </v-toolbar>
      <div class="d-flex flex-column">
        <div class="mx-4 my-4">
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
    </v-card> -->

    <v-data-table
      :headers="headers"
      :items="theExams()"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>اختباراتك</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="600px"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                class="mb-2 purple mr-2"
                color  = "white"
                v-bind="props"
                @click="navigateTo({ name: 'teacher-questions', params: { subject: route.params.subject }})"
              >
                اسئلتي
              </v-btn>
              <v-btn
                class="mb-2 success-green mr-2"
                color  = "white"
                v-bind="props"
                @click="navigateTo({name: 'exam-create', params: { subject: route.params.subject }})"
              >
                اضافة اختبار
              </v-btn>

              <v-btn
                class="mb-2 light-red mr-2"
                color  = "white"
                v-bind="props"
                @click="navigateTo({ name: 'teacher-student', params: { subject: route.params.subject }})"
              >
                طلابي
              </v-btn>

              <v-btn
                class="mb-2 primary mr-2"
                color  = "white"
                @click="router.go(-1)"
              >
                العودة
              </v-btn>
              
            </template>
            
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="me-2"
          size="small"
          @click="goTo(item)"
        >
          mdi-eye-arrow-right
        </v-icon>
        <v-icon
          size="small"
          @click="deleteExam(item)"
          color="red"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-alert-circle"
        text="هل تريد حذف هذا الإختبار؟"
        title="تأكيد">
        <template v-slot:actions>
          <v-btn color="red" @click="destroy()">نعم</v-btn>
          <v-btn color="primary" @click="dialog = false">العودة</v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      color="success"
      variant="outlined"
    >
    <template v-slot:actions />
      تم حذف المادة بنجاح
    </v-snackbar>

    </v-locale-provider>
</template>

<style scoped>

.list-item {
  transition: 0.5s;
}

.list-item:hover{
  background-color: bisque;
}

.purple {
  background-color: RGB(128, 0, 128);
}

.primary {
  background-color: RGB(24,103,192);
}

.light-red {
  background-color: rgb(192, 38, 38)
}

.success-green {
  background-color: rgb(24, 103, 24)
}

</style>
