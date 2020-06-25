<template>
  <div class="mass wrapper-convert-element">
    <title-bar title="Mass"></title-bar>
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
        class="g-1 mass__input-1"
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
        class="g-2 mass__input-2"
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
import TitleBar from "../TitleBar.vue";
import NumericKeypad from "../NumericKeypad";
import convertMixin from "../../mixins/convertMixin";

export default {
  name: "Mass",
  mixins: [convertMixin],
  data() {
    return {
      measure: "mass",
      toggleFocus: true,
      select1: { unit: "Gram", abbr: "g" },
      select2: { unit: "Kilogram", abbr: "kg" },
      items: [
        { unit: "Tonne", abbr: "t" },
        { unit: "Quintal", abbr: "q" },
        { unit: "Kilogram", abbr: "kg" },
        { unit: "Gram", abbr: "g" },
        { unit: "Milligram", abbr: "mg" },
        { unit: "Microgram", abbr: "ug" },
        { unit: "Caret", abbr: "ct" },
        { unit: "Grain", abbr: "gr" },
        { unit: "Dram", abbr: "dr" },
        { unit: "Ounce", abbr: "oz" },
        { unit: "Pound", abbr: "lb" },
        { unit: "Stone", abbr: "st" },
        { unit: "hundredweight (short)", abbr: "s-cwt" },
        { unit: "hundredweight (long)", abbr: "l-cwt" },
        { unit: "Short ton", abbr: "s.t" },
        { unit: "Long ton", abbr: "l.t" }
      ]
    };
  },
  components: {
    NumericKeypad,
    TitleBar
  }
};
</script>
