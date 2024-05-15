import { shallowMount } from "@vue/test-utils";
import JokeListOptions from "@/components/JokeListOptions.vue"; // Asegúrate de tener la ruta correcta
import flushPromises from "flush-promises";
import axios from "axios";

jest.mock("axios");

const mockJokes = [
  {
    setup: "Why did the scarecrow win an award?",
    punchline: "Because he was outstanding in his field!",
  },
  {
    setup: "Why don’t skeletons fight each other?",
    punchline: "They don’t have the guts.",
  },
];

describe("JokeListOptions.vue", () => {
  it("fetches jokes and displays them", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: mockJokes });

    const wrapper = shallowMount(JokeListOptions);

    await flushPromises();

    expect(axios.get).toHaveBeenCalledWith(
      "https://official-joke-api.appspot.com/jokes/ten"
    );
    expect(wrapper.vm.jokes).toEqual(mockJokes);

    const jokeElements = wrapper.findAll("v-list-item-title");
    expect(jokeElements.length).toBe(mockJokes.length);
    jokeElements.forEach((jokeWrapper, index) => {
      expect(jokeWrapper.text()).toBe(mockJokes[index].setup);
    });

    const punchlineElements = wrapper.findAll("v-list-item-subtitle");
    expect(punchlineElements.length).toBe(mockJokes.length);
    punchlineElements.forEach((punchlineWrapper, index) => {
      expect(punchlineWrapper.text()).toBe(mockJokes[index].punchline);
    });

    jest.restoreAllMocks(); // Restaurar todos los mocks después de la prueba
  });
});
