<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/stores/user";
import StudentService from "@/services/StudentService";

const user = useUserStore(); 
const router = useRouter();
const route = useRoute();
const exams = ref();
const enableExams = ref();
function navigateTo (path) {
  router.push(path);
}

function triggerAtBeginningOfNextMinute() {
  const currentTime = new Date();
  const secondsRemaining = 60 - currentTime.getSeconds();
  const millisecondsRemaining = secondsRemaining * 1000;
  
  setTimeout(() => {
    checkTime();
    setInterval(checkTime, 60000); // Trigger every minute thereafter
  }, millisecondsRemaining);
}

function initEnableExams(length) {
  let temp_array = []
  while(length--) temp_array.push(true);
  enableExams.value = temp_array;
}

async function getExams() {
  try {
    const response = await StudentService.getExams({
      studentId: user.user.id,
      courseId: route.params.id
    });
    exams.value = response.data;
    initEnableExams(response.data.length);
    checkTime()
    triggerAtBeginningOfNextMinute()
  } catch (error) {
    return {
      message: error.message
    }
  }
}

const checkTime = () => {
  let currentTime = new Date();
  currentTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
  currentTime = currentTime.toISOString()
  exams.value.forEach(async (exam, index) => {
    const start_time = exam.start_time;
    const end_time = exam.end_time;
    if (currentTime >= start_time && currentTime <= end_time) {
      enableExams.value[index] = false
    } else {
      enableExams.value[index] = true
    }
  });
};

onMounted(() => {
  getExams();
});

</script>

<template>
  <v-locale-provider rtl>
    
    <v-card
    class="mx-auto"
    max-width="800"
    >
    <v-toolbar>
      <v-toolbar-title>اختبارات</v-toolbar-title>
      <v-btn color="white" class="primary" @click="router.go(-1)">العودة</v-btn>
    </v-toolbar>
      <!-- <div class="d-flex flex-column">
        <div v-for="(exam, index) in exams" :key="index">
          
            <div class="d-flex">
              <div>
                <v-list>
                  <v-list-item
                    class="mx-4"
                  >
                    <v-list-item-title
                      class="my-2"
                    >
                      {{ exam.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ exam.description }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex">
                <v-btn 
                color="primary" 
                class="my-auto mx-4"
                @click="navigateTo({name: 'exam', params: { exam: exam.id }})"
                :disabled="enableExams[index]"
                >إبدأ الإختبار</v-btn>
              </div>
            </div>

        </div>
      </div> -->

      <v-table
          fixed-header
          height="100%"
          density="comfortable"
        >
        <thead>
          <tr>
            <th class="text-right">
              الإختبارات
            </th>
            <th class="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
              v-for="(exam, index) in exams" :key="index"
              style="height: 50px;"
            >
              <td>{{ exam.name }}</td>
              <td>
                <div class="d-flex">
                  <div class="mx-auto">
                    <div class="d-flex">
                      <v-btn 
                      color="purple" 
                      class="my-auto mx-4"
                      @click="navigateTo({name: 'exam', params: { exam: exam.id }})"
                      :disabled="enableExams[index]"
                      >إبدأ الإختبار</v-btn>
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

.primary {
  background-color: RGB(24,103,192);
}

</style>
