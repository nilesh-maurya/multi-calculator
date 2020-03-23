<template>
  <div class="basic-keypad keypad__wrapper">
    <div class="keypad__row">
      <button class="keypad__btn">rad</button>
      <button class="keypad__btn">deg</button>
      <button class="keypad__btn">sin</button>
      <button class="keypad__btn">cos</button>
      <button class="keypad__btn">tan</button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn">X<sup>y</sup></button>
      <button class="keypad__btn">lg</button>
      <button class="keypad__btn">ln</button>
      <button class="keypad__btn">(</button>
      <button class="keypad__btn">)</button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn">&#8730;x</button>
      <button class="keypad__btn">AC</button>
      <button class="keypad__btn"><img src="../assets/backspace.png" /></button>
      <button class="keypad__btn">%</button>
      <button class="keypad__btn">/</button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn">x!</button>
      <button class="keypad__btn">7</button>
      <button class="keypad__btn">8</button>
      <button class="keypad__btn">9</button>
      <button class="keypad__btn">&#10005;</button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn">1/x</button>
      <button class="keypad__btn">4</button>
      <button class="keypad__btn">5</button>
      <button class="keypad__btn">6</button>
      <button class="keypad__btn">&#x2212;</button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn">&#x220F;</button>
      <button class="keypad__btn">1</button>
      <button class="keypad__btn">2</button>
      <button class="keypad__btn">3</button>
      <button class="keypad__btn">+</button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn"><img src="../assets/transfer.svg" /></button>
      <button class="keypad__btn">e</button>
      <button class="keypad__btn">0</button>
      <button class="keypad__btn">.</button>
      <button class="keypad__btn equal">=</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.keypad__wrapper {
  margin-top: 25px;
  width: 350px;
  display: flex;
  gap: 5px;
  flex-wrap: no-wrap;
  flex-direction: column;
}

button img {
  width: 25px;
  height: 25px;
}

.keypad__row {
  display: flex;
  gap: 10px;
}

.keypad__btn {
  flex: 1 1;
  outline: none;
  border: 0;
  margin: 0;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  background-color: #fff;
  border-radius: 5px;
}

.keypad__btn:hover {
  background-color: #f1f1f1;
}

.equal {
  background: linear-gradient(150deg, #21dd85 0%, #09b464 100%);
}
</style>
