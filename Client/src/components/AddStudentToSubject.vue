<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'
import StudyService from '@/services/StudyService'
import { useUserStore } from "@/stores/user";

const user = useUserStore(); 
const router = useRouter()
const route = useRoute();
const students = ref();

/*
 * required APIs:
 * api for all the subjects.
 * api for all the questions nested in the subjects.
 */

function navigateTo (path) {
  router.push(path);
}

async function index () {
  try {
    const response = await StudentService.availableStudents(route.params.subject);
    students.value = response.data;
    console.log(response.data)
  } catch (error) {
    return {
      message: error.message
    }
  }
}

const selectedStudents = [];

function updateSelectedItems(event, id) {
  if (event.target.checked) {
    selectedStudents.push(id);
  } else {
    var index = selectedStudents.indexOf(id);
    if (index !== -1) {
      selectedStudents.splice(index, 1);
    }
  }
}

async function addStudent() {
  try {
    const response = await StudyService.create({
      teacherId: user.user.id,
      courseId: route.params.subject,
      students: selectedStudents
    });
    router.go(-1);
  } catch (error) {

  }
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
        >
        <v-toolbar>
          <v-toolbar-title>الطلبة</v-toolbar-title>
          <div class="d-flex">
            <v-btn color="white" class="mx-4 my-4 success-green" @click="addStudent()">إضافة</v-btn>
            <v-btn color="white" class="ml-4 my-4 primary" @click="router.go(-1)">العودة</v-btn>
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
                id
              </th>
              <!-- <th class="text-right">
                Actions
              </th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in students"
              :key="student.id"
              style="height: 50px;"
            >
              <td>
                <v-checkbox class="custom-checkbox" :label=student.name @click="updateSelectedItems($event, student.id)" />
              </td>
              <td>
                {{ student.username }}
              </td>
              <td>
                {{ student.id }}
              </td>
              <!-- <td>
                <div class="d-flex">
                  <div>
                    <v-btn color="indigo-darken-3" @click="navigateTo({name: 'student', params: {id: student.id}})">VIEW</v-btn>
                  </div>
                </div>
              </td> -->
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </div>
  </v-locale-provider>
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
.firstname-text {
  width: 90;
}

.success-green {
  background-color: rgb(24, 103, 24)
}

.primary {
  background-color: rgb(24,103,192);
}

</style>
