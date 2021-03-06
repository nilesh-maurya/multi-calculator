<template>
  <div class="calculator">
    <div class="calculator__display">
      <calculator-input :input="input"></calculator-input>
      <div class="calculator__result" :class="{ big: wasEnterPressed }">
        {{ result }}
      </div>
    </div>
    <v-divider></v-divider>
    <keypad @keypad-input="inputHandler"></keypad>
  </div>
</template>

<script>
import { mdiClose, mdiMinus } from "@mdi/js";
import CalculatorInput from "../components/CalculatorInput.vue";
import Keypad from "../components/Keypad.vue";

export default {
  name: "Calculator",
  data() {
    return {
      input: [],
      result: "",
      wasEnterPressed: false
    };
  },
  methods: {
    // eslint-disable-next-line
    reset(arr) {
      arr.splice(0, arr.length);
    },
    backspace(arr) {
      if (arr.length === 0) {
        // if everything is backspaced then reset to default
        this.reset(arr);
        return;
      }

      const last = arr[arr.length - 1];

      // check for function
      if (last.type === "function") {
        if (last.value.length === 2) {
          return arr.pop();
        } else {
          return this.backspace(arr[arr.length - 1].value, event);
        }
      }

      if (
        last.type === "number" &&
        last.value.length > 1 &&
        !(last.value === "Math.PI" || last.value === "Math.E")
      ) {
        // Array caveats: assigning its last element to modified object
        this.$set(arr, arr.length - 1, {
          type: last.type,
          value: last.value.slice(0, -1),
          html: last.html.slice(0, -1)
        });
      } else {
        arr.pop();
      }
    },
    number(arr, event) {
      if (arr.length !== 0) {
        const last = arr[arr.length - 1];

        if (last.type === "function") {
          if (!this.isParenBalance(last.value)) {
            this.number(arr[arr.length - 1].value, event);
            return;
          }
        }
        // if last elem is ) eg. (9+8)7 => (9+8)*7
        // add multiply operator
        if (last.value === ")") {
          this.operator(arr, { type: "operator", value: "*", html: mdiClose });
        }
        if (last.type === "number") {
          if (last.value === "0" && event.value === "0") {
            return;
          }
          if (event.value === "." && last.value.indexOf(".") !== -1) {
            return;
          }
          arr[arr.length - 1].value += event.value;
          arr[arr.length - 1].html += event.html;
        } else {
          arr.push(event);
        }
      } else {
        arr.push(event);
      }
    },
    operator(arr, event) {
      if (arr.length === 0 && event.value !== "-") {
        return;
      }

      if (arr.length === 0) {
        // accept only minus operator if no operands are present
        // eg. -3 but won't accept *3 or /3 or %3
        arr.push(event);
      } else {
        const last = arr[arr.length - 1];

        // check for function
        if (last.type === "function") {
          if (!this.isParenBalance(last.value))
            return this.operator(arr[arr.length - 1].value, event);
        }

        if (last.value === "(") {
          return;
        }
        if (last.type === "operator") {
          if (arr.length <= 1) return;
          arr[arr.length - 1].value = event.value;
          arr[arr.length - 1].html = event.html;
        } else {
          arr.push(event);
        }
      }
    },
    paren(arr, event) {
      if (arr.length === 0) {
        arr.push(event);
        return;
      }

      const last = arr[arr.length - 1];

      // check for function
      if (last.type === "function") {
        if (!this.isParenBalance(last.value))
          return this.operator(arr[arr.length - 1].value, event);
      }

      if (event.value === "(") {
        if (last.value === ")" || last.type === "number") {
          this.operator(arr, {
            type: "operator",
            value: "*",
            html: mdiClose
          });
        }
        arr.push(event);
      } else if (event.value === ")" && !(last.type === "operator")) {
        arr.push(event);
      }
    },
    inputHandler(event) {
      // if evaluate done then we have to use `ans` as new input
      if (
        this.wasEnterPressed &&
        !(event.type === "Evaluate" || event.type === "clear")
      ) {
        // reset to default;
        this.reset(this.input);
        // if event.type is `operator` then answer will be added as input
        if (event.type === "operator") {
          // add answer as first input
          // eg. Ans: = 12 (space after equal), we have to remove that to when adding that as input
          let temp = this.result.slice(2);
          // if ans = "Error"
          if (temp != "Error") {
            if (temp[0] == "-") {
              this.operator(this.input, {
                type: "operator",
                value: "-",
                html: mdiMinus
              });

              temp = temp.slice(1);
            }
            this.number(this.input, {
              type: "number",
              value: temp,
              html: temp
            });
            // then continue to switch to add entered operator
          }
        }

        this.result = "";
      }

      this.wasEnterPressed = false;

      switch (event.type) {
        case "clear": {
          if (event.value === "AC") {
            // if all clear then reset to default
            this.reset(this.input);
          } else if (event.value === "Backspace") {
            this.backspace(this.input, event);
          }
          break;
        }
        case "number": {
          this.number(this.input, event);
          break;
        }
        case "operator": {
          this.operator(this.input, event);
          break;
        }

        case "paren": {
          this.paren(this.input, event);
          break;
        }

        case "function": {
          if (event.category) {
            this.input.push({
              type: "function",
              value: [
                { type: event.category, value: event.value, html: event.html },
                { type: "paren", value: "(", html: "(" }
              ]
            });
          }
          break;
        }
      }

      // HACK: to change the nested data
      // set the last element to last element
      this.$set(
        this.input,
        this.input.length - 1,
        Object.assign({}, this.input[this.input.length - 1])
      );

      if (event.type === "Evaluate") {
        // make font bigger
        this.wasEnterPressed = true;
        // store in localstorage
        let items = JSON.parse(window.localStorage.getItem("calculator"));
        if (!items) {
          items = [];
        }
        items.push({ input: this.input, result: this.result });
        window.localStorage.setItem("calculator", JSON.stringify(items));
      }
      this.evaluateResult(this.input);
    },
    isParenBalance(arr) {
      let opening = 0;
      let closing = 0;

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].type === "paren" && arr[i].value === "(") opening++;
        if (arr[i].type === "paren" && arr[i].value === ")") closing++;
      }

      if (opening !== closing) {
        return false;
      } else {
        return true;
      }
    },
    balanceParenthesis(text) {
      let opening = 0;
      let closing = 0;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === "(") opening++;
        if (text[i] === ")") closing++;
      }

      if (opening > closing) {
        for (let i = 0; i < opening - closing; i++) {
          text += ")";
        }
      } else if (closing > opening) {
        for (let i = 0; i < closing - opening; i++) {
          text = "(" + text;
        }
      }
      return text;
    },
    createExpression(arr, isTypeofFunction, category) {
      let exp = "";
      arr.forEach(item => {
        if (item.type !== "function") {
          if (
            item.type === "number" &&
            isTypeofFunction === true &&
            category === "trigonometry" &&
            item.isRadian === false &&
            item.isInverse === false
          ) {
            const temp = item.value + "*(Math.PI/180)";
            exp += temp;
          } else {
            exp += item.value;
          }
        } else {
          exp += this.createExpression(item.value, true, item.value[0].type);
        }
      });

      return exp;
    },
    evaluateResult(arr) {
      if (arr.length === 0) {
        this.result = "";
        return;
      }

      // build expression from array
      let exp = this.createExpression(arr);
      try {
        exp = this.balanceParenthesis(exp);
        let answer = eval(exp);

        const temp = answer.toString();
        if (temp.length > 10) {
          answer = parseFloat(answer.toFixed(15));
        }
        const errorRegex = /(NaN)|(undefined)|(function)/g;
        if (errorRegex.test(answer)) {
          this.result = "= Error";
        } else {
          this.result = "= " + answer;
        }
      } catch (error) {
        this.result = "= Error";
      }
    }
  },
  components: {
    CalculatorInput,
    Keypad
  }
};
</script>

<style scoped>
.calculator {
  display: flex;
  flex-direction: column;
  height: 85vh;
}

.calculator__display {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.calculator__input {
  max-height: calc(100% - 60px);
  overflow-y: scroll;
  word-break: break-all;
  font-size: 20px;
}

.calculator__result {
  font-size: 26px;
  text-align: right;
  color: #09b464;
  overflow-x: scroll;
}

.calculator__input::-webkit-scrollbar,
.calculator__result::-webkit-scrollbar {
  width: 3px;
  height: 5px;
}

.calculator__input::-webkit-scrollbar-thumb,
.calculator__result::-webkit-scrollbar-thumb {
  background-color: #ddd;
}

.big {
  font-size: 30px;
  font-weight: 700;
}
</style>
