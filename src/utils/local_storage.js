import { mutations, actions } from "../utils/numeric-keypad-store";

const store_data = param => {
  const item = {
    select1: param.select1,
    select2: param.select2,
    first_input: param.firstInput,
    second_input: param.secondInput
  };
  const convert = JSON.parse(window.localStorage.getItem("convert")) || {};

  convert[param.measure] = item;
  window.localStorage.setItem("convert", JSON.stringify(convert));
};

const apply_data = (self, measure) => {
  // fetch previous value if not present then reset to zero
  const convert = JSON.parse(window.localStorage.getItem("convert"));

  if (convert) {
    const item = convert[measure];
    if (item) {
      if (self.select1) {
        self.select1 = item.select1;
      }
      if (self.select2) {
        self.select2 = item.select2;
      }
      mutations.setFirstInput(item.first_input);
      mutations.setSecondInput(item.second_input);
    } else {
      actions.reset();
    }
  }
};

export { store_data, apply_data };
