// this mixin will be used in convert__item component except this components
// Age, Date, BMI (2, 4), Discount (3), Percentage (3), NumeralSystem

import { getters, mutations, actions } from "../utils/numeric-keypad-store";
import { convert } from "../utils/conversion";

const mixin = {
  created() {
    actions.reset();
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
    handleInput(key, measure) {
      const id = document.querySelector("span.focus").dataset.id;

      switch (key) {
        case "Minus": {
          actions.minus(id);
          break;
        }
        case "Plus": {
          actions.plus(id);
          break;
        }
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
      this.calculate(id, measure);
    },
    handleChange(id, measure) {
      if (this.toggleFocus === true) {
        id = "1";
      } else {
        id = "2";
      }

      this.calculate(id, measure);
    },
    calculate(id, measure) {
      // find conversion here
      let convertedValue;
      if (id === "1") {
        convertedValue = convert(this.first_input, measure)
          .from(this.select1.abbr)
          .to(this.select2.abbr);

        mutations.setSecondInput(convertedValue.toString(10));
      } else if (id === "2") {
        convertedValue = convert(this.second_input, measure)
          .from(this.select2.abbr)
          .to(this.select1.abbr);
        mutations.setFirstInput(convertedValue.toString(10));
      }
    }
  }
};

export default mixin;
