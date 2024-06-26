<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import StudentService from '@/services/StudentService'
import imgUrl from '../assets/students.jpg'
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const router = useRouter()
const addStudentForm = ref();
const editStudentForm = ref();
const students = ref();
const snackbar = ref(false);
const editStudentDialog = ref(false)
const search = ref();
const error = ref();

const headers = ref([
  {
    title: 'إسم الطالب',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'إسم الأب', key: 'father_name' },
  { title: 'إسم الجد', key: 'grandfather_name' },
  { title: 'اللقب', key: 'last_name' },
  { title: 'رقم القيد', key: 'id' },
  { title: 'Actions', key: 'actions', sortable: false },
])
const dialog = ref(false);
const editedItem = ref({
  id: 0,
  name: '',
  username: '',
  password: '',
  phone: '',
  address: '',
})

const currentItem = ref({
  id: 0,
  name: '',
  username: '',
  password: '',
  phone: '',
  address: '',
})

const defaultItem = ref({
  id: 0,
  name: '',
  username: '',
  password: '',
  phone: '',
  address: '',
});

const dialogDelete = ref(false)
const addSuccessfully = ref(false)
const editSuccessfully = ref(false)
const deleteSuccessfully = ref(false)

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

function navigateTo(path) {
  router.push(path);
}

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

