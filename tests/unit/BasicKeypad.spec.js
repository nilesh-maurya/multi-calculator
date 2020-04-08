import { shallowMount } from "@vue/test-utils";
import BasicKeypad from "@/components/BasicKeypad.vue";

describe("testing BasicKeypad.vue ", () => {
  const wrapper = shallowMount(BasicKeypad);

  it("renders basic keypad component", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
