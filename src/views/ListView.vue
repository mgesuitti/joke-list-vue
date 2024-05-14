<template>
  <div class="list">
    <JokeListStore />
  </div>
</template>

<script>
import JokeListStore from "@/components/JokeListStore.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListView",
  components: {
    JokeListStore,
  },
});
</script>
