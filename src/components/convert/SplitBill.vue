<template>
  <div>
    <title-bar title="Split Bill"></title-bar>
    <div class="SplitBill">
      <div class="SplitBill__item  unselectable">
        <span class="SplitBill--text">Amount</span>
        <span
          :class="{ focus: toggleFocus }"
          class="g-1 SplitBill--result"
          data-id="1"
          @keydown.enter="toggleFocus = true"
          @click="toggleFocus = true"
          tabindex="0"
        >
          {{ this.formatWithCommas(amount) }}
        </span>
      </div>
      <div class="SplitBill__item unselectable">
        <span class="SplitBill--text">No. of People </span>
        <span
          :class="{ focus: !toggleFocus }"
          class="g-2 SplitBill--result"
          data-id="2"
          @keydown.enter="toggleFocus = false"
          @click="toggleFocus = false"
          tabindex="0"
        >
          {{ people }}
        </span>
      </div>
      <div class="SplitBill__item SplitBill__result">
        <span class="SplitBill--text unselectable">
          Split Amount
        </span>
        <span class="SplitBill--result">
          {{ this.formatWithCommas(result) }}
        </span>
      </div>
    </div>
    <numeric-keypad @numeric-key-event="handleInput"></numeric-keypad>
  </div>
</template>

<script>
import TitleBar from "../TitleBar";
import NumericKeypad from "../NumericKeypad";
import { getters, actions } from "../../utils/numeric-keypad-store";
import { formatNumber, roundNumber } from "../../utils/math_util";
import { store_data, apply_data } from "../../utils/local_storage.js";

export default {
  name: "SplitBill",
  created() {
    apply_data(this, "SplitBill");
  },
  data() {
    return {
      toggleFocus: true
    };
  },
  computed: {
    amount() {
      return getters.getFirstInput();
    },
    people() {
      return getters.getSecondInput();
    },
    result() {
      const amount = parseFloat(this.amount);
      const people = parseInt(this.people);

      let splitAmt = amount;
      if (people > 0) {
        splitAmt = +roundNumber(amount / people, 4);
      }

      // store in local storage
      store_data({
        firstInput: amount,
        secondInput: people,
        measure: "SplitBill"
      });

      return splitAmt;
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
          if (id !== "2") {
            actions.decimal(id);
          }
          break;
        }
        default: {
          if (id === "2") {
            if (parseInt(this.people + key) > 1000) return;
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
.SplitBill .focus {
  color: #09b464;
}

.SplitBill {
  margin-top: 30px;
}

.SplitBill__item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px 0;
  font-size: 18px;
}
</style>
