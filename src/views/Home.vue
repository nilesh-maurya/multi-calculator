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
        <basic-keypad></basic-keypad>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BasicKeypad from "../components/BasicKeypad.vue";

export default {
  name: "Home",
  data() {
    return {
      inputText: "0",
      result: "",
      isEnterPress: false
    };
  },
  methods: {
    calculate(event) {
      console.log(event);
      this.result = this.inputText;
    }
  },
  components: {
    BasicKeypad
  },
  mounted() {
    const input = document.querySelector(".input");
    input.focus();
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
  /* overflow-x: scroll;
  overflow-wrap: normal;
  scrollbar-width: none; */
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
