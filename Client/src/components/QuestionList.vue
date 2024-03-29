<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref, onMounted, nextTick } from 'vue'
import QuestionService from '@/services/QuestionService'

const router = useRouter()
const route = useRoute();
const selectedItem = ref('All Questions');   

const dialog= ref(false)
const dialogDelete = ref(false)
const headers = ref([
  {
    title: 'Question',
    align: 'start',
    sortable: false,
    key: 'content',
  },
  { title: 'id', key: 'id' },
  { title: 'Answer 1', key: 'answer1' },
  { title: 'Answer 2', key: 'answer2' },
  { title: 'Answer 3', key: 'answer3' },
  { title: 'Answer 4', key: 'answer4' },
  { title: 'Actions', key: 'actions', sortable: false },
])
const questions = ref([])

const formTitle = ref('form title')
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

function navigateTo (path) {
  router.push(path);
}

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

async function update (question) {
  try {
    const response = await QuestionService.update({
    question_id: question.id,
    question_content: {
      content: question.content,
      answer1: question.answer1,
      answer2: question.answer2,
      answer3: question.answer3,
      answer4: question.answer4,
      // rightanswer: rightAnswer.value
    }
  });
  } catch (error) {
    return {
      message: error.message
    }
  }
}

  
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

function save() {
  if (editedIndex.value > -1) {
    Object.assign(questions.value[editedIndex.value], editedItem.value)
    console.log(editedItem.value);
    // update(editedItem.value);
  } else {
    questions.value.push(editedItem.value)
  }
  close()
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
<!-- <div>
  <v-card
  class="mx-auto"
  max-width="1000"
  max-height="100vh"
  >
    <v-toolbar color="purple">
      <v-toolbar-title>Questions List</v-toolbar-title>
    </v-toolbar>
    <v-table
      fixed-header
      height="100%"
      density="comfortable"
    >
      <thead>
        <tr>
          <th class="text-left">
            Question
          </th>
          <th class="text-left">
            ID
          </th>
          <th class="text-center">
            Answer4
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="question in questions"
          :key="question.id"
          style="height: 50px;"
        >
          <td>{{ question.content }}</td>
          <td>{{ question.id }}</td>
          <td>
            <div class="d-flex">
              <div class="mx-auto">
                <v-btn color="blue" class="mr-4" @click="navigateTo({name: 'edit-question', params: {id: question.id}})">EDIT</v-btn>
                <v-btn color="red" @click="destroy(question.id)">DELETE</v-btn>
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
  :items="questions"
  :sort-by="[{ key: 'Answer1', order: 'asc' }]"
>
  <template v-slot:top>
    <v-toolbar
      flat
    >
      <v-toolbar-title>System Questions</v-toolbar-title>
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
            class="mb-2"
            color="primary"
            dark
            v-bind="props"
          >
            New Question
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
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
                    label="Question"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                >
                  <v-text-field
                    v-model="editedItem.answer1"
                    label="Answer1"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                >
                  <v-text-field
                    v-model="editedItem.answer2"
                    label="Answer2"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                >
                  <v-text-field
                    v-model="editedItem.answer3"
                    label="Answer3"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                >
                  <v-text-field
                    v-model="editedItem.answer4"
                    label="Answer4"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-Answer4>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="save"
            >
              Save
            </v-btn>
          </v-card-Answer4>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
          <v-card-Answer4>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-Answer4>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </template>
  <template v-slot:item.actions="{ item }">
    <v-icon
      class="me-2"
      size="small"
      @click="editItem(item)"
    >
      mdi-pencil
    </v-icon>
    <v-icon
      size="small"
      @click="deleteItem(item)"
    >
      mdi-delete
    </v-icon>
  </template>
  <template v-slot:no-data>
    <v-btn
      color="primary"
      @click="index"
    >
      Reset
    </v-btn>
  </template>
</v-data-table>
</template>

<style scoped>

.list-item {
  transition: 0.5s;
}

.list-item:hover{
  background-color: bisque;
}

</style>
