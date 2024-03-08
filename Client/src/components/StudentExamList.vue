<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref, onMounted} from 'vue'
import { useUserStore } from "@/stores/user";
import StudentService from "@/services/StudentService"

const user = useUserStore(); 
const router = useRouter()
const route = useRoute();
const exams = ref();

function navigateTo (path) {
  router.push(path);
}

async function getExams() {
  try {
    const response = await StudentService.getExams({
      studentId: user.user.id,
    });
    exams.value = response.data;
    console.log(response.data)
  } catch (error) {
    return {
      message: error.message
    }
  }
}

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
    <v-toolbar color="purple">
      <v-toolbar-title>اختبارات</v-toolbar-title>
    </v-toolbar>
      <div class="d-flex flex-column">
        <div v-for="exam in exams" :key="exam.id">
          <v-card
            class="mx-auto"
            max-width="100%"
            link
            onclick=""
          >
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
          </v-card>
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
