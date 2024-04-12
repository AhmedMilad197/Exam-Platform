<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useUserStore } from "@/stores/user"
import QuestionService from '@/services/QuestionService'

const router = useRouter()
const route = useRoute();
const user = useUserStore();
const currentQuestion = ref();
const addQuestionDialog = ref(false);
const editQuestionDialog = ref(false);
const deleteQuestionDialog = ref(false);
const questionId = ref();
const question = ref();
const answer1 = ref();
const answer2 = ref();
const answer3 = ref();
const answer4 = ref();
const mark = ref()
const rightAnswer = ref();
const questions = ref();
const items = ref([
  {
    title: 'موادي',
    value: {
      name: 'home'
    }
  },
  {
    title: 'أسئلتي',
    value: {
      name: 'teacher-questions',
      params: { subject: route.params.subject }
    }
  },
  {
    title: 'إختباراتي',
    value: {
      name: 'exam-list',
      params: { subject: route.params.subject }
    }
  },
  {
    title: 'طلابي',
    value: {
      name: 'teacher-student',
      params: { subject: route.params.subject }
    }
  },
  {
    title: 'تسجيل الخروج',
    color: 'red',
    value: {
      name: 'student-login'
    }
  }
]);
const drawer = ref(false);
const logoutDialog = ref(false);

function handleRequest(title, value) {
  if (title == 'تسجيل الخروج') {
    logoutDialog.value = true;
  } else {
    navigateTo(value)
  }
}

function deleteStoredUser() {
  user.user = null;
  user.token = null;
  user.role = null;
}

async function logout() {
  deleteStoredUser();
  logoutDialog.value = false;
  navigateTo({
    name: 'LandingPageView'
  })
}

function navigateTo(path) {
  router.push(path);
}

async function getTeacherQuestions() {
  const response = await QuestionService.getTeacherQuestions({
    teacherId: user.user.id,
    courseId: route.params.subject
  });
  questions.value = response.data;
}

function deletQuestionConfirmation (question) {
  currentQuestion.value = question;
  deleteQuestionDialog.value = true;
}

async function destroy() {
  try {
    const response = await QuestionService.delete(currentQuestion.value.id);
    getTeacherQuestions();
    deleteQuestionDialog.value = false;
  } catch(error) {
    return {
      message: error.message
    }
  }
}

function setAnswer (event, id) {
  if (event.target.checked) {
    rightAnswer.value = id;
  }
}

async function addQuestion() {
  try {
    await QuestionService.create({
      courseid: route.params.subject,
      teacherid: user.user.id,
      content: question.value,
      answer1: answer1.value,
      answer2: answer2.value,
      answer3: answer3.value,
      answer4: answer4.value,
      rightanswer: rightAnswer.value,
      mark: mark.value
    });
    getTeacherQuestions();
    refreshOptions();
    addQuestionDialog.value = false;
  } catch (error) {
    return error.message;
  }
}

function editQuestion(currentQuestion) {
  questionId.value = currentQuestion.id;
  question.value = currentQuestion.content;
  answer1.value = currentQuestion.answer1;
  answer2.value = currentQuestion.answer2;
  answer3.value = currentQuestion.answer3;
  answer4.value = currentQuestion.answer4;
  mark.value = currentQuestion.mark;
  rightAnswer.value = currentQuestion.rightanswer;
  editQuestionDialog.value = true
}

async function update () {
  try {
    const response = await QuestionService.update({
    question_id: questionId.value,
    question_content: {
      content: question.value,
      answer1: answer1.value,
      answer2: answer2.value,
      answer3: answer3.value,
      answer4: answer4.value,
      mark: mark.value,
      rightanswer: rightAnswer.value
    }
  });
  getTeacherQuestions();
  refreshOptions();
  editQuestionDialog.value = false
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
  getTeacherQuestions();
});

function refreshOptions() {
  question.value = '';
  answer1.value = '';
  answer2.value = '';
  answer3.value = '';
  answer4.value = '';
  mark.value = '';
  rightAnswer.value = 5;
}

function closeAddQuestionDialog () {
  refreshOptions();
  addQuestionDialog.value = false;
}

function closeEditQuestionDialog () {
  refreshOptions();
  editQuestionDialog.value = false;
}

</script>

