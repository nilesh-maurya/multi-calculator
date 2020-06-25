<template>
  <div>
    <title-bar title="Percentage"></title-bar>
    <div class="percentage">
      <div class="percentage__item percentage__total unselectable">
        <span class="percentage__total--text">Total</span>
        <span
          :class="{ focus: toggleFocus }"
          class="g-1 percentage__total--result"
          data-id="1"
          @keydown.enter="toggleFocus = true"
          @click="toggleFocus = true"
          tabindex="0"
        >
          {{ this.formatWithCommas(total) }}
        </span>
      </div>
      <div class="percentage__item percentage__per unselectable">
        <span class="percentage__per--text">
          Percentage
        </span>
        <span
          :class="{ focus: !toggleFocus }"
          class="g-2 percentage__per--result"
          data-id="2"
          @keydown.enter="toggleFocus = true"
          @click="toggleFocus = false"
          tabindex="0"
        >
          {{ percentage }}
        </span>
      </div>
      <div class="percentage__item percentage__result">
        <span class="percentage__result--text unselectable">
          Result
        </span>
        <span class="percentage__result--result">
          {{ this.formatWithCommas(result) }}
        </span>
      </div>
    </div>
    <numeric-keypad @numeric-key-event="handleInput"></numeric-keypad>
  </div>
</template>

<script>
import TitleBar from "../TitleBar.vue";
import { roundNumber, formatNumber } from "../../utils/math_util.js";
import NumericKeypad from "../NumericKeypad.vue";
import { getters, actions } from "../../utils/numeric-keypad-store.js";
import { store_data, apply_data } from "../../utils/local_storage";

export default {
  created() {
    apply_data(this, "percentage");
  },
  data() {
    return {
      toggleFocus: true
    };
  },
  computed: {
    total() {
      return getters.getFirstInput();
    },
    percentage() {
      return getters.getSecondInput();
    },
    result() {
      const total = parseFloat(this.total);
      const percentage = parseFloat(this.percentage);

      const result = +roundNumber((total * percentage) / 100, 4);

      store_data({
        firstInput: this.total,
        secondInput: this.percentage,
        measure: "percentage"
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
          if (id === "2") {
            let check = parseFloat(this.percentage + key) <= 100.0;
            if (!check) return;
          }
          actions.number(id, key, 3);
        }
      }
    },
    formatWithCommas(number) {
      return formatNumber(number);
    }
  },
  components: {
    NumericKeypad,
    TitleBar
  }
};
</script>

<style scoped>
.percentage .focus {
  color: #09b464;
}

.percentage {
  margin-top: 30px;
}

.percentage__item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px 0;
  font-size: 18px;
}
</style>
