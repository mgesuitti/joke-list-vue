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

<script lang="ts">
import { Joke } from "@/models/Joke";
import axios from "axios";
import { defineComponent } from "vue";

interface JokeListData {
  jokes: Array<Joke>;
}

export default defineComponent({
  name: "JokeListOptions",
  data(): JokeListData {
    return {
      jokes: [],
    };
  },
  mounted() {
    this.fetchJokes();
  },
  methods: {
    fetchJokes() {
      axios
        .get("https://official-joke-api.appspot.com/jokes/ten")
        .then((response) => {
          this.jokes = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the jokes:", error);
        });
    },
  },
});
</script>
