<template>
  <div class="volume wrapper-convert-element">
    <title-bar title="Volume"></title-bar>
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
        class="g-1 volume__input-1"
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
        class="g-2 volume__input-2"
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
import NumericKeypad from "../keypads/NumericKeypad";
import convertMixin from "../../mixins/convertMixin";

export default {
  name: "Volume",
  mixins: [convertMixin],
  data() {
    return {
      measure: "volume",
      toggleFocus: true,
      select1: { unit: "liter", abbr: "l" },
      select2: { unit: "milliliter", abbr: "ml" },
      items: [
        { unit: "Cubic meter", abbr: "m3" },
        { unit: "Cubic decimeter", abbr: "dm3" },
        { unit: "Cubic centimeter", abbr: "cm3" },
        { unit: "Cubic millimeter", abbr: "mm3" },
        { unit: "Liter", abbr: "l" },
        { unit: "deciliter", abbr: "dl" },
        { unit: "centiliter", abbr: "cl" },
        { unit: "milliliter", abbr: "ml" },
        { unit: "Hectoliter", abbr: "hl" },
        { unit: "Imperial fluid ounce", abbr: "fl-oz" },
        { unit: "Imperial teaspoon", abbr: "tsp" },
        { unit: "Imperial tablespoon", abbr: "tbp" },
        { unit: "Imperial cup", abbr: "cup" },
        { unit: "Imperial pint", abbr: "pnt" },
        { unit: "Imperial quart", abbr: "qt" },
        { unit: "Imperial gallons", abbr: "gal" },
        { unit: "Cubic foot", abbr: "ft3" },
        { unit: "Cubic inch", abbr: "in3" }
      ]
    };
  },
  components: {
    NumericKeypad,
    TitleBar
  }
};
</script>
