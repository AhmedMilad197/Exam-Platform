<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import SubjectService from '@/services/SubjectService'
import imgUrl from '../assets/subjects.jpg'
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const router = useRouter()
const subjects = ref();
const dialog = ref(false);
const dialogDelete = ref(false);
const editSubjectDialog = ref(false);
const addSubjectForm = ref(null);
const editSubjectForm = ref(null);
const addSuccessfully = ref(false);
const editSuccessfully = ref(false);
const deleteSuccessfully = ref(false);
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

const editedItem = ref({
  id: 0,
  content: '',
  description: '',
  unit: null,
})
const defaultItem = ref({
  content: '',
  description: '',
  unit: null,
})

const headers = ref([
  { title: 'id', key: 'id', align: 'start' },
  { title: 'المادة', sortable: false, key: 'name' },
  { title: 'الوحدات', key: 'unit' },
  { title: 'Actions', key: 'actions', sortable: false },
])
const editedIndex = ref(-1)

function navigateTo(route) {
  router.push(route);
}

async function getSubjects() {
  try {
    const response = await SubjectService.index()
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

function editItem(item) {
  editedIndex.value = subjects.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  editSubjectDialog.value = true;
}

function deleteItem(item) {
  editedIndex.value = subjects.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

function close() {
  dialog.value = false;
  editSubjectDialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem);
    editedIndex.value = -1;
  })
}

async function AddSubject(subject) {
  try {
    await SubjectService.create({
      name: subject.name,
      description: subject.description,
      unit: subject.unit,
    });
    getSubjects();
    addSuccessfully.value = true;
  } catch (err) {
    return {
      message: err.message
    }
  }
}

async function update(subject) {
  try {
    const response = await SubjectService.update({
      id: subject.id,
      name: subject.name,
      description: subject.description,
      unit: subject.unit,
    }, subject.id);
    editSuccessfully.value = true;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function save() {
  const { valid, errors } = await addSubjectForm.value?.validate()
  if (valid) {
    AddSubject(editedItem.value);
    close()
  }
}

async function updateSubject() {
  const { valid, errors } = await editSubjectForm.value?.validate()
  if (valid) {
    update(editedItem.value);
    Object.assign(subjects.value[editedIndex.value], editedItem.value)
    close();
  }
}

async function destroy(subjectId) {
  try {
    const response = await SubjectService.delete({
      id: subjectId
    });
    getSubjects();
    dialog.value = false;
    deleteSuccessfully.value = true;
  } catch (error) {
    dialog.value = false;
    snackbar.value = true;
    return {
      message: error.message
    }
  }
}

function deleteItemConfirm() {
  subjects.value.splice(editedIndex.value, 1)
  destroy(editedItem.value.id);
  closeDelete()
}

function closeDelete() {
  dialogDelete.value = false
  editedItem.value = defaultItem.value;
}

function goToTeachers(item) {
  editedIndex.value = subjects.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  navigateTo({ name: 'teacher-subject-list', params: { id: editedItem.value.id } })
}

function goToExams(item) {
  editedIndex.value = subjects.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  navigateTo({ name: 'exam-bank', params: { subject: editedItem.value.id } })
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
        <v-text-field v-model="search" label="إبحث عن المواد" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
          single-line></v-text-field>
      </template>
      <v-data-table :headers="headers" :items="subjects" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>كل المواد</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ props }">
                <v-btn class="mb-2 primary" color="white" dark v-bind="props">
                  إضافة مادة
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">إضافة مادة</span>
                </v-card-title>

                <v-form ref="addSubjectForm">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.name" label="إسم المادة"
                          :rules="[v => !!v || 'يجب إدخال إسم المادة']"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="editedItem.description" label="وصف المادة"
                          :rules="[v => !!v || 'يجب إدخال وصف المادة']"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-combobox 
                          label="عدد الوحدات" 
                          :rules="[
                            v => !!v || 'يجب إدخال عدد الوحدات',
                            v => /^[1-5]$/.test(v) || 'بيانات الإدخال غير صحيحة'
                          ]"
                          :items="['1', '2', '3', '4', '5']" v-model="editedItem.unit" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
                <div class="d-flex">
                  <div class="mx-auto mb-4">
                    <v-btn class="ml-4" color="green-darken-1" @click="save">
                      إضافة
                    </v-btn>
                    <v-btn color="blue-darken-1" @click="close">
                      إلغاء
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="editSubjectDialog" max-width="500px" persistent>

              <v-card>
                <v-card-title>
                  <span class="dialog-title-text">تعديل المادة</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form ref="editSubjectForm">

                      <v-row>
                        <v-col cols="12" md="12" sm="12">
                          <v-text-field v-model="editedItem.name" label="إسم المادة"
                            :rules="[v => !!v || 'يجب إدخال إسم المادة']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                          <v-text-field v-model="editedItem.description" label="وصف المادة"
                            :rules="[v => !!v || 'يجب إدخال وصف المادة']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                          <v-combobox label="عدد الوحدات" :items="['1', '2', '3', '4', '5']"
                            :rules="[
                              v => !!v || 'يجب إدخال عدد الوحدات',
                              v => /^[1-5]$/.test(v) || 'بيانات الإدخال غير صحيحة'
                            ]" v-model="editedItem.unit" />
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <div class="d-flex">
                  <div class="mx-auto mb-4">
                    <v-btn class="ml-4" color="green-darken-1" @click="updateSubject">
                      تعديل
                    </v-btn>
                    <v-btn color="blue-darken-1" @click="close">
                      إلغاء
                    </v-btn>
                  </div>
                </div>
              </v-card>

            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="500px" persistent>
              <v-card prepend-icon="mdi-alert-circle" text="هل تريد حذف هذه المادة؟" title="تأكيد" color="orange">
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
          <v-icon class="me-2" size="small" @click="editItem(item)" color="green">
            mdi-pencil
          </v-icon>
          <v-icon size="small" class="ml-2" @click="deleteItem(item)" color="red">
            mdi-delete
          </v-icon>
          <v-icon size="small" class="ml-2" color="blue" @click="goToTeachers(item)">
            mdi-account-multiple
          </v-icon>
          <v-icon size="small" color="purple" @click="goToExams(item)">
            mdi-book-open
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getSubjects">
            Reset
          </v-btn>
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
    <v-snackbar v-model="addSuccessfully" :timeout="2000" color="green">
      <template v-slot:actions />
      تم إضافة المادة بنجاح
    </v-snackbar>
    <v-snackbar v-model="editSuccessfully" :timeout="2000" color="primary">
      <template v-slot:actions />
      تم تعديل بيانات المادة بنجاح
    </v-snackbar>
    <v-snackbar v-model="deleteSuccessfully" :timeout="2000" color="red">
      <template v-slot:actions />
      تم حذف المادة بنجاح
    </v-snackbar>
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

.dialog-title-text {
  font-size: 20px;
}

</style>