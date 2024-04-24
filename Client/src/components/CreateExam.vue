<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import TeacherService from '@/services/TeacherService'
import ExamService from '@/services/ExamService'
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const router = useRouter()
const route = useRoute();
const starthour = ref();
const startminute = ref();
const endhour = ref();
const endminute = ref();
const date = ref();
const selectedItems = [];
const error = ref();
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

function formatDate(hour, minute) {
  const dateObject = new Date(date.value);
  dateObject.setHours(dateObject.getHours() + 2);
  dateObject.setHours(hour);
  dateObject.setMinutes(minute);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Africa/Tripoli'
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(dateObject);

  const formattedDateTime = `${parts[4].value}-${parts[0].value}-${parts[2].value} ${parts[6].value}:${parts[8].value}:${parts[10].value}`;

  return formattedDateTime
}

function navigateTo(path) {
  router.push(path);
}

const examTitle = ref();
const examDescription = ref();

const questions = ref();

async function createExam() {
  try {
    console.log(formatDate(starthour.value, startminute.value));
    if (!examTitle.value || !examDescription.value || !starthour.value || !endhour.value || selectedItems.length < 1) {
      error.value = 'يجب تعبئت جميع الحقول';
      return;
    }

    if (new Date(formatDate(starthour.value, startminute.value)) > new Date(formatDate(endhour.value, endminute.value))) {
      error.value = 'يجب إدحال بيانات التاريخ صحيحة';
      return;
    }

    error.value = null;
    const response = await ExamService.addQuestions({
      title: examTitle.value,
      description: examDescription.value,
      teacherId: user.user.id,
      start_time: formatDate(starthour.value, startminute.value),
      end_time: formatDate(endhour.value, endminute.value),
      questions: selectedItems,
      courseId: route.params.subject
    });
    router.go(-1);
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function getQuestions() {
  try {
    const response = await TeacherService.getCourseQuestions({
      teacherId: user.user.id,
      couresId: route.params.subject
    })
    questions.value = response.data
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function updateSelectedItems(event, id) {
  if (event.target.checked) {
    selectedItems.push(id);
  } else {
    var index = selectedItems.indexOf(id);
    if (index !== -1) {
      selectedItems.splice(index, 1);
    }
  }
  console.log(selectedItems)
}

function goBack() {
  router.go(-1);
}

onMounted(() => {
  getQuestions()
});

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

    <div>
      <v-card class="mx-auto mt-16" max-width="1000">
        <v-toolbar>
          <v-toolbar-title>إنشاء إختبار</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" class="mx-4 primary" @click="goBack()">العودة</v-btn>
        </v-toolbar>
        <div class="d-flex flex-column mx-4 my-4">
          <span class="text-field-title my-auto">
            عنوان الإختبار:
          </span>
          <div>
            <v-text-field label="عنوان الإختبار" v-model="examTitle" hint="أضف عنوان للإختبار"
              :rules="[v => !!v || 'يجب إدخال عنوان الإختبار']" persistent-hint></v-text-field>
          </div>
        </div>
        <div class="d-flex flex-column mx-4 my-4">
          <span class="text-field-title my-auto">
            وصف الإختبار
          </span>
          <div>
            <v-text-field label="وصف الإختبار" :rules="[v => !!v || 'يجب إدخال وصف الإختبار']" v-model="examDescription"
              hint="أضف وصف للإختبار" persistent-hint></v-text-field>
          </div>
        </div>
        <div class="d-flex my-4">
          <div class="mx-4">
            <v-date-picker header="موعد الإختبار" :rules="[v => !!v || 'يجب إدخال موعد الإختبار']" bg-color="primary"
              v-model="date"></v-date-picker>
          </div>
          <div class="d-flex flex-column" style="width: 500px;">
            <div class="mx-4">
              <span class="text-field-title mx-2">وقت البدء</span>
              <div>
                <div class="mx-2 my-2">
                  <v-combobox label="الساعة" :items="['8', '9', '10', '11', '12', '13', '14', '15', '16', '17']"
                    :rules="[v => !!v || 'يجب إدخال الساعة']" v-model="starthour"></v-combobox>
                </div>
                <div class="mx-2 my-2">
                  <v-combobox label="الدقيقة"
                    :items="['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']"
                    :rules="[v => !!v || 'يجب إدخال الدقائق']" v-model="startminute"></v-combobox>
                </div>
              </div>
            </div>
            <div class="mx-4">
              <span class="text-field-title mx-2">وقت الإنتهاء</span>
              <div>
                <div class="mx-2 my-2">
                  <v-combobox label="الساعة" :rules="[v => !!v || 'يجب إدخال الساعة']"
                    :items="['8', '9', '10', '11', '12', '13', '14', '15', '16', '17']" v-model="endhour"></v-combobox>
                </div>
                <div class="mx-2 my-2">
                  <v-combobox label="الدقيقة" :rules="[v => !!v || 'يجب إدخال الدقائق']"
                    :items="['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']"
                    v-model="endminute"></v-combobox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <v-btn color="primary" class="mx-auto" @click="createExam()">إنشاء إختبار</v-btn>
        </div>
        <v-table fixed-header height="100%" density="comfortable">
          <thead>
            <tr>
              <th class="text-right">
                السؤال
              </th>
              <th class="text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="question in questions" :key="question.id" style="height: 50px;">
              <td>
                <v-checkbox class="custom-checkbox" :label=question.content
                  @click="updateSelectedItems($event, question.id)" />
              </td>
              <td>
                <div class="d-flex">
                  <div>
                    <v-btn color="indigo-darken-3"
                      @click="navigateTo({ name: 'view-question', params: { id: question.id } })">عرض</v-btn>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="error d-flex">
          <div class="mx-auto my-4 error-text">
            {{ error }}
          </div>
        </div>
      </v-card>
    </div>
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
  </v-locale-provider>
</template>

<style scoped>
.list-item {
  transition: 0.5s;
}

.list-item:hover {
  background-color: bisque;
}

.custom-checkbox>>>.v-input__details {
  display: none;
}

.primary {
  background-color: RGB(24, 103, 192);
}

.title-text {
  pointer-events: none;
  font-size: 40px;
}

.text-field-title {
  font-size: 20px
}

.error {
  color: red;
}

.error-text {
  font-size: 17px;
}
</style>
