<template>
  <div>
    <title-bar title="Discount"></title-bar>
    <div class="discount">
      <div class="discount__item discount__price unselectable">
        <span class="discount__price--text">Original price</span>
        <span
          :class="{ focus: toggleFocus }"
          class="g-1 discount__price--result"
          data-id="1"
          @keydown.enter="toggleFocus = true"
          @click="toggleFocus = true"
          tabindex="0"
        >
          {{ this.formatWithCommas(original_price) }}
        </span>
      </div>
      <div class="discount__item discount__off unselectable">
        <span class="discount__off--text">Discount (% off)</span>
        <span
          :class="{ focus: !toggleFocus }"
          class="g-2 discount__off--result"
          data-id="2"
          @keydown.enter="toggleFocus = false"
          @click="toggleFocus = false"
          tabindex="0"
        >
          {{ discount }}
        </span>
      </div>
      <div class="discount__item discount__total">
        <span class="discount__total--text unselectable">Final price</span>
        <span class="discount__total--result">
          {{ this.formatWithCommas(result.final_price) }}
        </span>
      </div>

      <div class="discount__item discount__save">
        <span>You save {{ this.formatWithCommas(result.save) }}</span>
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
    apply_data(this, "discount");
  },
  data() {
    return {
      toggleFocus: true
    };
  },
  computed: {
    original_price() {
      return getters.getFirstInput();
    },
    discount() {
      return getters.getSecondInput();
    },
    result() {
      const original_price = parseFloat(this.original_price);
      const discount = parseFloat(this.discount);

      const save = +roundNumber((original_price * discount) / 100, 4);
      const final_price = +roundNumber(original_price - save, 4);

      // save to localstorage
      store_data({
        firstInput: this.original_price,
        secondInput: this.discount,
        measure: "discount"
      });

      return { save, final_price };
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
            let check = parseFloat(this.discount + key) <= 100.0;
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
.discount .focus {
  color: #09b464;
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
