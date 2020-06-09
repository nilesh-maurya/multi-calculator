<script>
import VIcon from "vuetify/lib/components/VIcon/index";

export default {
  name: "calculator-input",
  render: function(createElement) {
    const childElements = this.input.map(item => {
      if (item.type === "number") {
        if (item.value === "Math.PI") {
          return createElement("v-icon", item.html);
        } else {
          return item.html;
        }
      } else if (item.type === "operator") {
        if (item.value === "%") {
          return item.html;
        } else {
          return createElement("v-icon", item.html);
        }
      } else if (item.type === "paren") {
        // return createElement("span", item.html);
        return item.html;
      }
    });

    return createElement(
      "div",
      { class: ["calculator__input"] },
      childElements
    );
  },
  props: {
    input: {
      type: Array
    }
  },
  components: {
    VIcon
  }
};
</script>
