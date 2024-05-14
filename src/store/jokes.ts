import { Joke } from "@/models/Joke";
import { Module } from "vuex";

interface JokeListState {
  list: Joke[];
  sortAscending: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jokeListModule: Module<JokeListState, any> = {
  state: {
    list: [],
    sortAscending: true,
  },
  mutations: {
    setJokes(state, jokes: Joke[]) {
      state.list = jokes;
    },
    addJoke(state, joke: Joke) {
      state.list.push(joke);
    },
    toggleSortOrder(state) {
      state.sortAscending = !state.sortAscending;
    },
  },
  actions: {
    fetchJokes({ commit }) {
      fetch("https://official-joke-api.appspot.com/jokes/ten")
        .then((response) => response.json())
        .then((data: Joke[]) => {
          commit("setJokes", data);
        })
        .catch((error) => console.error("Error fetching jokes:", error));
    },
    sortJokes({ state, commit }) {
      const sortedJokes = [...state.list].sort((a, b) => {
        const setupA = a.setup.toLowerCase();
        const setupB = b.setup.toLowerCase();
        if (state.sortAscending) {
          return setupA < setupB ? -1 : 1;
        } else {
          return setupA > setupB ? -1 : 1;
        }
      });
      commit("setJokes", sortedJokes);
      commit("toggleSortOrder");
    },
  },
};

export default jokeListModule;
