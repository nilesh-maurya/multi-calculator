<template>
  <div class="basic-keypad keypad__wrapper">
    <div class="keypad__row">
      <keypad-button
        class="keypad__btn"
        @click-keypad-btn="clickKeypad"
      ></keypad-button>
      <keypad-button
        class="keypad__btn"
        @click-keypad-btn="clickKeypad"
      ></keypad-button>
      <keypad-button
        class="keypad__btn"
        type="function"
        action="sine-inverse"
        value="arcsin"
        @click-keypad-btn="clickKeypad"
        >sin<sup>-1</sup></keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="function"
        action="cosine-inverse"
        value="arccos"
        @click-keypad-btn="clickKeypad"
        >cos<sup>-1</sup></keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="function"
        action="tangent-inverse"
        value="arctan"
        @click-keypad-btn="clickKeypad"
        >tan<sup>-1</sup></keypad-button
      >
    </div>
    <div class="keypad__row">
      <keypad-button
        class="keypad__btn"
        @click-keypad-btn="clickKeypad"
      ></keypad-button>

      <keypad-button
        v-if="isRadian"
        class="keypad__btn"
        type="measure"
        action=""
        value="rad"
        @click-keypad-btn="clickKeypad"
        >rad</keypad-button
      >
      <keypad-button
        v-else
        class="keypad__btn"
        type="measure"
        action=""
        value="deg"
        @click-keypad-btn="clickKeypad"
        >deg</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="function"
        action="sine"
        value="sin"
        @click-keypad-btn="clickKeypad"
        >sin</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="function"
        action="cosine"
        value="cos"
        @click-keypad-btn="clickKeypad"
        >cos</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="function"
        action="tangent"
        value="tan"
        @click-keypad-btn="clickKeypad"
        >tan</keypad-button
      >
    </div>
    <div class="keypad__row">
      <!-- <keypad-button class="keypad__btn" @click-keypad-btn="clickKeypad"
        >log<sub>&#x2610;</sub></keypad-button
      > -->
      <keypad-button
        class="keypad__btn"
        @click-keypad-btn="clickKeypad"
      ></keypad-button>

      <keypad-button
        class="keypad__btn"
        type="function"
        action="log-to-the-base-10"
        value="log10"
        @click-keypad-btn="clickKeypad"
        >log<sub>10</sub></keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="function"
        action="log-to-the-e"
        value="loge"
        @click-keypad-btn="clickKeypad"
        >log<sub>e</sub></keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="paren"
        action=""
        value="("
        @click-keypad-btn="clickKeypad"
        >(</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="paren"
        action=""
        value=")"
        @click-keypad-btn="clickKeypad"
        >)</keypad-button
      >
    </div>
    <div class="keypad__row">
      <keypad-button class="keypad__btn" @click-keypad-btn="clickKeypad"
        >X<sup>y</sup></keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="clear"
        action="all-clear"
        value="AC"
        @click-keypad-btn="clickKeypad"
        >AC</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="clear"
        action="backspace"
        value="backspace"
        @click-keypad-btn="clickKeypad"
        ><img src="../assets/backspace.png"
      /></keypad-button>
      <keypad-button
        class="keypad__btn"
        type="operator"
        action="modulus"
        value="mod"
        @click-keypad-btn="clickKeypad"
        >mod</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="operator"
        action="divide"
        value="&#xf7;"
        @click-keypad-btn="clickKeypad"
        >&#xf7;</keypad-button
      >
    </div>
    <div class="keypad__row">
      <keypad-button class="keypad__btn">&#x221A;x</keypad-button>
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="7"
        @click-keypad-btn="clickKeypad"
        >7</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="8"
        @click-keypad-btn="clickKeypad"
        >8</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="9"
        @click-keypad-btn="clickKeypad"
        >9</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="operator"
        action="multiply"
        value="&#10005;"
        @click-keypad-btn="clickKeypad"
        >&#10005;</keypad-button
      >
    </div>
    <div class="keypad__row">
      <keypad-button class="keypad__btn" @click-keypad-btn="clickKeypad"
        >x!</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="4"
        @click-keypad-btn="clickKeypad"
        >4</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="5"
        @click-keypad-btn="clickKeypad"
        >5</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="6"
        @click-keypad-btn="clickKeypad"
        >6</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="operator"
        acton="subtract"
        value="&#x2212;"
        @click-keypad-btn="clickKeypad"
        >&#x2212;</keypad-button
      >
    </div>
    <div class="keypad__row">
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="&#x213C;"
        @click-keypad-btn="clickKeypad"
        >&#x213C;</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="1"
        @click-keypad-btn="clickKeypad"
        >1</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="2"
        @click-keypad-btn="clickKeypad"
        >2</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="3"
        @click-keypad-btn="clickKeypad"
        >3</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="operator"
        action="add"
        value="&#x2b;"
        @click-keypad-btn="clickKeypad"
        >&#x2b;</keypad-button
      >
    </div>
    <div class="keypad__row">
      <keypad-button
        class="keypad__btn"
        type="Exchange"
        action="Exchange"
        value=""
        @click-keypad-btn="clickKeypad"
        ><img src="../assets/transfer.svg" />
      </keypad-button>
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="e"
        @click-keypad-btn="clickKeypad"
        >e</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="0"
        @click-keypad-btn="clickKeypad"
        >0</keypad-button
      >
      <keypad-button
        class="keypad__btn"
        type="number"
        action=""
        value="."
        @click-keypad-btn="clickKeypad"
        >.</keypad-button
      >
      <keypad-button
        class="keypad__btn equal"
        type="Evaluate"
        action="Evaluate"
        value="equal"
        @click-keypad-btn="clickKeypad"
        >=
      </keypad-button>
    </div>
  </div>
</template>

<script>
import KeypadButton from "./KeypadButton.vue";
export default {
  data() {
    return {
      isRadian: true
    };
  },
  components: {
    KeypadButton
  },
  methods: {
    clickKeypad(event) {
      if (event.value === "rad") {
        this.isRadian = false;
      } else if (event.value === "deg") {
        this.isRadian = true;
      }
      event.isRadian = this.isRadian;
      this.$emit("result", event);
    }
  }
};
</script>

<style scoped>
.keypad__wrapper {
  width: 350px;
  height: 385px;
  margin-top: 10px;
  display: flex;
  gap: 5px;
  flex-wrap: no-wrap;
  flex-direction: column;
}

.keypad__row {
  display: flex;
  flex: 1;
  gap: 10px;
}

.keypad__btn {
  flex: 1 1;
  outline: none;
  border: 0;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  background-color: #fff;
  border-radius: 5px;
}

.keypad__btn:hover {
  background-color: #f1f1f1;
}

.keypad__btn::-moz-focus-inner,
.keypad__btn:focus {
  outline: none;
  border: none;
  background-color: #f1f1f1;
}

button img {
  width: 25px;
  height: 25px;
}

.equal {
  background: linear-gradient(150deg, #21dd85 0%, #09b464 100%);
}
</style>
