<script setup>
import {ref, computed, onMounted} from 'vue'

// set the teacher id to required.
const props = defineProps([
  'id', 
  'name', 
  'username', 
  'last_login', 
  'active',
  'show'
]);

</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="props.show" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Teacher Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="d-flex">
              <div class="d-flex flex-column">
                <span class="text-h7">
                  <b>
                    id:
                  </b>
                  {{ id }}
                </span>
                <span class="text-h7">
                  <b>
                    Name:
                  </b>
                  {{ name }}
                </span>
                <span class="text-h7">
                  <b>
                    UserName:
                  </b>
                  {{ username }}
                </span>
                <span class="text-h7">
                  <b>
                    lastlogin:
                  </b>
                  {{ last_login }}
                </span>
                <span class="text-h7">
                  <b>
                    active:
                  </b>
                  {{ active }}
                </span>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex">
                <v-btn color="red" class="my-auto">BLOCK</v-btn>
              </div>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions class="mx-auto">
          <v-btn color="blue" @click="$emit('close')">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>

</style>
