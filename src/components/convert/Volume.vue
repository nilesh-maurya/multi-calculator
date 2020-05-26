<template>
  <div class="volume wrapper-convert-element">
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
          @change="handleChange('1')"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: toggleFocus }"
        class="g-1 volume__input-1"
        data-id="1"
        @click="toggleFocus = true"
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
          @change="handleChange('2')"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: !toggleFocus }"
        class="g-2 volume__input-2"
        data-id="2"
        @click="toggleFocus = false"
      >
        {{ second_input }}
      </span>
    </v-row>
    <numeric-keypad @numeric-key-event="handleInput"></numeric-keypad>
  </div>
</template>

<script>
import NumericKeypad from "../NumericKeypad";
import { getters, mutations, actions } from "../../utils/numeric-keypad-store";
import { convert } from "../../utils/conversion";

export default {
  name: "Volume",
  created() {
    actions.reset();
  },
  data() {
    return {
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
  computed: {
    first_input() {
      return getters.getFirstInput();
    },
    second_input() {
      return getters.getSecondInput();
    }
  },
  methods: {
    handleInput(key) {
      const id = document.querySelector("span.focus").dataset.id;

      switch (key) {
        case "AC": {
          actions.reset(id);
          break;
        }
        case "Backspace": {
          actions.backspace(id);
          break;
        }
        case ".": {
          actions.decimal(id);
          break;
        }
        default: {
          actions.number(id, key, 10);
        }
      }
      this.calculateVolume(id);
    },
    handleChange(id) {
      if (this.toggleFocus === true) {
        id = "1";
      } else {
        id = "2";
      }

      this.calculateVolume(id);
    },
    calculateVolume(id) {
      // find conversion here
      let convertedValue;
      if (id === "1") {
        convertedValue = convert(this.first_input, "volume")
          .from(this.select1.abbr)
          .to(this.select2.abbr);

        mutations.setSecondInput(convertedValue.toString(10));
      } else if (id === "2") {
        convertedValue = convert(this.second_input, "volume")
          .from(this.select2.abbr)
          .to(this.select1.abbr);
        mutations.setFirstInput(convertedValue.toString(10));
      }
    }
  },
  components: {
    NumericKeypad
  }
};
</script>
