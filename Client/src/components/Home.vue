<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SubjectService from '@/services/SubjectService'
import { useUserStore } from '@/stores/user';

const user = useUserStore()
const router = useRouter()
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


function navigateTo (item) {
  editedIndex.value = subjects.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  router.push({
    path: `/${editedItem.value.id}/exam-list`,
  });
}

const colors = [
  "primary",
  "secondary", 
  "indigo", 
  "red", 
  "pink", 
  "purple", 
  "cyan-accent-2",
  "orange-darken-3"
];

function getColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const subjects = ref();

// TODO make this function get only the subjects related to the teacher.
async function getSubjects () {
  try {
    const response = await SubjectService.index(user)
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

</script>

<template>
  <v-locale-provider rtl>
    <!-- <v-layout column>
      <v-sheet width="800px" class="mx-auto">
        <v-toolbar color="purple">
          <v-toolbar-title>
            المواد
          </v-toolbar-title>
        </v-toolbar>
          <div v-for="(subject, i) in subjects" :key="i">
            <div class="d-flex">
              <div>
                <v-list>
                  <v-list-item
                    class="mx-4"
                  >
                    <v-list-item-title
                      class="my-2"
                    >
                      <b>
                        {{ subject.name }}
                      </b>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex">
                <v-btn 
                color="primary" 
                class="my-auto mx-4"
                @click="navigateTo(subject.id)"
                >تفاصيل</v-btn>
              </div>
            </div>
            <hr>
          </div>
      </v-sheet>
    </v-layout> -->

    <v-data-table
      :headers="headers"
      :items="subjects"
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

  </v-locale-provider>
</template>

<style scoped>
.v-sheet {
  border: 1px rgb(185, 175, 175) solid;
  border-radius: 2px;
}
</style>
