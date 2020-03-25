<template>
  <div class="home">
    <div class="calculator">
      <div class="calculator__display">
        <div class="calculator__input">
          <div class="input">{{ inputText.join("") }}</div>
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
      inputText: ["0"],
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
          // let textArray = this.inputText;
          if (event.action === "backspace") {
            // 1: if length of `textArray` is greater than 1
            //      -- get last element of textArray and store in `current`
            //      -- if current.length is greater than 0
            //          -- then slice(0, `current`.length - 1)  => which will remove last element of `current`
            //      else
            //        -- which means `current` is empty and pop this element from `textArray`
            //        -- set `current` = last element of `textArray`
            //        -- and remove last element of `current`
            //   else
            //    -- set `current` =  first element of `textArray`
            //    -- if `current` === "0" then do nothing
            //       else
            //         -- slice(0, `current`.length - 1) =>  which will remove last element of `current`
            //  set textArray[textArray.length - 1] = `current` value
            // if (textArray.length > 1) {
            // }
            // let current = textArray[textArray.length - 1];
            // current = current.slice(0, current.length - 1);
            // if (this.inputText.length === 0) {
            //   this.inputText = "0";
            // }
          } else {
            this.inputText = ["0"];
            this.result = "";
          }
          break;
        }
        case "number": {
          console.log("number", event.value);
          // if `textArray.length` is greater than 1
          //  -- set `current` = last element of `textArray`
          //  -- if `current.length` equal to 0 i.e. `current` === ""
          //          -- if `event.value` === "." then
          //              -- `current` = "0."
          //                 else
          //                   -- `current` = `event.value`;
          //  -- else
          //      -- Here, `current.length` is greater than 0
          //      -- check if `current` contains 'numbers' then
          //                -- if `event.value` === "." then
          //                    -- check if "." was entered previously => then don't append
          //                        else
          //                          -- append "."
          //      -- else
          //           -- TODO: Not Completed

          const textArray = this.inputText.copyWithin();
          let current;
          if (textArray.length >= 1) {
            console.log(textArray);
            current = textArray[textArray.length - 1];
            const regex = /\d|\.+/g;
            if (regex.test(current) || current === "") {
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

          textArray[textArray.length - 1] = current;
          console.log(textArray);

          this.inputText.pop();
          this.inputText.push(current);
          break;
        }
        case "operator": {
          console.log("operator", event.value, this.inputText);
          if (this.inputText[this.inputText.length - 1] !== "") {
            this.inputText.push(event.value);
            this.inputText.push("");
          }
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
      const input = document.querySelector(".input");
      input.scrollLeft = 360;
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
