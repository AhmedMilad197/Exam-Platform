<script setup>
import {ref, toRef, computed} from 'vue'

const props = defineProps(
  ['show', 'question']
);

function update()
{
  currentQuestion.value = document.getElementById('test').value;
}

</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="props.show" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Question</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="First name"
              class="ml-2 mr-2"
              :value="currentQuestion"
              @input="update()"
              id="test"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="$emit('close')">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="update()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>

</style>
