<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, nextTick } from 'vue'
import { useUserStore } from "@/stores/user"
import QuestionService from '@/services/QuestionService'

const router = useRouter();
const route = useRoute();
const user = useUserStore();
const addQuestionDialog = ref(false);
const editQuestionDialog = ref(false);
const deleteQuestionDialog = ref(false);
const questions = ref();
const error = ref();
const snackbar = ref(false);
const editSnackbar = ref(false);
const deleteSnackbar = ref(false);

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
  console.log(path)
  router.push(path);
}

async function getTeacherQuestions() {
  const response = await QuestionService.getTeacherQuestions({
    teacherId: user.user.id,
    courseId: route.params.subject
  });
  questions.value = response.data;
}

async function destroy(questionId) {
  try {
    const response = await QuestionService.delete(questionId);
    getTeacherQuestions();
    deleteQuestionDialog.value = false;
    deleteSnackbar.value = true;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function setAnswer(event, id) {
  if (event.target.checked) {
    editedItem.value.rightanswer = id;
  } else {
    editedItem.value.rightanswer = null;
  }
}

async function addQuestion() {
  try {
    if (!editedItem.value.content || !editedItem.value.answer1 || !editedItem.value.answer2 || !editedItem.value.answer3 || !editedItem.value.answer4 || !editedItem.value.rightanswer || !editedItem.value.mark) {
      error.value = 'يجب تعبئة كل الحقول'
      return;
    }
    error.value = null;
    await QuestionService.create({
      courseid: route.params.subject,
      teacherid: user.user.id,
      content: editedItem.value.content,
      answer1: editedItem.value.answer1,
      answer2: editedItem.value.answer2,
      answer3: editedItem.value.answer3,
      answer4: editedItem.value.answer4,
      mark: editedItem.value.mark,
      rightanswer: editedItem.value.rightanswer
    });
    getTeacherQuestions();
    refreshOptions();
    addQuestionDialog.value = false;
    snackbar.value = true;
  } catch (error) {
    return error.message;
  }
}

async function update() {
  try {
    if (!editedItem.value.content || !editedItem.value.answer1 || !editedItem.value.answer2 || !editedItem.value.answer3 || !editedItem.value.answer4 || !editedItem.value.rightanswer || !editedItem.value.mark) {
      error.value = 'يجب تعبئة كل الحقول'
      return;
    }
    error.value = null;
    const response = await QuestionService.update({
      question_id: editedItem.value.id,
      question_content: {
        content: editedItem.value.content,
        answer1: editedItem.value.answer1,
        answer2: editedItem.value.answer2,
        answer3: editedItem.value.answer3,
        answer4: editedItem.value.answer4,
        mark: editedItem.value.mark,
        rightanswer: editedItem.value.rightanswer
      }
    });
    getTeacherQuestions();
    refreshOptions();
    editQuestionDialog.value = false
    editSnackbar.value = true;

  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getTeacherQuestions();
});

function refreshOptions() {
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem)
    editedIndex.value = -1
  })
}

function closeAddQuestionDialog() {
  refreshOptions();
  addQuestionDialog.value = false;
}

function closeEditQuestionDialog() {
  refreshOptions();
  editQuestionDialog.value = false;
}

const dialogDelete = ref(false);
const deleteSuccessfully = ref(false);
const dialog = ref(false);
const editedIndex = ref(-1)
const defaultItem = ref({
  id: 0,
  content: '',
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
  rightanswer: '',
})
const editedItem = ref({
  id: 0,
  content: '',
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
  rightanswer: '',
})

function close() {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem)
    editedIndex.value = -1
  })
}

const search = ref();
const headers = ref([
  { title: 'id', key: 'id', align: 'start' },
  { title: 'السؤال', key: 'content' },
  { title: 'Actions', key: 'actions' },
]);

function editItem(item) {
  editedIndex.value = questions.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  editQuestionDialog.value = true;
}

function deleteItem (item) {
  editedIndex.value = questions.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  deleteQuestionDialog.value = true
}

function closeDelete() {
  dialogDelete .value= false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  })
}

function deleteItemConfirm() {
  questions.value.splice(editedIndex.value, 1)
  destroy(editedItem.value.id);
  closeDelete()
}
</script>

