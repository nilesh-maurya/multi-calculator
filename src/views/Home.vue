<template>
  <div class="home">
    <div class="calculator">
      <div class="calculator__input">
        <div
          class="input"
          :value="inputText"
          @input="calculate"
          inputMode="numeric"
          contenteditable="true"
        >
          0
        </div>
      </div>
      <div class="calculator__result">{{ result }}</div>
      <span class="hr"></span>
      <div class="calculator__btns"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      inputText: "0",
      result: ""
    };
  },
  methods: {
    calculate(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
      this.inputText = event.target.textContent;
      this.result = this.inputText;
    }
  },
  components: {}
};
</script>

<style scoped>
.calculator {
  background-color: #fefefe;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.calculator__result {
  text-align: right;
  overflow-x: scroll;
  scrollbar-width: none;
}

.hr {
  display: block;
  width: 100%;
  height: 2px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(90, 90, 90, 0.05);
}

.input {
  font-size: 2rem;
  text-align: right;
  margin-left: auto;
  line-height: 2;
  color: #019b55;
  overflow-x: scroll;
  scrollbar-width: none;
}

.input:focus {
  outline: 0;
  border: 0;
}
</style>
