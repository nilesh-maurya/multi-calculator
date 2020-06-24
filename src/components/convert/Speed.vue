<template>
  <div class="speed wrapper-convert-element">
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
          @change="handleChange('1', 'speed')"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: toggleFocus }"
        class="g-1 speed__input-1"
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
          @change="handleChange('2', 'speed')"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: !toggleFocus }"
        class="g-2 speed__input-2"
        data-id="2"
        @keydown.enter="toggleFocus = false"
        @click="toggleFocus = false"
        tabindex="0"
      >
        {{ second_input }}
      </span>
    </v-row>
    <numeric-keypad
      @numeric-key-event="handleInput($event, 'speed')"
    ></numeric-keypad>
  </div>
</template>

<script>
import NumericKeypad from "../NumericKeypad";
import convertMixin from "../../mixins/convertMixin";

export default {
  name: "Speed",
  mixins: [convertMixin],
  data() {
    return {
      toggleFocus: true,
      select1: { unit: "Kilometer per hour", abbr: "km/h" },
      select2: { unit: "Meter per second", abbr: "m/s" },
      items: [
        { unit: "Lightspeed", abbr: "c" },
        { unit: "Mach", abbr: "Ma" },
        { unit: "Meter per second", abbr: "m/s" },
        { unit: "Kilometer per second", abbr: "km/s" },
        { unit: "Kilometer per hour", abbr: "km/h" },
        { unit: "Knot", abbr: "kn" },
        { unit: "Mile per hour", abbr: "mph" },
        { unit: "Foot per second", abbr: "fps" },
        { unit: "Inch per second", abbr: "ips" }
      ]
    };
  },
  components: {
    NumericKeypad
  }
};
</script>
