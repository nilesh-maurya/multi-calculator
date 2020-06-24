<template>
  <div class="bmi wrapper-convert-element">
    <v-row align="center" class="wrapper__item">
      <v-col cols="4">
        <v-select
          label="Weight"
          v-model="select1"
          :items="items1"
          item-text="unit"
          item-value="abbr"
          item-color="green"
          :hint="select1.abbr"
          persistent-hint
          return-object
          color="#09b464"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: toggleFocus }"
        class="g-1 bmi__input-1"
        data-id="1"
        @keydown.enter="toggleFocus = true"
        ref="input1"
        @click="toggleFocus = true"
        tabindex="0"
      >
        {{ first_input }}
      </span>
    </v-row>
    <v-row align="center" class="wrapper__item">
      <v-col cols="4">
        <v-select
          label="Height"
          v-model="select2"
          :items="items2"
          item-text="unit"
          item-value="abbr"
          item-color="green"
          :hint="select2.abbr"
          persistent-hint
          return-object
          color="#09b464"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: !toggleFocus }"
        class="g-2 bmi__input-2"
        data-id="2"
        @keydown.enter="toggleFocus = false"
        ref="input2"
        @click="toggleFocus = false"
        tabindex="0"
      >
        {{ second_input }}
      </span>
    </v-row>
    <v-spacer></v-spacer>
    <div class="bmi__output">BMI: {{ result.bmi }} ({{ result.category }})</div>
    <numeric-keypad @numeric-key-event="handleInput"></numeric-keypad>
  </div>
</template>

<script>
import NumericKeypad from "../NumericKeypad";
import { getters, actions } from "../../utils/numeric-keypad-store";
import { convert } from "../../utils/conversion";
import { roundNumber } from "../../utils/math_util";
import { store_data, apply_data } from "../../utils/local_storage";

export default {
  name: "BMI",
  created() {
    apply_data(this, "BMI");
  },
  data() {
    return {
      toggleFocus: true,
      select1: { unit: "Kilograms", abbr: "kg" },
      select2: { unit: "Centimeters", abbr: "cm" },
      items1: [
        { unit: "Kilograms", abbr: "kg" },
        { unit: "Pounds", abbr: "lb" }
      ],
      items2: [
        { unit: "Centimeters", abbr: "cm" },
        { unit: "Meters", abbr: "m" },
        { unit: "Feet", abbr: "ft" },
        { unit: "Inch", abbr: "in" }
      ]
    };
  },
  computed: {
    first_input() {
      return getters.getFirstInput();
    },
    second_input() {
      return getters.getSecondInput();
    },
    result() {
      const result = {};

      const weight = convert(this.first_input, "mass")
        .from(this.select1.abbr)
        .to("kg");

      const height = convert(this.second_input, "length")
        .from(this.select2.abbr)
        .to("m");

      if (weight == 0 || height == 0) {
        return { bmi: 0, category: "Underweight" };
      }

      const bmi = weight / (height * height);

      result.bmi = roundNumber(bmi, 2);

      if (bmi < 18.5) {
        result.category = "Underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        result.category = "Normal";
      } else if (bmi >= 25) {
        result.category = "Overweight";
      }

      // save into localstorage
      store_data({
        select1: this.select1,
        select2: this.select2,
        firstInput: this.first_input,
        secondInput: this.second_input,
        measure: "BMI"
      });

      return result;
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
          actions.number(id, key, 2, 4);
        }
      }
    }
  },
  components: {
    NumericKeypad
  }
};
</script>

<style scoped>
.bmi__output {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}
</style>
