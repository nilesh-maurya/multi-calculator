<template>
  <div>
    <div class="discount">
      <div class="discount__item discount__price unselectable">
        <span class="discount__price--text">Original price</span>
        <span
          :class="{ focus: toggleFocus }"
          class="g-1 discount__price--result"
          id="original_price"
          @click="toggleFocus = true"
        >
          {{ original_price }}
        </span>
      </div>
      <div class="discount__item discount__off unselectable">
        <span class="discount__off--text">Discount (% off)</span>
        <span
          :class="{ focus: !toggleFocus }"
          class="g-1 discount__off--result"
          id="discount_off"
          @click="toggleFocus = false"
        >
          {{ discount }}
        </span>
      </div>
      <div class="discount__item discount__total">
        <span class="discount__total--text unselectable">Final price</span>
        <span class="discount__total--result">{{ final_price }}</span>
      </div>

      <div class="discount__item discount__save">
        <span>You save {{ save }}</span>
      </div>
    </div>
    <numeric-keypad @click-numeric-key="handleInput"></numeric-keypad>
  </div>
</template>

<script>
import { roundNumber } from "../../utils/math_util.js";
import NumericKeypad from "../NumericKeypad.vue";

export default {
  data() {
    return {
      toggleFocus: true,
      original_price: "100",
      discount: "10",
      final_price: 0,
      save: 0
    };
  },
  methods: {
    calculateDiscount() {
      const original_price = parseFloat(this.original_price);
      const discount = parseFloat(this.discount);

      this.save = +(roundNumber((original_price * discount) / 100, 4));
      this.final_price = +(roundNumber(original_price - this.save, 4));
    },
    handleInput(value) {
      const focusElement = document.querySelector(".focus");
      switch (value) {
        case "AC": {
          if (focusElement.id === "original_price") {
            this.original_price = "0";
          } else {
            this.discount = "0";
          }

          break;
        }
        case "BACKSPACE": {
          if (
            this.original_price !== "0" &&
            focusElement.id === "original_price"
          ) {
            this.original_price =
              this.original_price.length === 1
                ? "0"
                : this.original_price.slice(0, -1);
          } else if (
            this.discount !== "0" &&
            focusElement.id === "discount_off"
          ) {
            this.discount =
              this.discount.length === 1 ? "0" : this.discount.slice(0, -1);
          }
          break;
        }
        case ".": {
          if (
            focusElement.id === "original_price" &&
            this.original_price.indexOf(".") === -1
          ) {
            this.original_price += ".";
          } else if (
            focusElement.id === "discount_off" &&
            this.discount.indexOf(".") === -1
          ) {
            this.discount += ".";
          }
          break;
        }
        default: {
          if (focusElement.id === "original_price") {
            if (this.original_price.length > 18) {
              return;
            }
            if (this.original_price === "0") {
              this.original_price = value;
            } else {
              this.original_price = this.original_price + value;
            }
          } else if (focusElement.id === "discount_off") {
            if (this.discount.length > 6) {
              return;
            }
            if (this.discount === "0") {
              this.discount = value;
            } else {
              const check = parseFloat(this.discount + value) <= 100.0;
              if (check) {
                this.discount = this.discount + value;
              }
            }
          }
        }
      }
      this.calculateDiscount();
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

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
