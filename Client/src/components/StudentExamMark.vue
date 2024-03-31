<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ExamStudentService from '@/services/ExamStudentService'

const router = useRouter();
const route = useRoute();
const studentExams = ref([]);
async function index() {
  try {
    const response = await ExamStudentService.getStudents(route.params.id);
    studentExams.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function storeToExcel() {
  try {
    const response = await ExamStudentService.storeToExcel(route.params.id);
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  index();
});

</script>

<template>
  <v-locale-provider rtl>
    <v-data-table
          fixed-header
          height="100%"
        >
          <template v-slot:top> 
            <v-toolbar
              flat
            >
              <v-toolbar-title>اختباراتك</v-toolbar-title>
              <v-btn color="white" class="success-green" @click="storeToExcel()">طباعة إلى excel</v-btn>
            </v-toolbar>
          </template>

          <thead>
            <tr>
              <th class="text-right">
                رقم
              </th>
              <th class="text-right">
                إسم الطالب
              </th>
              <th class="text-right">
                الدرجة
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(studentExam, index) in studentExams"
              :key="index"
              style="height: 50px;"
            >
              <td>
                {{ index + 1 }}
              </td>
              <td>
                {{ studentExam.student.name }}
              </td>
              <td>
                {{ studentExam.score }}
              </td>
            </tr>
          </tbody>
        </v-data-table>
  </v-locale-provider>

</template>

<style scoped>
.no-select {
  pointer-events: none;
}

.success-green {
  background-color: rgb(24, 103, 24)
}

</style>