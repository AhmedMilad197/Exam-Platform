<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from 'vue-router'
import ExamService from "@/services/ExamService"

const route = useRoute();
const router = useRouter();
const user = useUserStore();
const exam = ref([]);

async function getExam() {
  try {
    const response = await ExamService.getExam({
      examId: route.params.id,
      studentId: user.user.id
    })
    exam.value = response.data
    console.log(exam.value)
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getExam()
});

</script>

<template>
  <v-locale-provider rtl>
    <v-card
    class="mx-auto mt-10"
    max-width="800"
    >
    <div class="px-4 py-4" style="background-color: #F5F5DC;">
      ملاحظات
      <ol class="mx-4">
        <li>
          إجابتك تعرض باللون الأزرق.
        </li>
        <li>
          في حال عدم مطابقة إجابتك بالإجابة الصحيحة تعرض الإجابة الصحيحة باللون الأخضر.
        </li>
      </ol>
    </div>

      <v-toolbar rtl>
            <v-toolbar-title class="mx-5">اسئلة</v-toolbar-title>
      </v-toolbar>

      <div v-for="(question, index) in exam.questions" :key="question.id">

        <v-list lines="three" select-strategy="classic">
          <div class="question-content">
            {{ index + 1 }}. {{ question.content }}
          </div> <hr>
          <span style="font-size: 20px; padding: 10px;">
              الإختيارات
          </span>
          <v-list>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`90%`">
                <v-text-field
                  label="Choice 1"
                  v-model="question.answer1"
                  hint="Insert Choice 1 please."
                  class="no-select"
                  persistent-hint
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                  class="mx-4 no-select"
                  :color="(question.rightanswer == 1) ? (question.rightanswer == question.studentexamhistory[0].student_answer) ? 'primary' : 'success' : 'primary'"
                  :model-value="((question.rightanswer == 1 || question.studentexamhistory[0].student_answer == 1) ? true: false)"
                  />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`90%`">
                <v-text-field
                  label="Choice 2"
                  v-model="question.answer2"
                  hint="Insert Choice 2 please."
                  class="no-select"
                  persistent-hint
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4 no-select" 
                :color="(question.rightanswer == 2) ? (question.rightanswer == question.studentexamhistory[0].student_answer) ? 'primary' : 'success' : 'primary'"
                :model-value="((question.rightanswer == 2 || question.studentexamhistory[0].student_answer == 2) ? true: false)"
                />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`90%`">
                <v-text-field
                  label="Choice 3"
                  v-model="question.answer3"
                  hint="Insert Choice 3 please."
                  class="no-select"
                  persistent-hint
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4 no-select" 
                :color="(question.rightanswer == 3) ? (question.rightanswer == question.studentexamhistory[0].student_answer) ? 'primary' : 'success' : 'primary'"
                :model-value="((question.rightanswer == 3 || question.studentexamhistory[0].student_answer == 3) ? true: false)"
                />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`90%`">
                <v-text-field
                  label="Choice 4"
                  v-model="question.answer4"
                  hint="Insert Choice 4 please."
                  class="no-select"
                  persistent-hint
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4 no-select" 
                :color="(question.rightanswer == 4) ? (question.rightanswer == question.studentexamhistory[0].student_answer) ? 'primary' : 'success' : 'primary'"
                :model-value="((question.rightanswer == 4 || question.studentexamhistory[0].student_answer == 4) ? true: false)"
                />
            </div>
          </v-list>
        </v-list>
      </div>
    
      <div class="d-flex flex-row">
        <v-btn color="primary" class="mx-auto my-4" @click="router.go(-1)">العودة</v-btn>
      </div>
    
    </v-card>
  </v-locale-provider>
</template>

<style scoped>
.question-content {
  font-size: 25px;
  background-color: #f7f7f7;
  padding: 20px;
}

.no-select {
  pointer-events: none;
}

</style>
