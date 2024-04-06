<script setup>

import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import TeacherService from '@/services/TeacherService'
import { useUserStore } from "@/stores/user";

const user = useUserStore(); 
const router = useRouter()
const route = useRoute();
const students = ref();
const dialog = ref(false);
const currentStudent = ref();
const error = ref(null);

function navigateTo (path) {
  router.push(path);
}

async function getStudnets() {
  try {
    const response = await TeacherService.getTeacherStudent(route.params.subject, user.user.id);
    students.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function removeStudentConfrimation(student) {
  currentStudent.value = student;
  dialog.value = true;
}

async function removeStudent () {
  try {
    const response = await TeacherService.removeStudent({
      courseId: route.params.subject,
      studentId: currentStudent.value.id,
      teacherId: user.user.id
    });
    getStudnets();
    dialog.value = false;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function goBack() {
  router.go(-1);  
}

onMounted(() => {
  getStudnets();
});

</script>

<template>

<div>
  <v-locale-provider rtl>
    <v-card
      class="mx-auto mt-10"
      max-height="100vh"
    >
      <v-toolbar>
        <v-toolbar-title>طلابي</v-toolbar-title>
        <div class="d-flex mx-4 my-4">
          <v-btn color="white" class="pink-darken" @click="navigateTo({ name: 'teacher-add-student', params: { subject: route.params.subject } })">إضافة طلبة</v-btn>
          <v-btn color="white" class="mx-4 primary" @click="goBack()">العودة</v-btn>
        </div>
      </v-toolbar>
      <v-table
        fixed-header
        height="100%"
        density="comfortable"
      >
        <thead>
          <tr>
            <th class="text-right">
              إسم الطالب
            </th>
            <th class="text-right">
              إسم المستخدم
            </th>
            <th class="text-right">
              رقم
            </th>
            <th class="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="student in students"
            :key="student.id"
            style="height: 50px;"
          >
            <td>{{ student.name }}</td>
            <td>{{ student.username }}</td>
            <td>{{ student.id }}</td>
            <td>
              <div class="d-flex">
                <div class="mx-auto">
                  <v-icon
                    size="small"
                    color="red"
                    @click="removeStudentConfrimation(student)"
                  >
                    mdi-delete
                  </v-icon>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-alert-circle"
        text="هل تريد حذف هذا الطالب من المادة الحالية؟"
        title="تأكيد">
        <template v-slot:actions>
          <v-btn color="red" @click="removeStudent()">نعم</v-btn>
          <v-btn color="primary" @click="dialog = false">العودة</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-locale-provider>
</div>
</template>

<style scoped>
  .error {
    color: red;
  }

  .pink-darken {
    background-color: rgb(194,24,91)
  }

  .primary {
    background-color: RGB(24,103,192);
  }
</style>
