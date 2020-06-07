<template>
  <div class="calculator">
    <div class="calculator__display">
      <calculator-input :input="input"></calculator-input>
      <div class="calculator__result">{{ result }}</div>
    </div>
    <v-divider></v-divider>
    <keypad @keypad-input="inputHandler"></keypad>
  </div>
</template>

<script>
import CalculatorInput from "../components/CalculatorInput.vue";
import Keypad from "../components/Keypad.vue";
export default {
  name: "Calculator",
  data() {
    return {
      input: [{ type: "number", value: "0", html: "0" }],
      result: ""
    };
  },
  computed: {
    inputHTML() {
      let html = "";
      this.input.forEach(item => {
        html += item.html;
      });
      return html;
    }
  },
  methods: {
    inputHandler(event) {
      switch (event.type) {
        case "clear": {
          if (event.value === "AC") {
            // if all clear then reset to default
            this.input = [{ type: "number", value: "0", html: "0" }];
          } else if (event.value === "Backspace") {
            const last = this.input[this.input.length - 1];
            if (last.type === "number" && last.value.length > 1) {
              // Array caveats: assigning its last element to modified object
              this.$set(this.input, this.input.length - 1, {
                type: last.type,
                value: last.value.slice(0, -1),
                html: last.html.slice(0, -1)
              });
            } else {
              this.input.pop();
            }

            if (this.input.length === 0) {
              // if everything is backspaced then reset to default
              this.input = [{ type: "number", value: "0", html: "0" }];
            }
          }
          break;
        }
        case "number": {
          const last = this.input[this.input.length - 1];
          if (last.type === "number") {
            if (last.value === "0") {
              if (event.value === ".") {
                event.value = "0.";
                event.html = "0.";
              }
              this.input[this.input.length - 1].value = event.value;
              this.input[this.input.length - 1].html = event.html;
            } else {
              if (event.value === "." && last.value.indexOf(".") !== -1) {
                break;
              }
              this.input[this.input.length - 1].value += event.value;
              this.input[this.input.length - 1].html += event.html;
            }
          } else {
            this.input.push(event);
          }
          break;
        }
        case "operator": {
          // const operatorKeys = ["+", "-", "*", "/", "%"];
          const last = this.input[this.input.length - 1];
          if (last.type === "operator") {
            this.input[this.input.length - 1].value = event.value;
            this.input[this.input.length - 1].html = event.html;
          } else {
            this.input.push(event);
          }
          break;
        }
        case "Evaluate": {
          this.evaluateResult(this.input);
          break;
        }
      }

      this.evaluateResult(this.input);
    },
    evaluateResult(arr) {
      // build expression from array
      let exp = "";
      arr.forEach(item => {
        exp += item.value;
      });

      try {
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
</style>
