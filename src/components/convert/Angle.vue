<template>
  <div class="angle wrapper-convert-element">
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
        class="g-1 angle__input-1"
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
        class="g-2 angle__input-2"
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
  name: "Angle",
  created() {
    actions.reset();
  },
  data() {
    return {
      toggleFocus: true,
      select1: { unit: "Degree", abbr: "deg" },
      select2: { unit: "Radian", abbr: "rad" },
      items: [
        { unit: "Degree", abbr: "deg" },
        { unit: "Radian", abbr: "rad" },
        { unit: "Gradian", abbr: "grad" },
        { unit: "Minute of arc", abbr: "arcmin" },
        { unit: "Second of arc", abbr: "arcsec" }
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
      this.calculateAngle(id);
    },
    handleChange(id) {
      if (this.toggleFocus === true) {
        id = "1";
      } else {
        id = "2";
      }

      this.calculateAngle(id);
    },
    calculateAngle(id) {
      // find conversion here
      let convertedValue;
      if (id === "1") {
        convertedValue = convert(this.first_input, "angle")
          .from(this.select1.abbr)
          .to(this.select2.abbr);

        mutations.setSecondInput(convertedValue.toString(10));
      } else if (id === "2") {
        convertedValue = convert(this.second_input, "angle")
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
