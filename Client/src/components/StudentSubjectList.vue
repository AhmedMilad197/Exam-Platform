<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/stores/user";
import StudentService from "@/services/StudentService";

const user = useUserStore(); 
const router = useRouter();
const route = useRoute();
const Subjects = ref();
function navigateTo (path) {
  router.push(path);
}

async function getSubjects() {
  try {
    const response = await StudentService.getSubjects({
      studentId: user.user.id,
    });
    Subjects.value = response.data;
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
    
    <v-card
    class="mx-auto"
    max-width="800"
    >
    <v-toolbar color="purple">
      <v-toolbar-title>المواد</v-toolbar-title>
    </v-toolbar>
      <div class="d-flex flex-column">
        <div v-for="(subject, index) in Subjects" :key="index">
          
          <div class="d-flex">
            <div>
              <v-list>
                <v-list-item
                  class="mx-4"
                >
                  <v-list-item-title
                    class="my-2"
                  >
                    {{ subject.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex">
              <v-btn 
              color="primary" 
              class="my-auto mx-4"
              @click="navigateTo({ name: 'student-exam-list', params: { id: subject.id }});"
              >عرض الإختبارات</v-btn>
            </div>
          </div>
          <hr>
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