<template>
  <v-locale-provider rtl>

    <v-layout class="mt-16">
      <v-locale-provider rtl>
        <v-app-bar
          color="primary"
          prominent
          height="100"
        >
          <v-app-bar-nav-icon 
            @click.stop="drawer = !drawer"
          />
          <v-toolbar-title>
            <span class="title-text" @click="navigateTo({ name: 'LandingPageView' })">
              Exam Platform
            </span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
      </v-locale-provider>

      <v-navigation-drawer
        v-model="drawer"
        location="right"
      >
        <v-list density="compact">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item.value"
            style="text-align: right;"
            @click="handleRequest(item.title, item.value)"
          >
            <div v-if="item.title == 'تسجيل الخروج'">
              <v-list-item-title 
                style="color: red;"
                >
                {{ item.title }}
              </v-list-item-title>
            </div>
            <div v-else>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>

    <div>
        <v-card
          class="mx-auto mt-10"
          max-height="100vh"
        >
        <v-toolbar>
          <v-toolbar-title>أسئلتي</v-toolbar-title>
          <!-- <v-btn color="white" class="mx-4 my-4 dark-cyan" @click="navigateTo({ name: 'add-question', params: {subject: route.params.subject} })">إضافة سؤال</v-btn> -->
          <v-btn color="white" class="mx-4 my-4 dark-cyan" @click="addQuestionDialog = true">إضافة سؤال</v-btn>
          <v-btn color="white" class="primary" @click="goBack()">العودة</v-btn>
        </v-toolbar>
        <v-table
          fixed-header
          height="100%"
          density="comfortable"
        >
        <thead>
          <tr>
            <th class="text-right">
              السؤال
            </th>
            <th class="text-right">
              id
            </th>
            <th class="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
              v-for="question in questions"
              :key="question.id"
              style="height: 50px;"
            >
              <td>{{ question.content }}</td>
              <td>{{ question.id }}</td>
              <td>
                <div class="d-flex">
                  <div class="mx-auto">
                    <v-icon
                      class="me-2"
                      size="small"
                      @click="editQuestion(question)"
                    >
                      mdi-eye-arrow-right
                    </v-icon>
                    <v-icon
                      size="small"
                      color="red"
                      @click="deletQuestionConfirmation(question)"
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
    </div>
    <v-dialog v-model="deleteQuestionDialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-alert-circle"
        text="هل تريد حذف هذا سؤال؟"
        title="تأكيد">
        <template v-slot:actions>
          <v-btn color="red" @click="destroy()">نعم</v-btn>
          <v-btn color="primary" @click="deleteQuestionDialog = false">العودة</v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog 
      v-model="editQuestionDialog" 
      width="auto"
      persistent
    >
      <v-layout column>
        <v-sheet width="600px" class="mx-auto">
          <v-toolbar>
            <v-toolbar-title>
              تعديل السؤال
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" class="mx-4 success-green" @click="update()">تعديل</v-btn>
            <v-btn color="white" class="primary" @click="closeEditQuestionDialog()">إغلاق</v-btn>
          </v-toolbar>
          <v-form @submit.prevent class="mt-4">
            <div class="mx-4">
              <span class="text-h5">
                السؤال
              </span>
            </div>
            <v-text-field
              label="السؤال"
              class="ml-2 mr-2"
              v-model="question"
              hint="عدل السؤال إذا أردت"
              :rules="[v => !!v || 'يجب إدخال نص السؤال']"
              persistent-hint
            ></v-text-field>
            <v-text-field
              label="الدرجة"
              class="ml-2 mr-2"
              type="number"
              v-model="mark"
              hint="عدل في درجة السؤال إذا أردت"
              :rules="[v => !!v || 'يجب إدخال الدرجة']"
              persistent-hint
            ></v-text-field>
            <div class="error ml-2" />
            <div class="mx-4">
              <span class="text-h5">
                الإختيارات
              </span>
            </div>
            <v-list class="mx-4">
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`500px`">
                <v-text-field
                  label="الإختيار الأول"
                  hint="عدل الإختيار الأول"
                  :rules="[v => !!v || 'يجب إدخال الإختيار الأول']"
                  persistent-hint
                  v-model="answer1"
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4" 
                color="success" 
                :model-value="(rightAnswer == 1 ? true: false)"
                @click="setAnswer($event, 1)" 
                />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`500px`">
                <v-text-field
                  label="الإختيار الثاني"
                  hint="عدل الإختيار الثاني"
                  :rules="[v => !!v || 'يجب إدخال الإختيار الثاني']"
                  persistent-hint
                  v-model="answer2"
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4" 
                color="success" 
                :model-value="(rightAnswer == 2 ? true: false)"
                @click="setAnswer($event, 2)"
                />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`500px`">
                <v-text-field
                  label="الإختيار الثالث"
                  hint="عدل الإختيار الثالث"
                  :rules="[v => !!v || 'يجب إدخال الإختيار الثالث']"
                  persistent-hint
                  v-model="answer3"
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4" 
                color="success" 
                :model-value="(rightAnswer == 3 ? true: false)"
                @click="setAnswer($event, 3)"
                />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`500px`">
                <v-text-field
                  label="الإختيار الرابع"
                  hint="عدل الإختيار الرابع"
                  :rules="[v => !!v || 'يجب إدخال الإختيار الرابع']"
                  persistent-hint
                  v-model="answer4"
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4" 
                color="success" 
                :model-value="(rightAnswer == 4 ? true: false)"
                @click="setAnswer($event, 4)"
                />
            </div>
          </v-list>
          </v-form>
        </v-sheet>
      </v-layout>  
    </v-dialog>


    <v-dialog 
      v-model="addQuestionDialog" 
      width="auto"
      scrollable
      persistent
    >
      <v-layout column>
        <v-sheet width="600px" class="mx-auto">
          <v-toolbar>
            <v-toolbar-title>
              إضافة السؤال
            </v-toolbar-title>
            <v-btn color="white" class="mx-4 success-green" @click="addQuestion()">إضافة</v-btn>
            <v-btn color="white" class="primary" @click="closeAddQuestionDialog()">إغلاق</v-btn>
          </v-toolbar>
          <v-form @submit.prevent class="mt-4">
            <div class="mx-4">
              <span class="text-h5">
                السؤال
              </span>
            </div>
            <v-text-field
              label="السؤال"
              class="ml-2 mr-2"
              v-model="question"
              hint="أضف السؤال"
              :rules="[v => !!v || 'يجب إدخال نص السؤال']"
              persistent-hint
            ></v-text-field>
            <v-text-field
              label="الدرجة"
              class="ml-2 mr-2"
              v-model="mark"
              type="number"
              hint="أضف درجة السؤال"
              :rules="[v => !!v || 'يجب إدخال درجة السؤال']"
              persistent-hint
            ></v-text-field>
            <div class="error ml-2" />
            <div class="mx-4">
              <span class="text-h5">
                الإختيارات
              </span>
            </div>
            <v-list class="mx-4">
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`500px`">
                <v-text-field
                  label="الإختيار الأول"
                  hint="الإختيار الأول"
                  :rules="[v => !!v || 'يجب إدخال الإختيار الأول']"
                  persistent-hint
                  v-model="answer1"
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4" 
                color="success" 
                :model-value="(rightAnswer == 1 ? true: false)"
                @click="setAnswer($event, 1)" 
                />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`500px`">
                <v-text-field
                  label="الإختيار الثاني"
                  hint="الإختيار الثاني"
                  :rules="[v => !!v || 'يجب إدخال الإختيار الثاني']"
                  persistent-hint
                  v-model="answer2"
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4" 
                color="success" 
                :model-value="(rightAnswer == 2 ? true: false)"
                @click="setAnswer($event, 2)"
                />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`500px`">
                <v-text-field
                  label="الإختيار الثالث"
                  hint="الإختيار الثالث"
                  :rules="[v => !!v || 'يجب إدخال الإختيار الثالث']"
                  persistent-hint
                  v-model="answer3"
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4" 
                color="success" 
                :model-value="(rightAnswer == 3 ? true: false)"
                @click="setAnswer($event, 3)"
                />
            </div>
            <div class="d-flex mx-2 my-2">
              <v-responsive :width="`500px`">
                <v-text-field
                  label="الإختيار الرابع"
                  hint="الإختيار الرابع"
                  :rules="[v => !!v || 'يجب إدخال الإختيار الرابع']"
                  persistent-hint
                  v-model="answer4"
                ></v-text-field>
              </v-responsive>
                <v-checkbox-btn 
                class="mx-4" 
                color="success" 
                :model-value="(rightAnswer == 4 ? true: false)"
                @click="setAnswer($event, 4)"
                />
            </div>
          </v-list>
            <!-- <v-col class="text-center" cols="12">
              <v-btn color="green-darken-2" class="mx-4" @click="addQuestion()">إضافة</v-btn>
              <v-btn color="primary" @click="addQuestionDialog = false">إغلاق</v-btn>
            </v-col> -->
          </v-form>
        </v-sheet>
      </v-layout>  
    </v-dialog>
    <v-dialog v-model="logoutDialog" max-width="500px">
      <v-card 
        prepend-icon="mdi-alert-circle"
        text="هل تريد تسجيل الخروج؟"
        title="تأكيد"
        color="orange"
      >
        <v-card>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" class="mx-2 my-4" @click="logout()">نعم</v-btn>
          <v-btn color="blue-darken-1" @click="logoutDialog = false">إلغاء</v-btn>
          <v-spacer></v-spacer>
        </v-card>
      </v-card>
    </v-dialog>
  </v-locale-provider>
</template>

<style scoped>

.list-item {
  transition: 0.5s;
}

.list-item:hover{
  background-color: bisque;
}

.dark-cyan{
  background-color: rgb(38,50,56);
}

.primary{
  background-color: rgb(24,103,192);
}

.success-green {
  background-color: rgb(24, 103, 24)
}

.title-text {
  cursor: pointer;
  font-size: 40px;
}

</style>
