<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SubjectService from '@/services/SubjectService'

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
    const response = await SubjectService.index()
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
  <v-layout column>
    <v-sheet width="800px" class="mx-auto">
      <v-toolbar color="primary">
        <v-toolbar-title>
          Subjects
        </v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-row align="center" justify="center">
          <v-col
            v-for="(subject, i) in subjects"
            :key="i"
            cols="auto"
          >
            <v-card
              class="mx-auto"
              max-width="344"
              :color="getColor()"
            >
              <v-card-item>
                <div>
                  <div class="text-overline mb-1">
                    Subject
                  </div>
                  <div class="text-h6 mb-1">
                    {{ subject.name }}
                  </div>
                  <div class="text-caption">See the exams related to {{ subject.name  }}</div>
                </div>
              </v-card-item>

              <v-card-actions>
                <v-btn @click="navigateTo(subject.id)">
                  Enter
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>  
    </v-sheet>
  </v-layout>
</template>

<style scoped>
.v-sheet {
  border: 1px rgb(185, 175, 175) solid;
  border-radius: 2px;
}
</style>
