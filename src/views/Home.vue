<template>
  <div class="home">
    <div class="calculator">
      <div class="calculator__display">
        <div class="calculator__input">
          <div
            class="input"
            v-dompurify-html="inputText.join('')"
            :style="{ fontSize: inputTextFont + 'rem' }"
          ></div>
        </div>
        <div
          class="calculator__result"
          :style="{ fontSize: resultFont + 'rem' }"
        >
          {{ result }}
        </div>
      </div>
      <span class="hr"></span>
      <div class="calculator__keypad">
        <component :is="currentComponent" @result="calculate"></component>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BasicKeypad from "../components/BasicKeypad.vue";
import ScientificKeypad from "../components/ScientificKeypad.vue";

export default {
  name: "Home",
  data() {
    return {
      previousInputText: [],
      inputText: ["0"],
      result: "",
      inputTextFont: 2,
      resultFont: 1.4,
      changeFontPoint: 84,
      isBasic: true,
      wasEqualPressed: false
    };
  },
  computed: {
    currentComponent() {
      if (this.isBasic) {
        return "basic-keypad";
      }
      return "scientific-keypad";
    }
  },
  methods: {
    calculate(event) {
      // console.log(event);
      if (this.wasEqualPressed) {
        this.previousInputText = this.inputText.splice(0);
        if (event.type === "operator") {
          this.inputText.push(this.result.slice(1));
        } else if (event.type === "number") {
          this.inputText.push("0");
        }
        this.result = "";
        this.wasEqualPressed = false;
      }

      // check for type "number"
      const numberRegex = /\d+|\./g;
      // check for type "operator"
      const operatorRegex = /(&#x2b;)|(&#x2212;)|(&#10005;)|(&#xf7;)|(mod)/g;
      // check for type "function"
      const functionRegex = /[a-zA-Z]\($/g;
      switch (event.type) {
        case "clear": {
          if (event.action === "backspace") {
            break;
          } else {
            this.inputText = ["0"];
            this.result = "";
            this.inputTextFont = 2;
            this.resultFont = 1.4;
          }
          break;
        }
        case "number": {
          let current;
          if (this.inputText.length >= 1) {
            const tempHolder = this.inputText.pop();
            if (this.inputText[this.inputText.length - 1] === ")") {
              // push multiply unicode character
              this.inputText.push("&#10005;");
            }

            this.inputText.push(tempHolder);
            current = this.inputText[this.inputText.length - 1];

            if (numberRegex.test(current) || current === "") {
              if (event.value === ".") {
                if (current === "0") {
                  current = "0.";
                } else if (current.indexOf(".") === -1) {
                  current += ".";
                }
              } else if (current === "0") {
                current = event.value;
              } else {
                current += event.value;
              }
            }
          }

          this.inputText.pop();
          this.inputText.push(current);
          break;
        }
        case "operator": {
          if (this.inputText[this.inputText.length - 1] === "") {
            if (functionRegex.test(this.inputText[this.inputText.length - 2])) {
              break;
            }
          }

          if (this.inputText[this.inputText.length - 1] !== "") {
            this.inputText.push(event.value);
            this.inputText.push("");
          } else {
            const last = this.inputText.pop();
            if (this.inputText[this.inputText.length - 1] === "(") {
              this.inputText.push(last);
              break;
            } else if (!(this.inputText[this.inputText.length - 1] === ")")) {
              this.inputText.pop();
            }
            this.inputText.push(event.value);
            this.inputText.push("");
          }
          break;
        }
        case "function": {
          console.log(event);

          if (this.inputText[this.inputText.length - 1] === "0") {
            this.inputText.pop();
          } else if (
            numberRegex.test(this.inputText[this.inputText.length - 1])
          ) {
            this.inputText.push("&#10005;");
          } else if (this.inputText[this.inputText.length - 1] === "") {
            //  remove empty string ""
            this.inputText.pop();
            if (this.inputText[this.inputText.length - 1] === ")") {
              this.inputText.push("&#10005;");
            }
          }
          this.inputText.push(event.value + "(");
          this.inputText.push("");

          break;
        }
        case "paren": {
          if (this.inputText[this.inputText.length - 1] === "") {
            this.inputText.pop();
          }

          if (event.value === "(") {
            if (
              (!operatorRegex.test(this.inputText[this.inputText.length - 1]) &&
                numberRegex.test(this.inputText[this.inputText.length - 1])) ||
              this.inputText[this.inputText.length - 1] === ")"
            ) {
              this.inputText.push("&#10005;");
            }
            this.inputText.push("(");
            this.inputText.push("");
          } else if (event.value === ")") {
            // ")"
            if (
              this.inputText[this.inputText.length - 1] === "(" ||
              functionRegex.test(this.inputText[this.inputText.length - 1]) ||
              operatorRegex.test(this.inputText[this.inputText.length - 1])
            ) {
              this.inputText.push("");
              break;
            }
            this.inputText.push(")");
            this.inputText.push("");
          }
          break;
        }
        case "Evaluate": {
          this.evaluate(this.inputText.join(""));
          this.wasEqualPressed = true;
          break;
        }
        case "Exchange": {
          this.isBasic = !this.isBasic;
          break;
        }
        default:
          console.log("default", event);
          break;
      }

      if (event.type === "Evaluate") {
        this.resultFont = 2;
      } else {
        this.resultFont = 1.4;
      }

      const input = document.querySelector(".input");
      if (input.clientHeight > this.changeFontPoint) {
        this.inputTextFont =
          this.inputTextFont <= 1.2 ? 1 : this.inputTextFont - 0.3;
        this.changeFontPoint *= 2;
      }

      this.evaluate(this.inputText.join(""));
    },
    balanceParentheses(text) {
      let opening = 0;
      let closing = 0;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === "(") {
          opening++;
        } else if (text[i] === ")") {
          closing++;
        }
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
    evaluate(text) {
      // Add => &#x2b; => +
      // subtract => &#x2212; => -
      // multiply => &#10005; => *
      // Divide => &#xf7; => /
      // modulus => mod => %
      // e => e => Math.E
      // pi => &#x213C; => Math.PI
      const regex = /(&#x2b;)|(&#x2212;)|(&#10005;)|(&#xf7;)|(mod)|(&#x213C;)|(e)/g;
      let mutatedText = text.replace(regex, function(...arr) {
        const match = arr[0];
        if (match === "&#x2b;") {
          return "+";
        } else if (match === "&#x2212;") {
          return "-";
        } else if (match === "&#10005;") {
          return "*";
        } else if (match === "&#xf7;") {
          return "/";
        } else if (match === "mod") {
          return "%";
        } else if (match === "e") {
          return "Math.E";
        } else if (match === "&#x213C;") {
          return "Math.PI";
        }
      });

      mutatedText = this.balanceParentheses(mutatedText);
      console.log(mutatedText);

      try {
        this.result = "=" + eval(mutatedText);
      } catch (error) {
        this.result = "=Error";
      }
    }
  },
  components: {
    BasicKeypad,
    ScientificKeypad
  }
};
</script>

<style scoped>
.calculator {
  overflow: hidden;
  padding: 10px;
  margin: 1rem;
}

.calculator__display {
  min-height: 8rem;
}

.calculator__result {
  max-width: 348px;
  padding-right: 1rem;
  text-align: right;
  overflow-x: scroll;
  overflow-wrap: normal;
  scrollbar-width: none;
  min-height: 2.5rem;
  color: #019b55;
  font-weight: 500;
}

.input {
  max-width: 348px;
  min-height: 5rem;
  text-align: left;
  padding: 10px;
  margin-left: auto;
  outline: 0;
  border: 0;
  line-height: 2;
  color: #000;
  overflow-wrap: break-word;
}

.input::-webkit-scrollbar {
  display: none;
}
.calculator__result::-webkit-scrollbar {
  display: none;
}

.input:focus {
  outline: 0;
  border: 0;
}

.hr {
  display: block;
  width: 100%;
  height: 2px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(90, 90, 90, 0.05);
}

@media screen and (max-width: 400px) {
  .calculator {
    padding: 10px 0px;
    margin: 1rem 0;
  }
  .calculator__display {
    max-height: 348px;
  }
}
</style>
