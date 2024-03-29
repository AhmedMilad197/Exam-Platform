<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import SubjectService from '@/services/SubjectService'
import router from '@/router';

const route = useRoute();
const id = ref();
const subjectName = ref();
const subjectDescription = ref();
const units = ref();
const dialog =  ref(false);
const snackbar = ref(false);
const deletedSuccessfully = ref(false);

async function getSubject (subjectId) {
  try {
    const response = await SubjectService.show({
      id: subjectId
    });
    id.value = response.data.id;
    subjectName.value = response.data.name;
    subjectDescription.value = response.data.description;
    units.value = response.data.unit;
  } catch (error) {
    return {
      message: error.message
    }
  }
}

onMounted(() => {
  getSubject(route.params.id);
})

function navigateTo (route) {
  router.push(route);
}

async function deleteSubject(subjectId) {
  try {
    const response = await SubjectService.delete({
      id: subjectId
    });
    dialog.value = false;
    deletedSuccessfully.value = true;
    navigateTo({
      name: 'subjects'
    });
  } catch (error) {
    dialog.value = false;
    snackbar.value = true;
    return {
      message: error.message
    }
  }
}

</script>

<template>
  <v-locale-provider rtl>

    <v-card
      class="mx-auto"
      max-width="1000"
      max-height="100vh"
      >
      <v-toolbar color="purple">
        <v-toolbar-title>تفاصيل المادة</v-toolbar-title>
      </v-toolbar>
      <v-table
        fixed-header
        height="100%"
        density="comfortable"
      >
        <thead>
          <tr>
            <th class="text-right">
              البيانات
            </th>
            <th class="text-right">
              القيمة
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style="height: 50px;">
            <td>
              <b>
                اسم المادة
              </b>
            </td>
            <td>
              {{ subjectName }}
            </td>
          </tr>
          <tr style="height: 50px;">
            <td>
              <b>
                وصف المادة
              </b>
            </td>
            <td>
              {{ subjectDescription }}
            </td>
          </tr>
          <tr style="height: 50px;">
            <td>
              <b>
                عدد الوحدات
              </b>
            </td>
            <td>
              {{ units }}
            </td>
          </tr>
        </tbody>
      </v-table>
      <div class="d-flex">
        <v-btn color="red-darken-4" class="my-4 mx-2" @click="navigateTo({name: 'subject-teacher', params: {course: id}})">اضافة استاذ</v-btn>
        <v-btn color="green" class="my-4 mx-2" @click="navigateTo({name: 'subject-update', params: {id: id}})">تعديل</v-btn>
  
        <div class="text-center pa-4">
      <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" color="red">
            حذف
          </v-btn>
        </template>
  
        <v-card
          prepend-icon="mdi-alert"
          text="هل تريد حذف المادة؟"
          title="حذف المادة"
        >
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn @click="deleteSubject(id)" color="red">
              موافق
            </v-btn>
  
            <v-btn @click="dialog = false">
              اغلاق
            </v-btn>
  
          </template>
        </v-card>
      </v-dialog>
    </div>
        <v-btn color="primary" class="my-4 mx-2" @click="router.go(-1)">العودة</v-btn>
      </div>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      multi-line
    >
      لا يمكن حذف هذه المادة

      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="snackbar = false"
        >
          اغلاق
        </v-btn>
      </template>
    </v-snackbar>
    
    <v-snackbar
      :timeout="2000"
      color="success"
      variant="outlined"
      v-model="deletedSuccessfully"
    >
      <template v-slot:actions />
        تم حذف المادة بنجاح
    </v-snackbar>
  </v-locale-provider>
</template>

<style scoped>
.error {
  color: red;
}

.v-sheet {
  border: 1px rgb(185, 175, 175) solid;
  border-radius: 2px;
}

.slot-text-center {
  text-align: center;
}
</style>