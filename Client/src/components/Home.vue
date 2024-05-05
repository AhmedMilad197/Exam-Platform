<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TeacherService from '@/services/TeacherService'
import { useUserStore } from '@/stores/user';
import imgUrl from '../assets/subject.png'

const user = useUserStore();
const router = useRouter();
const search = ref();
const items = ref([
  {
    title: 'موادي',
    value: {
      name: 'home'
    }
  },
  {
    title: 'تسجيل الخروج',
    color: 'red',
    value: {
      name: 'student-login'
    }
  },
]);
const drawer = ref(false);
const logoutDialog = ref(false);

function handleRequest (title, value) {
  if (title == 'تسجيل الخروج') {
    logoutDialog.value = true;
  } else {
    goTo(value)
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
  goTo('LandingPageView')
}

const headers = ref([
  {
    title: 'id',
    key: 'id',
    align: 'start',
  },
  {
    title: 'إسم المادة',
    sortable: false,
    key: 'name',
  },
  { title: 'وصف', key: 'description', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
]);
const editedIndex = ref(-1)
const editedItem = ref({
  id: 0,
  name: '',
  description: '',
})

function goTo(value) {
  router.push({
    name: value
  });
}

function navigateTo (item) {
  editedIndex.value = subjects.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  router.push({
    path: `/${editedItem.value.id}/exam-list`,
  });
}

const subjects = ref();

async function getSubjects () {
  try {
    const response = await TeacherService.getSubjects(user.user.id)
    console.log(response.data)
    subjects.value = response.data.Courses;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  if (user.role != 'teacher') {
    router.go(-1);
  }
  getSubjects();
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
            <span class="title-text" @click="goTo('LandingPageView')">
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
      <img :src="imgUrl" alt="Logo" style="width: 1400px; height: 396px;">
    </div>

    <v-card class="mx-auto" max-width="1000" title="البحث">
      <template v-slot:text>
        <v-text-field v-model="search" label="إبحث عن المواد" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
          single-line></v-text-field>
      </template>
      <v-data-table
        :headers="headers"
        :items="subjects"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>المواد</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          
          <v-btn 
            color="primary" 
            class="my-auto mx-4"
            @click="navigateTo(item)"
          >تفاصيل</v-btn>
  
        </template>
      </v-data-table>
    </v-card>

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

.v-sheet {
  border: 1px rgb(185, 175, 175) solid;
  border-radius: 2px;
}

.title-text {
  pointer-events: none;
  font-size: 40px;
}

</style>
