<template>
  <div>
    <PlanningGrid :events="events" />
  </div>
</template>

<script>
import PlanningGrid from "@/components/PlanningGrid.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SchedulerView",
  components: {
    PlanningGrid,
  },
  data() {
    return {
      events: [
        {
          title: "Test event",
          start: "10:00",
          end: "11:00",
          day: 0,
        },
      ],
    };
  },
});
</script>
