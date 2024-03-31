<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TeacherService from '@/services/TeacherService'
import SubjectService from '@/services/SubjectService'

const router = useRouter();
const route = useRoute();
const teachers = ref();
const teacherDetailsDialog = ref(false);
const currentTeacher = ref({
  id: 0,
  name: '',
  username: '',
  email: '',
  lastlogin: '',
})
const selectedItems = [];
const teacherIndex = ref(-1)

function navigateTo (route) {
  router.push(route);
}

async function index() {
  try {
    const response = await TeacherService.availableTeachers({
      courseId: route.params.course
    });
    teachers.value = response.data;
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

async function addTeacher() {
  try {
    const response = await SubjectService.addTeachers({
      courseId: route.params.course,
      teachers: selectedItems
    });
    index();
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function teacherDetails(teacher) {
  currentTeacher.value = teacher;
  teacherDetailsDialog.value = true
}

onMounted(() => {
  index();
});

</script>

<template>
  <v-locale-provider rtl>

    <div>
      <v-card
        class="mx-auto"
        max-width="1000"
        max-height="100vh"
        >
        <v-toolbar>
          <v-toolbar-title>Teacher List</v-toolbar-title>
          <div class="d-flex">
            <v-spacer/>
            <v-btn color="white" class="my-4 success-green" @click="addTeacher()">إضافة أستاذ</v-btn>
            <v-btn color="white" class="my-4 mx-4 primary" @click="router.go(-1)">العودة</v-btn>
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
                Teacher
              </th>
              <th class="text-right">
                ID
              </th>
              <th class="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="teacher in teachers"
              :key="teacher.id"
            >
              <td>
                <v-checkbox class="custom-checkbox custom-height custom-opacity" :label=teacher.name @click="updateSelectedItems($event, teacher.id)" />
              </td>
              <td>{{ teacher.id }}</td>
              <td>
                <div class="d-flex">
                  <div class="mx-auto">
                    <v-icon
                      class="me-2"
                      size="small"
                      color="blue"
                      @click="teacherDetails(teacher)"
                    >
                      mdi-eye
                    </v-icon>
                    <!-- <v-btn color="yellow" class="mr-4" @click="navigateTo({name: 'teacher', params: {id: teacher.id}})">VIEW</v-btn> -->
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <v-dialog v-model="teacherDetailsDialog" max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5"> بيانات الأستاذ </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field v-model="currentTeacher.name" class="no-select" label="إسم المدرس"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field v-model="currentTeacher.username" class="no-select" label="username"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field v-model="currentTeacher.password" class="no-select" label="الرمز السري"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field v-model="currentTeacher.lastlogin" class="no-select" label="اخر ضهور"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card>
                <div class="d-flex">
                  <v-btn color="primary" @click="close" class="mx-auto my-4">
                    العودة
                  </v-btn>
                </div>
              </v-card>
            </v-card>
          </v-dialog>


    </div>
  </v-locale-provider>

</template>

<style scoped>
.primary {
  background-color: RGB(24,103,192);
}

.success-green {
  background-color: rgb(24, 103, 24)
}

.no-select {
  pointer-events: none;
}

.custom-checkbox /deep/ .v-input__details {
  display: none;
}

.custom-height /deep/ .v-selection-control {
  min-height: 0 !important;
}

.custom-opacity /deep/ .v-label {
  opacity: 1;
}

</style>