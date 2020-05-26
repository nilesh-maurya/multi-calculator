<template>
  <div>
    <div class="percentage">
      <div class="percentage__item percentage__total unselectable">
        <span class="percentage__total--text">Total</span>
        <span
          :class="{ focus: toggleFocus }"
          class="g-1 percentage__total--result"
          data-id="1"
          @click="toggleFocus = true"
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
          @click="toggleFocus = false"
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
import { roundNumber, formatNumber } from "../../utils/math_util.js";
import NumericKeypad from "../NumericKeypad.vue";
import { getters, actions } from "../../utils/numeric-keypad-store.js";

export default {
  created() {
    actions.reset();
  },
  data() {
    return {
      toggleFocus: true,
      result: 0
    };
  },
  computed: {
    total() {
      return getters.getFirstInput();
    },
    percentage() {
      return getters.getSecondInput();
    }
  },
  methods: {
    calculatePercentage() {
      const total = parseFloat(this.total);
      const percentage = parseFloat(this.percentage);

      this.result = +roundNumber((total * percentage) / 100, 4);
    },
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
      this.calculatePercentage();
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
.percentage .focus {
  background: linear-gradient(210deg, #21dd85 0%, #09b464 100%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
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
