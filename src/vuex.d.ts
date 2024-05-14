import { Store } from "vuex";
import { ComponentCustomProperties } from "vue";
import { MyState } from "./path/to/your/state/type"; // Asegúrate de ajustar la ruta y el nombre de tipo según tu configuración

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<MyState>;
  }
}
