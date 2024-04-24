<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from 'vue';

const router = useRouter();
const user = useUserStore();

function navigateTo (link) {
  router.push({
    name: link.name,
    params: link.params
  });
}

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

onMounted(() => {
  setDrawerItems();
});

</script>

<template>
  
  <v-card>
    <v-layout class="mb-15">
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
        style="z-index: 1;"
        temporary
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
    <v-locale-provider rtl>

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
  </v-card>

</template>

<style scoped>
.title-text {
  pointer-events: none;
  font-size: 40px;
}
</style>