<template>
  <v-locale-provider rtl>

    <v-layout class="mt-16">
          <v-locale-provider rtl>
            <v-app-bar color="primary" prominent height="100">
              <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
              <v-toolbar-title>
                <span class="title-text">
                  Exam Platform
                </span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-app-bar>
          </v-locale-provider>

          <v-navigation-drawer v-model="drawer" location="right">
            <v-list density="compact">
              <v-list-item v-for="(item, i) in items" :key="i" :value="item.value" style="text-align: right;"
                @click="handleRequest(item.title, item.value)">
                <div v-if="item.title == 'تسجيل الخروج'">
                  <v-list-item-title style="color: red;">
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

    <v-card class="mx-auto" max-width="1000" title="البحث">
      <template v-slot:text>
        <v-text-field v-model="search" label="إبحث عن الأسئلة" prepend-inner-icon="mdi-magnify" variant="outlined"
          hide-details single-line></v-text-field>
      </template>
      <v-data-table :headers="headers" :items="questions" :search="search"
        :sort-by="[{ key: 'Answer1', order: 'asc' }]">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>كل الأسئلة</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="white" class="success-green" @click="addQuestionDialog = true">إضافة سؤال</v-btn>
            <v-btn color="white" class="primary mx-4" @click="router.go(-1)">العودة</v-btn>
            <v-dialog v-model="dialog" max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="form-title-text">تفاصيل السؤال</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.content" label="السؤال" class="no-select"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.answer1" label="الإجابة الأولى"
                          class="no-select"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.answer2" label="الإجابة الثانية"
                          class="no-select"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.answer3" label="الإجابة الثالثة"
                          class="no-select"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.answer4" label="الإجابة الرابعة"
                          class="no-select"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card>
                  <div class="d-flex">
                    <v-btn color="blue-darken-1" class="mx-auto mb-10" @click="close">
                      إغلاق
                    </v-btn>
                  </div>
                </v-card>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card prepend-icon="mdi-alert-circle" text="هل تريد حذف هذا سؤال؟" title="تأكيد" color="orange">
                <v-card>
                  <v-spacer></v-spacer>
                  <v-btn color="red-darken-1" class="mx-2 my-4" @click="deleteItemConfirm">نعم</v-btn>
                  <v-btn color="blue-darken-1" @click="closeDelete">إلغاء</v-btn>
                  <v-spacer></v-spacer>
                </v-card>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small" @click="editItem(item)" color="blue">
            mdi-eye-arrow-right
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)" color="red">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="logoutDialog" max-width="500px">
      <v-card prepend-icon="mdi-alert-circle" text="هل تريد تسجيل الخروج؟" title="تأكيد" color="orange">
        <v-card>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" class="mx-2 my-4" @click="logout()">نعم</v-btn>
          <v-btn color="blue-darken-1" @click="logoutDialog = false">إلغاء</v-btn>
          <v-spacer></v-spacer>
        </v-card>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="deleteSuccessfully" :timeout="2000" color="red">
      <template v-slot:actions />
      تم حذف السؤال بنجاح
    </v-snackbar>

    <v-dialog v-model="deleteQuestionDialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-alert-circle" text="هل تريد حذف هذا سؤال؟" title="تأكيد">
        <template v-slot:actions>
          <v-btn color="red" @click="deleteItemConfirm()">نعم</v-btn>
          <v-btn color="primary" @click="deleteQuestionDialog = false">العودة</v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editQuestionDialog" width="auto" persistent>
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
            <v-text-field label="السؤال" class="ml-2 mr-2 mb-2 text-input" v-model="editedItem.content"
              hint="عدل السؤال إذا أردت" :rules="[v => !!v || 'يجب إدخال نص السؤال']" persistent-hint></v-text-field>
            <v-text-field label="الدرجة" class="ml-2 mr-2 text-input" type="number" v-model="editedItem.mark"
              hint="عدل في درجة السؤال إذا أردت" :rules="[v => !!v || 'يجب إدخال الدرجة']"
              persistent-hint></v-text-field>
            <div class="error ml-2" />
            <div class="mx-4">
              <span class="text-h5">
                الإختيارات
              </span>
            </div>
            <v-list class="mx-4">
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`500px`">
                  <v-text-field class="text-input" label="الإختيار الأول" hint="عدل الإختيار الأول"
                    :rules="[v => !!v || 'يجب إدخال الإختيار الأول']" persistent-hint
                    v-model="editedItem.answer1"></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success" :model-value="(editedItem.rightanswer == 1 ? true : false)"
                  @click="setAnswer($event, 1)" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`500px`">
                  <v-text-field class="text-input" label="الإختيار الثاني" hint="عدل الإختيار الثاني"
                    :rules="[v => !!v || 'يجب إدخال الإختيار الثاني']" persistent-hint
                    v-model="editedItem.answer2"></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success" :model-value="(editedItem.rightanswer == 2 ? true : false)"
                  @click="setAnswer($event, 2)" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`500px`">
                  <v-text-field class="text-input" label="الإختيار الثالث" hint="عدل الإختيار الثالث"
                    :rules="[v => !!v || 'يجب إدخال الإختيار الثالث']" persistent-hint
                    v-model="editedItem.answer3"></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success" :model-value="(editedItem.rightanswer == 3 ? true : false)"
                  @click="setAnswer($event, 3)" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`500px`">
                  <v-text-field class="text-input" label="الإختيار الرابع" hint="عدل الإختيار الرابع"
                    :rules="[v => !!v || 'يجب إدخال الإختيار الرابع']" persistent-hint
                    v-model="editedItem.answer4"></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success" :model-value="(editedItem.rightanswer == 4 ? true : false)"
                  @click="setAnswer($event, 4)" />
              </div>
              <div class="error d-flex">
                <div class="mx-auto my-4 error-text">
                  {{ error }}
                </div>
              </div>
            </v-list>
          </v-form>
        </v-sheet>
      </v-layout>
    </v-dialog>

    <v-dialog v-model="addQuestionDialog" width="auto" scrollable persistent>
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
              <span class="section-title-text">
                السؤال
              </span>
            </div>
            <v-text-field label="السؤال" class="ml-2 mr-2 mb-2 text-input" v-model="editedItem.content" hint="أضف السؤال"
              :rules="[v => !!v || 'يجب إدخال نص السؤال']" persistent-hint></v-text-field>
            <v-text-field label="الدرجة" class="ml-2 mr-2 text-input" v-model="editedItem.mark" type="number"
              hint="أضف درجة السؤال" :rules="[v => !!v || 'يجب إدخال درجة السؤال']" persistent-hint></v-text-field>
            <div class="error ml-2" />
            <div class="mx-4">
              <span class="section-title-text">
                الإختيارات
              </span>
            </div>
            <v-list class="mx-4">
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`500px`">
                  <v-text-field label="الإختيار الأول" hint="الإختيار الأول"
                    :rules="[v => !!v || 'يجب إدخال الإختيار الأول']" persistent-hint class="text-input"
                    v-model="editedItem.answer1"></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success" :model-value="(editedItem.rightanswer == 1 ? true : false)"
                  @click="setAnswer($event, 1)" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`500px`">
                  <v-text-field label="الإختيار الثاني" hint="الإختيار الثاني"
                    :rules="[v => !!v || 'يجب إدخال الإختيار الثاني']" persistent-hint class="text-input"
                    v-model="editedItem.answer2"></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success" :model-value="(editedItem.rightanswer == 2 ? true : false)"
                  @click="setAnswer($event, 2)" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`500px`">
                  <v-text-field label="الإختيار الثالث" hint="الإختيار الثالث"
                    :rules="[v => !!v || 'يجب إدخال الإختيار الثالث']" persistent-hint class="text-input"
                    v-model="editedItem.answer3"></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success" :model-value="(editedItem.rightanswer == 3 ? true : false)"
                  @click="setAnswer($event, 3)" />
              </div>
              <div class="d-flex mx-2 my-2">
                <v-responsive :width="`500px`">
                  <v-text-field label="الإختيار الرابع" hint="الإختيار الرابع"
                    :rules="[v => !!v || 'يجب إدخال الإختيار الرابع']" persistent-hint class="text-input"
                    v-model="editedItem.answer4"></v-text-field>
                </v-responsive>
                <v-checkbox-btn class="mx-4" color="success" :model-value="(editedItem.rightanswer == 4 ? true : false)"
                  @click="setAnswer($event, 4)" />
              </div>
              <div class="error d-flex">
                <div class="mx-auto my-4 error-text">
                  {{ error }}
                </div>
              </div>
            </v-list>
          </v-form>
        </v-sheet>
      </v-layout>
    </v-dialog>
    <v-dialog v-model="logoutDialog" max-width="500px">
      <v-card prepend-icon="mdi-alert-circle" text="هل تريد تسجيل الخروج؟" title="تأكيد" color="orange">
        <v-card>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" class="mx-2 my-4" @click="logout()">نعم</v-btn>
          <v-btn color="blue-darken-1" @click="logoutDialog = false">إلغاء</v-btn>
          <v-spacer></v-spacer>
        </v-card>
      </v-card>
    </v-dialog>
    <v-snackbar :timeout="2000" color="green-accent-2" elevation="24" v-model="snackbar">
      تم إضافة السؤال بنجاح
    </v-snackbar>
    <v-snackbar :timeout="2000" color="primary" elevation="24" v-model="editSnackbar">
      تم تعديل السؤال بنجاح
    </v-snackbar>
    <v-snackbar :timeout="2000" color="red" elevation="24" v-model="deleteSnackbar">
      تم حذف السؤال بنجاح
    </v-snackbar>
  </v-locale-provider>
</template>

<style scoped>
.list-item {
  transition: 0.5s;
}

.list-item:hover {
  background-color: bisque;
}

.dark-cyan {
  background-color: rgb(38, 50, 56);
}

.primary {
  background-color: rgb(24, 103, 192);
}

.success-green {
  background-color: rgb(24, 103, 24)
}

.title-text {
  pointer-events: none;
  font-size: 40px;
}

.section-title-text {
  font-size: 20px;
}

.text-input>>>.v-input__details {
  display: none;
}

.error {
  color: red;
}

.error-text {
  font-size: 17px;
}

.primary {
  background-color: RGB(24, 103, 192);
}

.success-green {
  background-color: rgb(24, 103, 24)
}
</style>
