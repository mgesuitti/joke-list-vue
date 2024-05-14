<template>
  <v-app>
    <v-main>
      <v-container class="joke-list_container">
        <v-text-field v-model="newJokeSetup" label="Setup"></v-text-field>
        <v-text-field
          v-model="newJokePunchline"
          label="Punchline"
        ></v-text-field>
        <div class="joke-list_buttons">
          <v-btn @click="addJoke">Add Joke</v-btn>
          <v-btn @click="sortJokes">Sort Jokes</v-btn>
        </div>

        <v-subheader class="joke-list_title">The List</v-subheader>

        <v-list classs="joke-list">
          <v-list-item-group>
            <v-list-item v-for="(joke, index) in jokes" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ joke.setup }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ joke.punchline }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-divider inset></v-divider>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Joke } from "../models/Joke";

export default defineComponent({
  data() {
    return {
      newJokeSetup: "",
      newJokePunchline: "",
    };
  },
  computed: {
    jokes(): Joke[] {
      return this.$store.state.jokes.list;
    },
  },
  methods: {
    fetchJokes() {
      this.$store.dispatch("fetchJokes");
    },
    addJoke() {
      if (!this.newJokeSetup || !this.newJokePunchline) {
        return;
      }

      const newJoke: Joke = {
        id: this.jokes.length + 1,
        setup: this.newJokeSetup,
        punchline: this.newJokePunchline,
      };
      this.$store.commit("addJoke", newJoke);
      this.newJokeSetup = "";
      this.newJokePunchline = "";
    },
    sortJokes() {
      this.$store.dispatch("sortJokes");
    },
  },
  mounted() {
    this.fetchJokes();
  },
});
</script>

<style scoped lang="scss">
.joke-list_title {
  font-size: 28px;
  font-weight: 700;
}

.joke-list_container {
  display: flex;
  flex-direction: column;
}

.joke-list_buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
