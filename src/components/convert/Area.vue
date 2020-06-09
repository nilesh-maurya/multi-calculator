<template>
  <div class="area wrapper-convert-element">
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
          @change="handleChange('2')"
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
    <numeric-keypad @numeric-key-event="handleInput"></numeric-keypad>
  </div>
</template>

<script>
import NumericKeypad from "../NumericKeypad";
import { getters, mutations, actions } from "../../utils/numeric-keypad-store";
import { convert } from "../../utils/conversion";

export default {
  name: "Area",
  created() {
    actions.reset();
  },
  data() {
    return {
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
      this.calculateArea(id);
    },
    handleChange(id) {
      if (this.toggleFocus === true) {
        id = "1";
      } else {
        id = "2";
      }

      this.calculateArea(id);
    },
    calculateArea(id) {
      // find conversion here
      let convertedValue;
      if (id === "1") {
        convertedValue = convert(this.first_input, "area")
          .from(this.select1.abbr)
          .to(this.select2.abbr);

        mutations.setSecondInput(convertedValue.toString(10));
      } else if (id === "2") {
        convertedValue = convert(this.second_input, "area")
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
