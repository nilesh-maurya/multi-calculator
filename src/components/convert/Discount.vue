<template>
  <div>
    <div class="discount">
      <div class="discount__item discount__price unselectable">
        <span class="discount__price--text">Original price</span>
        <span
          :class="{ focus: toggleFocus }"
          class="g-1 discount__price--result"
          data-id="1"
          @click="toggleFocus = true"
        >
          {{ this.formatWithCommas(original_price) }}
        </span>
      </div>
      <div class="discount__item discount__off unselectable">
        <span class="discount__off--text">Discount (% off)</span>
        <span
          :class="{ focus: !toggleFocus }"
          class="g-1 discount__off--result"
          data-id="2"
          @click="toggleFocus = false"
        >
          {{ discount }}
        </span>
      </div>
      <div class="discount__item discount__total">
        <span class="discount__total--text unselectable">Final price</span>
        <span class="discount__total--result">
          {{ this.formatWithCommas(final_price) }}
        </span>
      </div>

      <div class="discount__item discount__save">
        <span>You save {{ this.formatWithCommas(save) }}</span>
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
      final_price: 0,
      save: 0
    };
  },
  computed: {
    original_price() {
      return getters.getFirstInput();
    },
    discount() {
      return getters.getSecondInput();
    }
  },
  methods: {
    calculateDiscount() {
      const original_price = parseFloat(this.original_price);
      const discount = parseFloat(this.discount);

      this.save = +roundNumber((original_price * discount) / 100, 4);
      this.final_price = +roundNumber(original_price - this.save, 4);
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
            let check = parseFloat(this.discount + key) <= 100.0;
            if (!check) return;
          }
          actions.number(id, key, 3);
        }
      }
      this.calculateDiscount();
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
.discount .focus {
  background: linear-gradient(210deg, #21dd85 0%, #09b464 100%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

.discount {
  margin-top: 30px;
}

.discount__item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px 0;
  font-size: 18px;
}

.discount__save {
  display: block;
  text-align: center;
  color: #bbb;
}
</style>
