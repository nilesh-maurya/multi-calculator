<template>
  <div class="length">
    <v-row align="center" class="length__item">
      <v-col cols="sm-4">
        <v-select v-model="item1" :items="items" color="#09b464"></v-select>
      </v-col>
      <span
        :class="{ focus: toggleFocus }"
        class="g-1 length__input-1"
        data-id="1"
        @click="toggleFocus = true"
      >
        {{ this.formatWithCommas(first_input) }}
      </span>
    </v-row>
    <v-row align="center" class="length__item">
      <v-col cols="sm-4">
        <v-select v-model="item2" :items="items" color="#09b464"></v-select>
      </v-col>
      <span
        :class="{ focus: !toggleFocus }"
        class="g-2 length__input-2"
        data-id="2"
        @click="toggleFocus = false"
      >
        {{ this.formatWithCommas(second_input) }}
      </span>
    </v-row>
    <numeric-keypad @click-numeric-key="handleInput"></numeric-keypad>
  </div>
</template>

<script>
import NumericKeypad from "../NumericKeypad";
import { formatNumber } from "../../utils/math_util";
import { getters, actions } from "../../utils/numeric-keypad-store";

export default {
  name: "Length",
  created() {
    actions.reset();
  },
  data() {
    return {
      item1: "",
      item2: "",
      toggleFocus: true,
      items: ["km", "m"]
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
      const focusElement = document.querySelector("span.focus");

      switch (key) {
        case "AC": {
          actions.reset(focusElement);
          break;
        }
        case "BACKSPACE": {
          actions.backspace(focusElement);
          break;
        }
        case ".": {
          actions.decimal(focusElement);
          break;
        }
        default: {
          if (focusElement.dataset.id === "1") {
            //
          } else if (focusElement.dataset.id === "2") {
            //
          }
          actions.number(focusElement, key);
        }
      }
      this.calculateLength();
    },
    calculateLength() {
      // find conversion here
    },
    formatWithCommas(number) {
      return formatNumber(number);
    }
  },
  components: {
    NumericKeypad
  }
};
</script>

<style scoped>
.length .focus {
  background: linear-gradient(210deg, #21dd85 0%, #09b464 100%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

.length {
  margin-top: 30px;
}

.length__item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px 0;
  font-size: 18px;
}
</style>
