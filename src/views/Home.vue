<template>
  <!--  @keydown.enter=" fontSize = fontSize == 1.0 ? fontSize : fontSize - 0.2 -->
  <div class="home">
    <div class="calculator">
      <div class="calculator__display">
        <div class="calculator__input">
          <div class="input">{{ inputText }}</div>
        </div>
        <div class="calculator__result">
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
      inputText: "0",
      result: "",
      isEnterPress: false,
      isBasic: true
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
      console.log(event);
      switch (event.type) {
        case "clear": {
          if (event.action === "backspace" && this.inputText !== "0") {
            this.inputText = this.inputText.slice(0, this.inputText.length - 1);
            if (this.inputText.length === 0) {
              this.inputText = "0";
            }
          } else {
            this.inputText = "0";
            this.result = "";
          }
          break;
        }
        case "number": {
          console.log("number", event.value);
          if (this.inputText === "0") {
            this.inputText = event.value;
          } else {
            this.inputText = this.inputText + event.value;
          }
          break;
        }
        case "operator": {
          console.log("operator", event.value);
          break;
        }
        case "Evaluate": {
          console.log("evaluate", event.value);
          break;
        }
        case "Exchange": {
          console.log("evaluate", event.value);
          this.isBasic = !this.isBasic;
          break;
        }
        default:
          console.log("default", event);
          break;
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
  font-size: 1.2rem;
  margin-right: 1rem;
  text-align: right;
  overflow: scroll;
  overflow-wrap: normal;
  scrollbar-width: none;
  min-height: 5px;
}

.input {
  max-width: 348px;
  min-height: 6rem;
  text-align: left;
  padding: 10px;
  margin-left: auto;
  outline: 0;
  border: 0;
  line-height: 2;
  color: #019b55;
  font-size: 2rem;
  overflow-x: scroll;
  overflow-wrap: normal;
  scrollbar-width: none;
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
