import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueDOMPurifyHTML from "vue-dompurify-html";
import Home from "@/views/Home.vue";

const localVue = createLocalVue();
localVue.use(VueDOMPurifyHTML);

describe("testing Home.vue", () => {
  describe("basic Keypad", () => {
    it("renders basic keypad", () => {
      const wrapper = shallowMount(Home, { localVue });

      expect(wrapper.find(".input").text()).toBe("0");
      expect(wrapper.find(".calculator__result").text()).toBe("");
    });

    it("testing numbers key", async () => {
      const wrapper = mount(Home, { localVue });

      // input and result container
      const inputDiv = wrapper.find(".input");
      const resultDiv = wrapper.find(".calculator__result");
      const buttonWrapper = wrapper.findAll("button[data-type='number']");

      for (let i = 0; i < buttonWrapper.length; i++) {
        const button = buttonWrapper.at(i);

        wrapper.setData({ inputText: ["0"], result: "" });
        button.trigger("click");

        await wrapper.vm.$nextTick();

        const emittedValue = button.emitted()["click-keypad-btn"][0][0].value;

        if (emittedValue !== ".") {
          expect(inputDiv.text()).toBe(emittedValue);
          expect(resultDiv.text()).toBe("= " + emittedValue);
        } else {
          expect(inputDiv.text()).toBe("0" + emittedValue);
          expect(resultDiv.text()).toBe("= 0");
        }
      }
    });
  });
});
