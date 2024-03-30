<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import SubjectService from '@/services/SubjectService'

const router = useRouter()
const subjects = ref();
const dialog= ref(false);
const dialogDelete = ref(false);
const editSubjectDialog = ref(false);
const editedItem = ref({
    id: 0,
    content : '',
    description : '',
    unit : null,
})
const defaultItem = ref({
  content : '',
  description : '',
  unit : null,
})

const headers = ref([
  { title: 'id', key: 'id', align: 'start' },
  { title: 'المادة', sortable: false, key: 'name' },
  { title: 'الوحدات', key: 'unit' },
  { title: 'Actions', key: 'actions', sortable: false },
])
const editedIndex = ref(-1)

function navigateTo (route) {
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

function editItem (item) {
  editedIndex.value = subjects.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  editSubjectDialog.value = true;
}

function deleteItem (item) {
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
      active: true,
      description: subject.description,
      image: '/todo-later',
      unit: subject.unit,
    });
    getSubjects();
  } catch (err) {
    return {
      message: err.message
    }
  }
}

async function update (subject) {
  try {
    const response = await SubjectService.update({
      id: subject.id,
      name: subject.name,
      description: subject.description,
      unit: subject.unit,
    }, subject.id);
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function save () {
  AddSubject(editedItem.value);
  close()
}

function updateSubject () {
  update(editedItem.value);
  Object.assign(subjects.value[editedIndex.value], editedItem.value)
  close();
}

async function destroy(subjectId) {
  try {
    const response = await SubjectService.delete({
      id: subjectId
    });
    getSubjects();
    dialog.value = false;
    deletedSuccessfully.value = true;
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

function closeDelete () {
  dialogDelete.value = false
  editedItem.value = defaultItem.value;
}

</script>

<template>
  <v-locale-provider rtl>
  <!-- <div>
    <v-card
      class="mx-auto"
      max-width="1000"
      max-height="100vh"
      >
      <div class="d-flex">
        <v-spacer/>
        <v-btn color="primary" class="my-4 mx-4" @click="navigateTo({name: 'add-subject'})">ADD subject</v-btn>
      </div>
      <v-toolbar color="purple">
        <v-toolbar-title>subjects List</v-toolbar-title>
      </v-toolbar>
      <v-table
        fixed-header
        height="100%"
        density="comfortable"
      >
        <thead>
          <tr>
            <th class="text-left">
              Subject
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
            v-for="subject in subjects"
            :key="subject.id"
            style="height: 50px;"
          >
            <td>{{ subject.name }}</td>
            <td>{{ subject.id }}</td>
            <td>
              <div class="d-flex">
                <div class="mx-auto">
                  <v-btn color="yellow" class="mr-4" @click="navigateTo({name: 'subject', params: {id: subject.id}})">VIEW</v-btn>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div> -->
    
    <v-data-table
      :headers="headers"
      :items="subjects"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>كل المواد</v-toolbar-title>
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
            <template v-slot:activator="{ props }">
              <v-btn
                class="mb-2 primary"
                color="white"
                dark
                v-bind="props"
                @click="console.log('test')"
              >
                إضافة مادة
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">إضافة مادة</span>
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
                        v-model="editedItem.name"
                        label="Subject"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                      sm="12"
                    >
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                      sm="12"
                    >
                    <v-combobox
                      label="units"
                      :items="['1', '2', '3', '4', '5']"
                      v-model="editedItem.unit"
                    />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <div class="d-flex">
                <div class="mx-auto mb-4">
                  <v-btn
                    class="ml-4"
                    color="green-darken-1"
                    @click="save"
                  >
                    إضافة
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    @click="close"
                  >
                    إلغاء
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-dialog>
          
          <v-dialog v-model="editSubjectDialog" max-width="500px" persistent>

            <v-card>
              <v-card-title>
                <span class="text-h5">تعديل المادة</span>
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
                        v-model="editedItem.name"
                        label="Subject"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                      sm="12"
                    >
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                      sm="12"
                    >
                    <v-combobox
                      label="units"
                      :items="['1', '2', '3', '4', '5']"
                      v-model="editedItem.unit"
                    />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <div class="d-flex">
                <div class="mx-auto mb-4">
                  <v-btn
                    class="ml-4"
                    color="green-darken-1"
                    @click="updateSubject"
                  >
                    تعديل
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    @click="close"
                  >
                    إلغاء
                  </v-btn>
                </div>
              </div>
            </v-card>

          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px" persistent>
            <v-card 
              prepend-icon="mdi-alert-circle"
              text="هل تريد حذف هذه المادة؟"
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
          color="green"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          class="ml-2"
          @click="deleteItem(item)"
          color="red"
        >
          mdi-delete
        </v-icon>
        <v-icon
          size="small"
          color="blue"
        >
          mdi-account-multiple
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="getSubjects"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-locale-provider>

</template>

<style scoped>
.primary {
  background-color: RGB(24,103,192);
}
</style>