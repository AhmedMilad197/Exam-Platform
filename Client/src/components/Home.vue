<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateTo (subject) {
  router.push({
    path: `/questions/${subject}`,
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

const variants = ref(['math', 'phisycs']);
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col
        v-for="(variant, i) in variants"
        :key="i"
        cols="auto"
      >
        <v-card
          class="mx-auto"
          max-width="344"
          :color="getColor()"
        >
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                Subject
              </div>
              <div class="text-h6 mb-1">
                {{ variant }}
              </div>
              <div class="text-caption">See the exams related to {{ variant  }}</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn @click="navigateTo(variant)">
              Enter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>  
</template>

<style scoped>
/* h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
