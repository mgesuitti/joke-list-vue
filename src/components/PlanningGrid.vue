<template>
  <div class="scheduler">
    <table>
      <thead>
        <tr>
          <th v-for="(day, dayIndex) in days" :key="dayIndex">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hourBlock, hourIndex) in schedule" :key="hourIndex">
          <td
            v-for="(items, dayIndex) in hourBlock"
            :key="`${dayIndex}`"
            @contextmenu.prevent="handleContextMenu(dayIndex, hourIndex)"
          >
            <div
              @click="handleClick(dayIndex, hourIndex)"
              @keyup.enter="handleKeyUp()"
              tabindex="0"
            >
              <div
                v-for="(item, itemIndex) in items"
                :key="`${hourIndex}-${dayIndex}-${itemIndex}`"
              >
                {{ item ? `${item.title} (${item.start} - ${item.end})` : "" }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PlannableEvent } from "../models/PlannableEvent";

interface PlanningGridData {
  schedule: Array<Array<Array<PlannableEvent>>>;
  days: Array<string>;
  selectedSlot:
    | {
        day: number;
        hour: number;
      }
    | undefined;
}

export default defineComponent({
  name: "PlanningGrid",
  props: {
    events: {
      type: Array as PropType<PlannableEvent[]>,
      required: true,
    },
  },
  data(): PlanningGridData {
    return {
      schedule: Array(24)
        .fill(null)
        .map(() => Array(7).fill([])), // 24 hours, 7 days
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      selectedSlot: undefined,
    };
  },
  mounted() {
    this.loadEvents();
  },
  methods: {
    loadEvents() {
      this.events.forEach((event: PlannableEvent) => {
        const startHour = parseInt(event.start.split(":")[0]);
        const duration = parseInt(event.end.split(":")[0]) - startHour;
        for (let hour = startHour; hour < startHour + duration; hour++) {
          this.schedule[hour][event.day] = [event];
        }
      });
    },
    handleClick(day: number, hour: number) {
      this.selectedSlot = {
        day,
        hour,
      };
    },
    handleContextMenu(day: number, hour: number) {
      this.removeEvent(day, hour);
    },
    handleKeyUp() {
      if (this.selectedSlot) {
        const event: PlannableEvent = {
          title: "New Meeting",
          day: this.selectedSlot.day,
          start: `${this.selectedSlot.hour}:00`,
          end: `${this.selectedSlot.hour + 1}:00`,
        };
        this.addEvent(event);
      }
    },
    addEvent(event: PlannableEvent) {
      const startHour = parseInt(event.start.split(":")[0]);
      this.schedule[startHour][event.day] = [
        ...this.schedule[startHour][event.day],
        event,
      ];
    },
    removeEvent(day: number, hour: number) {
      this.schedule[hour][day].splice(this.schedule[hour][day].length - 1, 1);
    },
  },
});
</script>

<style scoped lang="scss">
.scheduler {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
  max-width: 140px;
}

td > div {
  cursor: pointer;
  min-height: 50px;

  &:focus {
    border: 1px solid blue;
  }

  &:hover {
    background-color: #eee;
  }
}
</style>
