<script>
import VIcon from "vuetify/lib/components/VIcon/index";
// import VDivider from "vuetify/lib/components/VDivider/index";
import CalculatorResult from "./CalculatorResult.js";

export default {
  name: "history-item",
  render: function(createElement) {
    function expression(input) {
      let childElements = [];
      if (input.length === 0) {
        childElements.push("0");
      } else {
        let arr = [];
        input.forEach(elem => {
          if (elem.type === "function") {
            arr = arr.concat(elem.value);
          } else {
            arr.push(elem);
          }
        });

        childElements = arr.map(item => {
          if (item.type === "number") {
            if (item.value === "Math.PI") {
              return createElement("v-icon", item.html);
            } else {
              return createElement("span", item.html);
            }
          } else if (item.type === "operator") {
            if (item.value === "%") {
              return item.html;
            } else {
              return createElement("v-icon", item.html);
            }
          } else if (item.type === "paren") {
            return item.html;
          } else {
            return createElement("span", item.html);
          }
        });
      }

      return createElement(
        "div",
        { class: ["history__item--exp"] },
        childElements
      );
    }

    return createElement("div", { class: ["history__item"] }, [
      expression(this.item.input),
      createElement("calculator-result", {
        class: ["history__item--result"],
        props: {
          result: this.item.result
        }
      })
    ]);
  },
  props: {
    item: {
      type: Object
    }
  },
  components: {
    VIcon,
    CalculatorResult
  }
};
</script>
<style scoped>
.history__item--exp {
  font-size: 20px;
}

.calculator__result {
  font-size: 18px;
  color: #09b464;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.calculator__result--div {
  padding-left: 6px;
  font-size: 14px;
}
</style>
