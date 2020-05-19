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
  reset(focusElement) {
    if (focusElement === undefined) {
      // when component is first loaded
      mutations.setFirstInput("0");
      mutations.setSecondInput("0");
    } else if (focusElement.dataset.id === "1") {
      mutations.setFirstInput("0");
    } else if (focusElement.dataset.id === "2") {
      mutations.setSecondInput("0");
    }
  },
  backspace(focusElement) {
    if (focusElement.dataset.id === "1") {
      // focus on first element
      const value = getters.getFirstInput();
      if (value !== "0") {
        if (value.length === 1) {
          mutations.setFirstInput("0");
        } else {
          mutations.setFirstInput(value.slice(0, -1));
        }
      }
    } else if (focusElement.dataset.id === "2") {
      // focus on second element
      const value = getters.getSecondInput();
      if (value !== "0") {
        if (value.length === 1) {
          mutations.setSecondInput("0");
        } else {
          mutations.setSecondInput(value.slice(0, -1));
        }
      }
    }
  },
  decimal(focusElement) {
    if (
      focusElement.dataset.id === "1" &&
      getters.getFirstInput().indexOf(".") === -1
    ) {
      mutations.setFirstInput(getters.getFirstInput() + ".");
    } else if (
      focusElement.dataset.id === "2" &&
      getters.getSecondInput().indexOf(".") === -1
    ) {
      mutations.setSecondInput(getters.getSecondInput() + ".");
    }
  },
  number(focusElement, key) {
    if (focusElement.dataset.id === "1") {
      let value = getters.getFirstInput();

      const check = value.split(".")[1];
      if (check !== undefined && check.length >= 3) return;

      const len = value.indexOf(".") === -1 ? 15 : 17;
      if (value.length >= len) return;

      if (value === "0") {
        value = key;
      } else {
        value = value + key;
      }

      mutations.setFirstInput(value);
    } else if (focusElement.dataset.id === "2") {
      let value = getters.getSecondInput();

      const check = value.split(".")[1];
      if (check !== undefined && check.length >= 3) return;

      const len = value.indexOf(".") === -1 ? 15 : 17;
      if (value.length >= len) return;

      if (value === "0") {
        value = key;
      } else {
        value = value + key;
      }

      mutations.setSecondInput(value);
    }
  }
};
