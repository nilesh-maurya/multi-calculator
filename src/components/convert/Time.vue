<template>
  <div class="time wrapper-convert-element">
    <v-row align="center" class="wrapper__item">
      <v-col cols="4">
        <v-select
          v-model="select1"
          :items="items"
          item-text="unit"
          item-value="abbr"
          item-color="green"
          :hint="select1.abbr"
          persistent-hint
          return-object
          color="#09b464"
          @change="handleChange('1', measure)"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: toggleFocus }"
        class="g-1 time__input-1"
        data-id="1"
        @keydown.enter="toggleFocus = true"
        @click="toggleFocus = true"
        tabindex="0"
      >
        {{ first_input }}
      </span>
    </v-row>
    <v-row align="center" class="wrapper__item">
      <v-col cols="4">
        <v-select
          v-model="select2"
          :items="items"
          item-text="unit"
          item-value="abbr"
          item-color="green"
          :hint="select2.abbr"
          persistent-hint
          return-object
          color="#09b464"
          @change="handleChange('2', measure)"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: !toggleFocus }"
        class="g-2 time__input-2"
        data-id="2"
        @keydown.enter="toggleFocus = false"
        @click="toggleFocus = false"
        tabindex="0"
      >
        {{ second_input }}
      </span>
    </v-row>
    <numeric-keypad
      @numeric-key-event="handleInput($event, measure)"
    ></numeric-keypad>
  </div>
</template>

<script>
import NumericKeypad from "../NumericKeypad";
import convertMixin from "../../mixins/convertMixin";

export default {
  name: "Time",
  mixins: [convertMixin],
  data() {
    return {
      measure: "time",
      toggleFocus: true,
      select1: { unit: "Decade", abbr: "decade" },
      select2: { unit: "year", abbr: "year" },
      items: [
        { unit: "Century", abbr: "century" },
        { unit: "Decade", abbr: "decade" },
        { unit: "Year", abbr: "year" },
        { unit: "Month", abbr: "month" },
        { unit: "Week", abbr: "week" },
        { unit: "Day", abbr: "day" },
        { unit: "Hour", abbr: "hour" },
        { unit: "Minute", abbr: "minute" },
        { unit: "Second", abbr: "s" },
        { unit: "Millisecond", abbr: "ms" },
        { unit: "Microsecond", abbr: "us" },
        { unit: "Picosecond", abbr: "ps" }
      ]
    };
  },
  components: {
    NumericKeypad
  }
};
</script>
