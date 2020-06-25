<template>
  <div class="length wrapper-convert-element">
    <title-bar title="Length"></title-bar>
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
        class="g-1 length__input-1"
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
        class="g-2 length__input-2"
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
  name: "Length",
  mixins: [convertMixin],
  data() {
    return {
      measure: "length",
      toggleFocus: true,
      select1: { unit: "kilometer", abbr: "km" },
      select2: { unit: "Meter", abbr: "m" },
      items: [
        { unit: "kilometer", abbr: "km" },
        { unit: "Meter", abbr: "m" },
        { unit: "Decimeter", abbr: "dm" },
        { unit: "Centimeter", abbr: "cm" },
        { unit: "Millimeter", abbr: "mm" },
        { unit: "Micrometer", abbr: "um" },
        { unit: "Nanometer", abbr: "nm" },
        { unit: "Picometer", abbr: "pm" },
        { unit: "Inch", abbr: "in" },
        { unit: "Foot", abbr: "ft" },
        { unit: "Yard", abbr: "yd" },
        { unit: "Mile", abbr: "mi" },
        { unit: "Nautical mile", abbr: "nmi" },
        { unit: "Fathom", abbr: "ftm" }
      ]
    };
  },
  components: {
    NumericKeypad,
    TitleBar
  }
};
</script>
