<template>
  <!--  @keydown.enter=" fontSize = fontSize == 1.0 ? fontSize : fontSize - 0.2 -->
  <div class="home">
    <div class="calculator">
      <div class="calculator__display">
        <div class="calculator__input">
          <input v-model="inputText" class="input" @input="calculate($event)" />
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
      inputText: "",
      result: "",
      isEnterPress: false
    };
  },
  methods: {
    calculate(event) {
      if (event.key == "Enter") {
        event.preventDefault();
        console.log(event.keyCode);
        this.isEnterPress = true;
      }
      // this.result = parseInt(this.inputText, 10);
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
  background-color: #fefefe;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px;
  margin: 1rem;
}

.calculator__display {
  min-height: 8rem;
}

.calculator__result {
  text-align: right;
  overflow: scroll;
  overflow-wrap: normal;
  scrollbar-width: none;
  min-height: 5px;
}

.input {
  outline: 0;
  border: 0;
  text-align: left;
  padding: 10px;
  min-height: 6rem;
  margin-left: auto;
  line-height: 2;
  color: #019b55;
  overflow-x: scroll;
  overflow-wrap: normal;
  scrollbar-width: none;
  font-size: 2rem;
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
}
</style>
