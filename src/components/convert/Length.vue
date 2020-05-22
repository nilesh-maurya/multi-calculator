<template>
  <div class="length">
    <v-row align="center" class="length__item">
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
        class="g-1 length__input-1"
        data-id="1"
        @click="toggleFocus = true"
      >
        {{ first_input }}
      </span>
    </v-row>
    <v-row align="center" class="length__item">
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
        class="g-2 length__input-2"
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
  name: "Length",
  created() {
    actions.reset();
  },
  data() {
    return {
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
      this.calculateLength(id);
    },
    handleChange(id) {
      if (this.toggleFocus === true) {
        id = "1";
      } else {
        id = "2";
      }

      this.calculateLength(id);
    },
    calculateLength(id) {
      // find conversion here
      let convertedValue;
      if (id === "1") {
        convertedValue = convert(this.first_input, "length")
          .from(this.select1.abbr)
          .to(this.select2.abbr);

        mutations.setSecondInput(convertedValue.toString(10));
      } else if (id === "2") {
        convertedValue = convert(this.second_input, "length")
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

<style scoped>
::-webkit-scrollbar {
  opacity: 1;
}

.length .focus {
  background: linear-gradient(210deg, #21dd85 0%, #09b464 100%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

.length__item {
  display: flex;
  justify-content: space-between;
  margin: 0 10px 0 0;
  font-size: 18px;
}
</style>