const editedIndex = ref(-1)
async function index() {
  try {
    const response = await StudentService.index();
    students.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function addStudent(student) {
  try {
    if (!student.name || !student.username || !student.phone || !student.password || !student.address) {
      error.value = 'يجب تعبئت جميع الحقول'
      return;
    }
    error.value = null;
    const response = await StudentService.create({
      name: student.name,
      father_name: student.father_name,
      grandfather_name: student.grandfather_name,
      last_name: student.last_name,
      username: student.username,
      phone: student.phone,
      password: student.password,
      address: student.address
    });
    students.value.push(currentItem.value)
    addSuccessfully.value = true;
    currentItem.value = {};
    close()
  } catch (err) {
    error.value = 'اسم المستخدم للطالب موجود مسبقا'
    return {
      message: err.message
    }
  }
}

async function update(student) {
  try {
    console.log(student);
    if (!student.name || !student.username || !student.phone || !student.password || !student.address) {
      error.value = 'يجب تعبئت جميع الحقول'
      return;
    }
    error.value = null;
    const response = await StudentService.update({
      id: student.id,
      name: student.name,
      father_name: student.father_name,
      grandfather_name: student.grandfather_name,
      last_name: student.last_name,
      username: student.username,
      phone: student.phone,
      password: student.password,
      address: student.address
    });
    editSuccessfully.value = true;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function destroy(studetnId) {
  try {
    const response = await StudentService.delete(studetnId);
    deleteSuccessfully.value = true;
    students.value.splice(editedIndex.value, 1)
  } catch (error) {
    snackbar.value = true;
    return {
      message: error.message
    }
  }
}

function close() {
  dialog.value = false
  editStudentDialog.value = false
  currentItem.value = {};
  error.value = null;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem)
    editedIndex.value = -1
  })
}

async function save() {
  const { valid, errors } = await addStudentForm.value?.validate()
  if (valid) {
    addStudent(currentItem.value);
  }
}

async function edit() {
  const { valid, errors } = await editStudentForm.value?.validate()
  if (valid) {
    update(editedItem.value);
    Object.assign(students.value[editedIndex.value], editedItem.value)
    close()
  }
}

function closeDelete() {
  dialogDelete.value = false;
}

function deleteItemConfirm() {
  destroy(editedItem.value.id);
  closeDelete()
}

function editItem(item) {
  editedIndex.value = students.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  editStudentDialog.value = true
}

function deleteItem(item) {
  editedIndex.value = students.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

onMounted(() => {
  if (user.role != 'admin') {
    router.go(-1);
  }
  index();
});

function phoneRule(value) {
  if (value?.length == 10 && /[0-9-]+/.test(value)) {
    let prefix = value.slice(0, 3);
    let prefixs = ['091', '092', '093'];
    if (prefixs.includes(prefix)) return true;
  }
  return 'بيانات رقم الهاتف غير صحيحة';
}

function nameRule(value) {
  if (!value) {
    return 'يجب أدخال بيانات هذا الحقل';
  }
  if (!/^[\p{L}\s]*$/u.test(value)) {
    return 'يجب على هذا الحقل أن لا يحتوي على أرقام';
  }
  return true;
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

    <div class="mx-auto">
      <img :src="imgUrl" alt="Logo" style="width: 1400px; height: 450px;">
    </div>
    <v-card class="mx-auto" max-width="1000" title="البحث">
      <template v-slot:text>
        <v-text-field v-model="search" label="إبحث عن الطلبة" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
          single-line></v-text-field>
      </template>
      <v-data-table :headers="headers" :items="students" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>الطلاب</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px" persistent>
              <template v-slot:activator="{ props }">
                <v-btn class="mb-2 primary" color="white" v-bind="props">
                  إضافة طالب
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="form-text-title"> إضافة طالب </span>
                </v-card-title>

                <v-form ref="addStudentForm">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="currentItem.name" label="إسم الطالب"
                          :rules="[v => nameRule(v)]"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="currentItem.father_name" label="إسم أب الطالب"
                          :rules="[v => nameRule(v)]"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="currentItem.grandfather_name" label="إسم جد الطالب"
                          :rules="[v => nameRule(v)]"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="currentItem.last_name" label="لقب الطالب"
                          :rules="[v => nameRule(v)]"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="currentItem.username" label="إسم المستخدم"
                          :rules="[v => !!v || 'يجب إدخال إسم المستخدم']"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="currentItem.password" label="الرمز السري"
                          :rules="[v => !!v || 'يجب إدخال الرمز السري']"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="currentItem.phone" label="رقم الهاتف"
                          :rules="[v => phoneRule(v)]"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="currentItem.address" label="العنوان"
                          :rules="[v => !!v || 'يجب إدخال العنوان']"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
                <div class="error d-flex">
                  <div class="mx-auto">
                    {{ error }}
                  </div>
                </div>
                <div class="d-flex">
                  <div class="mx-auto mb-4">
                    <v-btn color="green-darken-1" class="mx-2" @click="save">
                      إضافة
                    </v-btn>
                    <v-btn color="blue-darken-1" @click="close">
                      إغلاق
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="editStudentDialog" max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="form-text-title"> تعديل بيانات الطالب </span>
                </v-card-title>

                <v-form ref="editStudentForm">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.name" label="إسم الطالب"
                          :rules="[v => nameRule(v)]"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.father_name" label="إسم أب الطالب"
                          :rules="[v => nameRule(v)]"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.grandfather_name" label="إسم جد الطالب"
                          :rules="[v => nameRule(v)]"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.last_name" label="لقب الطالب"
                          :rules="[v => nameRule(v)]"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.username" label="إسم المستخدم"
                          :rules="[v => !!v || 'يجب إدخال إسم المستخدم']"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.password" label="الرمز السري"
                          :rules="[v => !!v || 'يجب إدخال الرمز السري']"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.phone" label="رقم الهاتف"
                          :rules="[v => phoneRule(v)]"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.address" label="العنوان"
                          :rules="[v => !!v || 'يجب إدخال العنوان']"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>

                <div class="error d-flex">
                  <div class="mx-auto">
                    {{ error }}
                  </div>
                </div>

                <div class="d-flex">
                  <div class="mx-auto mb-4">
                    <v-btn color="green-darken-1" class="mx-2" @click="edit">
                      تعديل
                    </v-btn>
                    <v-btn color="blue-darken-1" @click="close">
                      إغلاق
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" width="auto">
              <v-card max-width="400" prepend-icon="mdi-alert" text="هل تريد حذف هذا الطالب" title="تأكيد">
                <template v-slot:actions>
                  <v-btn color="red" @click="deleteItemConfirm">نعم</v-btn>
                  <v-btn color="primary" @click="closeDelete">العودة</v-btn>
                </template>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small" @click="editItem(item)" color="green">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)" color="red">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="index">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar v-model="snackbar" multi-line>
      لا يمكن حذف هذا الطالب
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false">
          اغلاق
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="addSuccessfully" :timeout="2000" color="green">
      <template v-slot:actions />
      تم إضافة الطالب بنجاح
    </v-snackbar>
    <v-snackbar v-model="editSuccessfully" :timeout="2000" color="primary">
      <template v-slot:actions />
      تم تعديل بيانات الطالب بنجاح
    </v-snackbar>
    <v-snackbar v-model="deleteSuccessfully" :timeout="2000" color="red">
      <template v-slot:actions />
      تم حذف الطالب بنجاح
    </v-snackbar>
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
.primary {
  background-color: RGB(24, 103, 192);
}

.title-text {
  pointer-events: none;
  font-size: 40px;
}

.form-text-title {
  font-size: 20px;
}

.error {
  color: red;
}
</style>