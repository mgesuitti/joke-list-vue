<template>
  <v-app>
    <v-main>
      <v-container>
        <v-list>
          <v-subheader>The List</v-subheader>
          <v-list-item-group>
            <v-list-item v-for="(joke, index) in jokes" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ joke.setup }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ joke.punchline }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { Joke } from "@/models/Joke";

const jokes = ref<Joke[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/jokes/ten"
    );
    jokes.value = response.data;
  } catch (error) {
    console.error("There was an error fetching the jokes:", error);
  }
});
</script>
