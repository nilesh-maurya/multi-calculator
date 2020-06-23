import Vue from "vue";

const state = Vue.observable({ first_input: "0", second_input: "0" });

export const getters = {
  getFirstInput: () => {
    return state.first_input;
  },
  getSecondInput: () => {
    return state.second_input;
  }
};

export const mutations = {
  setFirstInput: val => (state.first_input = val),
  setSecondInput: val => (state.second_input = val)
};

export const actions = {
  plus(id) {
    if (id === "1") {
      const value = getters.getFirstInput();
      if (value[0] === "-") {
        mutations.setFirstInput(value.slice(1));
      }
    } else if (id === "2") {
      const value = getters.getSecondInput();
      if (value[0] === "-") {
        mutations.setSecondInput(value.slice(1));
      }
    }
  },
  minus(id) {
    if (id === "1") {
      const value = getters.getFirstInput();
      if (value[0] === "-") {
        mutations.setFirstInput(value.slice(1));
      } else if (value !== "0") {
        mutations.setFirstInput("-" + value);
      }
    } else if (id === "2") {
      const value = getters.getSecondInput();
      if (value[0] === "-") {
        mutations.setSecondInput(value.slice(1));
      } else if (value !== "0") {
        mutations.setSecondInput("-" + value);
      }
    }
  },
  reset(id) {
    if (id === undefined) {
      // when component is first loaded
      mutations.setFirstInput("0");
      mutations.setSecondInput("0");
    } else if (id === "1") {
      mutations.setFirstInput("0");
    } else if (id === "2") {
      mutations.setSecondInput("0");
    }
  },
  backspace(id) {
    if (id === "1") {
      // focus on first element
      const value = getters.getFirstInput();
      if (value !== "0") {
        if (value.length === 1 || (value.length === 2 && value[0] === "-")) {
          mutations.setFirstInput("0");
        } else {
          mutations.setFirstInput(value.slice(0, -1));
        }
      }
    } else if (id === "2") {
      // focus on second element
      const value = getters.getSecondInput();
      if (value !== "0") {
        if (value.length === 1 || (value.length === 2 && value[0] === "-")) {
          mutations.setSecondInput("0");
        } else {
          mutations.setSecondInput(value.slice(0, -1));
        }
      }
    }
  },
  decimal(id) {
    if (id === "1" && getters.getFirstInput().indexOf(".") === -1) {
      mutations.setFirstInput(getters.getFirstInput() + ".");
    } else if (id === "2" && getters.getSecondInput().indexOf(".") === -1) {
      mutations.setSecondInput(getters.getSecondInput() + ".");
    }
  },
  number(id, key, decimalDigit, maxDigit = 15) {
    if (key === "Minus" || key === "Plus") {
      return;
    }
    if (id === "1") {
      let value = getters.getFirstInput();

      const check = value.split(".")[1];
      if (check !== undefined && check.length >= decimalDigit) return;

      if (maxDigit !== -1) {
        // restrict the number length if parameter maxDigit !== -1
        const len = value.indexOf(".") === -1 ? maxDigit : maxDigit + 2;
        if (value.length >= len) return;
      }

      if (value === "0") {
        value = key;
      } else {
        value = value + key;
      }

      mutations.setFirstInput(value);
    } else if (id === "2") {
      let value = getters.getSecondInput();

      const check = value.split(".")[1];
      if (check !== undefined && check.length >= decimalDigit) return;

      if (maxDigit !== -1) {
        // restrict the number length if parameter maxDigit !== -1
        const len = value.indexOf(".") === -1 ? maxDigit : maxDigit + 2;
        if (value.length >= len) return;
      }

      if (value === "0") {
        value = key;
      } else {
        value = value + key;
      }

      mutations.setSecondInput(value);
    }
  }
};
