import { createStore } from "vuex";
import jokes from "./jokes";

export default createStore({
  modules: {
    jokes,
  },
});
