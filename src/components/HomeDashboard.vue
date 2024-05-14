<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>This project was created to test some Vue.js features</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeDashboard",
  props: {
    msg: String,
  },
});
</script>

<style scoped lang="scss"></style>
