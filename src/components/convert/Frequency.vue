<template>
  <div class="frequency wrapper-convert-element">
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
          @change="handleChange('1', 'frequency')"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: toggleFocus }"
        class="g-1 frequency__input-1"
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
          @change="handleChange('2', 'frequency')"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: !toggleFocus }"
        class="g-2 frequency__input-2"
        data-id="2"
        @keydown.enter="toggleFocus = false"
        @click="toggleFocus = false"
        tabindex="0"
      >
        {{ second_input }}
      </span>
    </v-row>
    <numeric-keypad
      @numeric-key-event="handleInput($event, 'frequency')"
    ></numeric-keypad>
  </div>
</template>

<script>
import NumericKeypad from "../NumericKeypad";
import convertMixin from "../../mixins/convertMixin";

export default {
  name: "Frequency",
  mixins: [convertMixin],
  data() {
    return {
      toggleFocus: true,
      select1: { unit: "Hertz", abbr: "Hz" },
      select2: { unit: "millihertz", abbr: "mHz" },
      items: [
        { unit: "Millihertz", abbr: "mHz" },
        { unit: "hertz", abbr: "Hz" },
        { unit: "kilohertz", abbr: "kHz" },
        { unit: "megahertz", abbr: "MHz" },
        { unit: "Gigahertz", abbr: "GHz" },
        { unit: "Terahertz", abbr: "THz" },
        { unit: "Rotation per minute", abbr: "rpm" },
        { unit: "Degree per second", abbr: "deg/s" },
        { unit: "Radian per second", abbr: "rad/s" }
      ]
    };
  },
  components: {
    NumericKeypad
  }
};
</script>
