<script setup>
import imgUrl from '../assets/landing_page_background.jpg'
import visionImgUrl from '../assets/vision.jpg'
import goalsImgUrl from '../assets/goals.jpg'
import logoImgUrl from '../assets/exam-logo.png'
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const items = ref([
  {
    title: 'تسجيل الدخول للأستاذ',
    value: {
      name: 'login'
    }
  },
  {
    title: 'تسجيل الدخول للطالب',
    value: {
      name: 'student-login'
    }
  }
]);
const drawer = ref(false);
const logoutDialog = ref(true);

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

</script>

<template>
  <v-locale-provider rtl>

    <v-layout class="mt-10">
      <v-locale-provider rtl>
        <v-app-bar
          color="primary"
          prominent
          height="100"
        >
          <v-app-bar-nav-icon 
            @click.stop="drawer = !drawer"
            class="tab"
          />
          <v-toolbar-title>
            <span class="title-text" @click="navigateTo({ name: 'LandingPageView' })">
              <div class="d-flex">
                <!-- <div class="my-auto">
                  <img :src="logoImgUrl" width="100px" height="100px" alt="Logo">
                </div> -->
                <div class="my-auto">
                Exam Platform
              </div>
              </div>
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

    <div class="d-flex flex-column" width="1400px">
      <div class="mx-auto mt-10">
        <!-- <img :src="imgUrl" alt="Logo" style="width: 1400px; height: 400px;"> -->
        <img :src="imgUrl" alt="Logo" style="max-width: 100%; height: auto;">
      </div>
      <div class="d-flex my-15">
        <div class="d-flex mx-auto">
          <div class="image">
            <!-- <img :src="goalsImgUrl" alt="Logo"> -->
            <img :src="goalsImgUrl" alt="Logo" style="max-width: 100%; height: auto;">
          </div>
          <div class="content mx-4">
            <h3 style="color: #3366cc; font-size: 25px;">رؤيتنا:</h3>
            <p style="font-size: 20px">تهدف منصة الامتحانات الإلكترونية إلى تحويل عملية التقييم والامتحانات إلى تجربة
              رائدة
              ومبتكرة في العصر الرقمي. نرى مستقبلًا حيث لا يكون هناك حاجة للورق والقلم والتصحيح اليدوي، حيث تتم جميع
              العمليات بشكل آلي وفعال. نحن نسعى لأن نكون الخيار الأول للمؤسسات التعليمية عندما يتعلق الأمر بالامتحانات
              الإلكترونية، ونسعى لتحقيق الابتكار المستدام والتطور المستمر لتلبية احتياجات المستخدمين وتطلعاتهم. ستكون
              المنصة
              الإلكترونية للامتحانات أداة قوية لتحقيق التكافؤ وتعزيز العدالة التعليمية.
            </p>
          </div>
        </div>
      </div>

      <div class="d-flex my-15">
        <div class="d-flex mx-auto">
          <div class="content">
            <h3 style="color: #3366cc; font-size: 25px;">أهدافنا:</h3>
            <ol style="font-size: 20px;">
              <li class="mt-4">توفير بيئة افتراضية آمنة وموثوقة.</li>
              <li class="mt-4">تطوير واجهة مستخدم متطورة وسهلة الاستخدام.</li>
              <li class="mt-4">مرونة وتكيف مع البيئات التعليمية المختلفة.</li>
              <li class="mt-4">دعم التقييم الإلكتروني.</li>
              <li class="mt-4">الابتكار المستدام والتحسين المستمر.</li>
            </ol>
          </div>
          <div class="image">
            <!-- <img :src="visionImgUrl" alt="Logo"> -->
            <img :src="visionImgUrl" alt="Logo" style="max-width: 100%; height: auto;">
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex bottom-bar-body">
        <div class="bottom-bar my-4">
          <h3 class="text-color" style="font-size: 25px">للتواصل:</h3>
          <div>
            <div class="d-flex">
              <v-icon class="me-2 ml-2 my-auto" size="small" color="blue">
                mdi-facebook
              </v-icon>
              <div>
                <p class="text-color">
                  https://www.facebook.com/ExamPlatform
                </p>
              </div>
            </div>
            <div class="d-flex">
              <v-icon class="me-2 ml-2 my-auto" size="small" color="green">
                mdi-phone
              </v-icon>
              <div>
                <p class="text-color">
                  218-91-4212678
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </v-locale-provider>
</template>

<style scoped>

.container {
  max-width: 100%;
  padding: 0 20px;
  margin: 0 auto;
}

/* Add media queries for different screen sizes */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

.bisque-background {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
}

.content {
  width: 400px;
}

.bottom-bar-body {
  background-color: rgb(88,89,91);
}

.bottom-bar {
  margin-right: 100px;
}

.text-color {
  font-size: 20px;
  color: white;
}

.title-text {
  cursor: pointer;
  font-size: 40px;
}

.tab >>> .mdi-menu {
  --v-icon-size-multiplier: 1.5;
}

</style>