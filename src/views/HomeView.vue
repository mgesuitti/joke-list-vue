<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HomeDashboard msg="Welcome to this Vue.js + TypeScript App example" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeDashboard from "@/components/HomeDashboard.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HomeDashboard,
  },
});
</script>
