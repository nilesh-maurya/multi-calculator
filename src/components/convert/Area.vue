<template>
  <div class="area wrapper-convert-element">
    <title-bar title="Area"></title-bar>
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
        class="g-1 area__input-1"
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
        class="g-2 area__input-2"
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
  name: "Area",
  mixins: [convertMixin],
  data() {
    return {
      measure: "area",
      toggleFocus: true,
      select1: { unit: "Square kilometer", abbr: "km2" },
      select2: { unit: "Sqaure meter", abbr: "m2" },
      items: [
        { unit: "Square kilometer", abbr: "km2" },
        { unit: "Hectare", abbr: "ha" },
        { unit: "Square meter", abbr: "m2" },
        { unit: "Square decimeter", abbr: "dm2" },
        { unit: "Square centimeter", abbr: "cm2" },
        { unit: "Square millimeter", abbr: "mm2" },
        { unit: "Square Micron", abbr: "um2" },
        { unit: "Square inch", abbr: "in2" },
        { unit: "Square foot", abbr: "ft2" },
        { unit: "Acre", abbr: "ac" },
        { unit: "Square yard", abbr: "yd2" },
        { unit: "Square mile", abbr: "mi2" }
      ]
    };
  },
  components: {
    NumericKeypad,
    TitleBar
  }
};
</script>
