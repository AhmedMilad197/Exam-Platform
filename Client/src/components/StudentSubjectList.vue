<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/stores/user";
import StudentService from "@/services/StudentService";
import imgUrl from '../assets/books.jpg'

const user = useUserStore(); 
const router = useRouter();
const route = useRoute();
const subjects = ref();
function navigateTo (path) {
  router.push(path);
}

async function getSubjects() {
  try {
    const response = await StudentService.getSubjects({
      studentId: user.user.id,
    });
    subjects.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getSubjects();
});

</script>

<template>
  <v-locale-provider rtl>

    <div class="mx-auto">
      <img :src="imgUrl" alt="Logo" style="width: 1400px; height: 450px;">
    </div>
    
    <!-- max-width="800" -->
    <v-card
    class="mx-auto"
    >
    <v-toolbar>
      <v-toolbar-title>المواد</v-toolbar-title>
    </v-toolbar>
      <v-table
          fixed-header
          height="100%"
          density="comfortable"
        >
        <thead>
          <tr>
            <th class="text-right">
              المواد
            </th>
            <th class="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
              v-for="subject in subjects"
              :key="subject.id"
              style="height: 50px;"
            >
              <td>{{ subject.name }}</td>
              <td>
                <div class="d-flex">
                  <div class="mx-auto">
                    <div class="d-flex">
                      <v-btn 
                      color="primary" 
                      class="my-auto mx-4"
                      @click="navigateTo({ name: 'student-exam-list', params: { id: subject.id }});"
                      >الدخول</v-btn>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
        </tbody>
      </v-table>
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
