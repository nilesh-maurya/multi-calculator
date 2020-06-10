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
import { mdiClose } from "@mdi/js";
import CalculatorInput from "../components/CalculatorInput.vue";
import Keypad from "../components/Keypad.vue";
export default {
  name: "Calculator",
  data() {
    return {
      input: [{ type: "number", value: "0", html: "0" }],

      result: "",
      wasEnterPressed: false
    };
  },
  methods: {
    // eslint-disable-next-line
    reset(arr) {
      arr.splice(0, arr.length);
      arr.push({ type: "number", value: "0", html: "0" });
    },
    backspace(arr) {
      const last = arr[arr.length - 1];
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

      if (arr.length === 0) {
        // if everything is backspaced then reset to default
        this.reset(arr);
      }
    },
    number(arr, event) {
      const last = arr[arr.length - 1];
      // if last elem is ) eg. (9+8)7 => (9+8)*7
      // add multiply operator
      if (last.value === ")") {
        this.operator(arr, { type: "operator", value: "*", html: mdiClose });
      }

      if (last.type === "number") {
        if (last.value === "0") {
          if (event.value === ".") {
            event.value = "0.";
            event.html = "0.";
          }
          arr[arr.length - 1].value = event.value;
          arr[arr.length - 1].html = event.html;
        } else {
          if (event.value === "." && last.value.indexOf(".") !== -1) {
            return;
          }
          arr[arr.length - 1].value += event.value;
          arr[arr.length - 1].html += event.html;
        }
      } else {
        arr.push(event);
      }
    },
    operator(arr, event) {
      const last = arr[arr.length - 1];
      if (last.value === "(") {
        return;
      }
      if (last.type === "operator") {
        arr[arr.length - 1].value = event.value;
        arr[arr.length - 1].html = event.html;
      } else {
        arr.push(event);
      }
    },
    paren(arr, event) {
      const last = arr[arr.length - 1];
      if (event.value === "(") {
        if (arr.length === 1 && last.value === "0") {
          // remove "0" and then continue to add "("
          arr.pop();
        } else if (last.value === ")" || last.type === "number") {
          this.operator(arr, { type: "operator", value: "*", html: mdiClose });
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
          const temp = this.result.slice(2);
          this.number(this.input, { type: "number", value: temp, html: temp });
          // then continue to switch to add entered operator
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
          break;
        }
      }

      if (event.type === "Evaluate") {
        // make font bigger
        this.wasEnterPressed = true;
      }
      this.evaluateResult(this.input);
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
    evaluateResult(arr) {
      // build expression from array
      let exp = "";
      arr.forEach(item => {
        exp += item.value;
      });

      try {
        exp = this.balanceParenthesis(exp);
        const answer = eval(exp);
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
