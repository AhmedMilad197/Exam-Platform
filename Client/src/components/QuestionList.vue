<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref, onMounted, nextTick } from 'vue'
import QuestionService from '@/services/QuestionService'
import imgUrl from '../assets/pencil2.jpg'
import { useUserStore } from "@/stores/user";

const user = useUserStore(); 
const router = useRouter();
const route = useRoute();
const dialog= ref(false);
const dialogDelete = ref(false);
const headers = ref([
  { title: 'id', key: 'id', align: 'start' },
  { title: 'السؤال', key: 'content' },
  { title: 'الأستاذ', key: 'Teacher.name' },
  { title: 'Actions', key: 'actions' },
]);
const questions = ref([]);
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

function navigateTo (path) {
  router.push(path);
}

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

const editedIndex = ref(-1)
const editedItem = ref({
    id : '',
    content : '',
    answer1 : 0,
    answer2 : 0,
    answer3 : 0,
    answer4 : 0,
})
const defaultItem = ref({
  id : '',
  content : '',
  answer1 : 0,
  answer2 : 0,
  answer3 : 0,
  answer4 : 0,
})

async function index () {
  try {
    const response = await QuestionService.index();
    questions.value = response.data;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function destroy (question_id) {
  try {
    const response = await QuestionService.delete(question_id);
    index();
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  index();
});
  
function editItem (item) {
  editedIndex.value = questions.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

function deleteItem (item) {
  editedIndex.value = questions.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}
  
function close() {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem)
    editedIndex.value = -1
  })
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

    <div class="mx-auto">
      <img :src="imgUrl" alt="Logo" style="width: 1400px; height: 450px;">
    </div>

    <v-card class="mx-auto" max-width="1000">
      <v-data-table
        :headers="headers"
        :items="questions"
        :sort-by="[{ key: 'Answer1', order: 'asc' }]"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>كل الأسئلة</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="600px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">تفاصيل السؤال</span>
                </v-card-title>
      
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="12"
                        sm="12"
                      >
                        <v-text-field
                          v-model="editedItem.content"
                          label="السؤال"
                          class="no-select"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="12"
                        sm="12"
                      >
                        <v-text-field
                          v-model="editedItem.answer1"
                          label="الإجابة الأولى"
                          class="no-select"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="12"
                        sm="12"
                      >
                        <v-text-field
                          v-model="editedItem.answer2"
                          label="الإجابة الثانية"
                          class="no-select"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="12"
                        sm="12"
                      >
                        <v-text-field
                          v-model="editedItem.answer3"
                          label="الإجابة الثالثة"
                          class="no-select"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="12"
                        sm="12"
                      >
                        <v-text-field
                          v-model="editedItem.answer4"
                          label="الإجابة الرابعة"
                          class="no-select"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
      
                <v-card>
                  <div class="d-flex">
                    <v-btn
                    color="blue-darken-1"
                    class="mx-auto mb-10"
                    @click="close"
                    >
                      إغلاق
                    </v-btn>
                  </div>
                </v-card>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card 
                prepend-icon="mdi-alert-circle"
                text="هل تريد حذف هذا سؤال؟"
                title="تأكيد"
                color="orange"
              >
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
          <v-icon
            class="me-2"
            size="small"
            @click="editItem(item)"
            color="blue"
          >
            mdi-eye-arrow-right
          </v-icon>
          <v-icon
            size="small"
            @click="deleteItem(item)"
            color="red"
          >
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
  </v-locale-provider>
</template>

<style scoped>

.list-item {
  transition: 0.5s;
}

.list-item:hover{
  background-color: bisque;
}

.no-select {
  pointer-events: none;
}

.title-text {
  cursor: pointer;
  font-size: 40px;
}

</style>
