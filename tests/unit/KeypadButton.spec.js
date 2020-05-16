import { shallowMount } from "@vue/test-utils";
import KeypadButton from "@/components/KeypadButton";

describe("Testing KeypadButton.vue", () => {
  // render the component
  const wrapper = shallowMount(KeypadButton, {
    propsData: {
      type: "number",
      action: "",
      value: "9"
    },
    slots: {
      default: "9"
    }
  });

  it("renders KeypadButton with props data", () => {
    // check props
    expect(wrapper.props().type).toBe("number");
    expect(wrapper.props().action).toBe("");
    expect(wrapper.props().value).toBe("9");
  });

  it("check button exists", () => {
    // check if button exists
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("check attributes of button", () => {
    // check all attributes
    expect(wrapper.find("button").attributes("data-type")).toBe("number");
    expect(wrapper.find("button").attributes("data-action")).toBe("");
    expect(wrapper.find("button").attributes("data-value")).toBe("9");
  });

  it("check slots data", () => {
    expect(wrapper.find("button").text()).toBe("9");
  });

  it("triggering click event", () => {
    wrapper.trigger("click");

    expect(wrapper.emitted()["click-keypad-btn"][0]).toEqual([
      {
        type: "number",
        action: "",
        value: "9"
      }
    ]);
  });
});
