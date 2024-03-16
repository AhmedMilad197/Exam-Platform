<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SubjectService from '@/services/SubjectService'
import { useUserStore } from '@/stores/user';

const user = useUserStore()

const router = useRouter()

function navigateTo (subject) {
  router.push({
    path: `/${subject}/exam-list`,
  });
}

const colors = [
  "primary",
  "secondary", 
  "indigo", 
  "red", 
  "pink", 
  "purple", 
  "cyan-accent-2",
  "orange-darken-3"
];

function getColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const subjects = ref();

// TODO make this function get only the subjects related to the teacher.
async function getSubjects () {
  try {
    const response = await SubjectService.index(user)
    subjects.value = response.data.courses;
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
    <v-layout column>
      <v-sheet width="800px" class="mx-auto">
        <v-toolbar color="purple">
          <v-toolbar-title>
            المواد
          </v-toolbar-title>
        </v-toolbar>
          <div v-for="(subject, i) in subjects" :key="i">
            <div class="d-flex">
              <div>
                <v-list>
                  <v-list-item
                    class="mx-4"
                  >
                    <v-list-item-title
                      class="my-2"
                    >
                      <b>
                        {{ subject.name }}
                      </b>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex">
                <v-btn 
                color="primary" 
                class="my-auto mx-4"
                @click="navigateTo(subject.id)"
                >تفاصيل</v-btn>
              </div>
            </div>
            <hr>
          </div>
      </v-sheet>
    </v-layout>
  </v-locale-provider>
</template>

<style scoped>
.v-sheet {
  border: 1px rgb(185, 175, 175) solid;
  border-radius: 2px;
}
</style>
