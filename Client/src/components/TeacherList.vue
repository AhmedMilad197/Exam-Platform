<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import TeacherService from '@/services/TeacherService'

const selectedItem = ref();
const router = useRouter();
const id = ref();
const show = ref(false);
const name = ref();
const username = ref();
const last_login = ref();
const active = ref();
const teachers = ref();
const blockedSuccessfully = ref(false);
const dialogBlock = ref(false);
const editedIndex = ref(-1)

const snackbar = ref(false);

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

async function blockTeacher() {
  try {
    const teacher = Object.assign({}, editedItem.value)
    console.log(teacher);
    const response = await TeacherService.block({
      'teacherId': teacher.id
    });
    blockTeacherConfirmation.value = false;
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
  index();
});

</script>

<template>
  <!-- <div>
    <v-card
      class="mx-auto"
      max-width="1000"
      max-height="100vh"
      >
      <v-toolbar color="purple">
        <v-toolbar-title>Teachers List</v-toolbar-title>
      </v-toolbar>
      <v-table
        fixed-header
        height="100%"
        density="comfortable"
      >
        <thead>
          <tr>
            <th class="text-left">
              Teacher
            </th>
            <th class="text-left">
              ID
            </th>
            <th class="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="teacher in teachers"
            :key="teacher.id"
            style="height: 50px;"
          >
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.id }}</td>
            <td>
              <div class="d-flex">
                <div class="mx-auto">
                  <v-btn color="yellow" class="mr-4" @click="navigateTo({ name: 'teacher', params: {id: teacher.id} })">VIEW</v-btn>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div> -->

  <v-locale-provider rtl>

    <v-data-table :headers="headers" :items="teachers">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>المدرسين</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5"> بيانات المدرس </span>
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
        <v-icon class="me-2" size="small" @click="editItem(item)" color="blue">
          mdi-eye-arrow-right
        </v-icon>
        <v-icon size="small" @click="selectTeacherToBlock(item)" color="red">
          mdi-cancel
        </v-icon>
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
  </v-locale-provider>

</template>

<style scoped>
.no-select {
  pointer-events: none;
}
</style>