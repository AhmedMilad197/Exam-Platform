<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import TeacherService from '@/services/TeacherService'
import imgUrl from '../assets/teacher.jpg'
import { useUserStore } from "@/stores/user";

const user = useUserStore(); 
const router = useRouter();
const teachers = ref();
const editedIndex = ref(-1)
const blockTeacherSnackbar = ref(false);
const unBlockTeacherSnackbar = ref(false);
const search = ref();
const items = ref([
  {
    title: 'المدرسين',
    value: {
      name: 'teachers'
    }
  },
  {
    title: 'الطلبة',
    value: {
      name: 'students'
    }
  },
  {
    title: 'الأسئلة',
    value: {
      name: 'questions',
      params: {
        subject: 'all'
      }
    }
  },
  {
    title: 'المواد',
    value: {
      name: 'subjects'
    }
  },
  {
    title: 'تسجيل الخروج',
    color: 'red',
    value: {
      name: 'logout'
    }
  }
]);
const drawer = ref(false);
const logoutDialog = ref(false);

function handleRequest (title, value) {
  if (title == 'تسجيل الخروج') {
    logoutDialog.value = true;
  } else {
    navigateTo(value)
  }
}

function deleteStoredUser () {
  user.user = null;
  user.token = null;
  user.role = null;
}

async function logout () {
  deleteStoredUser();
  logoutDialog.value = false;
  navigateTo({
    name: 'LandingPageView'
  })
}

const headers = ref([
  {
    title: 'إسم المدرس',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'id', key: 'id' },
  { title: 'Actions', key: 'actions', sortable: false },
])
const dialog = ref(false);
const blockTeacherConfirmation = ref(false);
const editedItem = ref({
  id: 0,
  name: '',
  username: '',
  password: '',
  lastlogin: '',
})

const defaultItem = ref({
  id: 0,
  name: '',
  username: '',
  password: '',
  lastlogin: '',
});

function editItem(item) {
  editedIndex.value = teachers.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

function selectTeacherToBlock(item) {
  editedIndex.value = teachers.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  blockTeacherConfirmation.value = true;
}

async function selectTeacherToUnBlock(item) {
  editedIndex.value = teachers.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  // blockTeacherConfirmation.value = true;
  await unBlockTeacher(); //TODO check if this needs a dialog.
  index();
}

async function blockTeacher() {
  try {
    const teacher = Object.assign({}, editedItem.value)
    const response = await TeacherService.block({
      'teacherId': teacher.id
    });
    index();
    blockTeacherConfirmation.value = false;
    blockTeacherSnackbar.value = true;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function unBlockTeacher() {
  try {
    const teacher = Object.assign({}, editedItem.value)
    const response = await TeacherService.unBlock({
      'teacherId': teacher.id
    });
    blockTeacherConfirmation.value = false;
    blockTeacherSnackbar.value = true;
    unBlockTeacherSnackbar.value = true;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

function close() {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem)
    editedIndex.value = -1
  })
}

async function save() {
  if (editedIndex.value > -1) {
    Object.assign(teachers.value[editedIndex.value], editedItem.value)
  } else {
    students.value.push(editedItem.value)
  }
  close()
}

function navigateTo(route) {
  router.push(route);
}

async function index() {
  try {
    const response = await TeacherService.index();
    teachers.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  if (user.role != 'admin') {
    router.go(-1);
  }
  index();
});

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
            <span class="title-text">
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

    <div class="mx-auto">
      <img :src="imgUrl" alt="Logo" style="width: 1400px; height: 450px;">
    </div>

    <v-card class="mx-auto" max-width="1000" title="البحث">
      <template v-slot:text>
        <v-text-field v-model="search" label="إبحث عن المدرسين" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
          single-line></v-text-field>
      </template>
      <v-data-table :headers="headers" :items="teachers" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>المدرسين</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="dialog-title-text"> بيانات المدرس </span>
                </v-card-title>
  
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.name" class="no-select" label="إسم المدرس"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.username" class="no-select" label="username"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.password" class="no-select" label="الرمز السري"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.lastlogin" class="no-select" label="اخر ضهور"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
  
                <v-card>
                  <div class="d-flex">
                    <v-btn color="primary" @click="close" class="mx-auto my-4">
                      العودة
                    </v-btn>
                  </div>
                </v-card>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex">
            <div>
              <v-icon class="me-2" size="small" @click="editItem(item)" color="blue">
                mdi-eye-arrow-right
              </v-icon>
            </div>
            <div v-if="item.active == true">
              <v-icon size="small" @click="selectTeacherToBlock(item)" color="red">
                mdi-cancel
              </v-icon>
            </div>
            <div v-else>
              <v-icon size="small" @click="selectTeacherToUnBlock(item)" color="green">
                mdi-lock-open
              </v-icon>
            </div>
          </div>
          <v-dialog v-model="blockTeacherConfirmation" width="auto">
            <v-card max-width="400" prepend-icon="mdi-update"
              text="هل تريد حظر هذا الاستاذ؟"
              title="تأكيد">
              <template v-slot:actions>
                <v-btn color="red" @click="blockTeacher()">نعم</v-btn>
                <v-btn color="primary" @click="blockTeacherConfirmation = false">العودة</v-btn>
              </template>
            </v-card>
          </v-dialog>
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

    <v-snackbar
      :timeout="2000"
      color="red"
      elevation="24"
      v-model="blockTeacherSnackbar"
    >
      لقد قمت بحظر الأستاذ بنجاح
    </v-snackbar>

    <v-snackbar
      :timeout="2000"
      color="green"
      elevation="24"
      v-model="unBlockTeacherSnackbar"
    >
      لقد قمت بفك الحظر عن الأستاذ بنجاح
    </v-snackbar>
    
  </v-locale-provider>

</template>

<style scoped>
.no-select {
  pointer-events: none;
}

.title-text {
  pointer-events: none;
  font-size: 40px;
}

.dialog-title-text {
  font-size: 20px;
}

</style>