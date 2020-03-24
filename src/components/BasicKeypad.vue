<template>
  <div class="basic-keypad keypad__wrapper">
    <div class="keypad__row">
      <button class="keypad__btn"></button>
      <button class="keypad__btn"></button>
      <button class="keypad__btn">sin<sup>-1</sup></button>
      <button class="keypad__btn">cos<sup>-1</sup></button>
      <button class="keypad__btn">tan<sup>-1</sup></button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn">rad</button>
      <button class="keypad__btn">deg</button>
      <button class="keypad__btn">sin</button>
      <button class="keypad__btn">cos</button>
      <button class="keypad__btn">tan</button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn">log<sub>&#x2610;</sub></button>
      <button class="keypad__btn">lg</button>
      <button class="keypad__btn">ln</button>
      <button class="keypad__btn">(</button>
      <button class="keypad__btn">)</button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn">X<sup>y</sup></button>
      <button class="keypad__btn">AC</button>
      <button class="keypad__btn"><img src="../assets/backspace.png" /></button>
      <button class="keypad__btn" data-action="modulus" data-type="operator">
        %
      </button>
      <button class="keypad__btn" data-action="division" data-type="operator">
        &#xf7;
      </button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn">&#x221A;x</button>
      <button class="keypad__btn" data-action="" data-type="number">7</button>
      <button class="keypad__btn" data-action="" data-type="number">8</button>
      <button class="keypad__btn" data-action="" data-type="number">9</button>
      <button class="keypad__btn" data-action="multiply" data-type="operator">
        &#10005;
      </button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn">x!</button>
      <button class="keypad__btn" data-action="" data-type="number">4</button>
      <button class="keypad__btn" data-action="" data-type="number">5</button>
      <button class="keypad__btn" data-action="" data-type="number">6</button>
      <button class="keypad__btn" data-action="subtract" data-type="operator">
        &#x2212;
      </button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn" data-action="" data-type="number">
        &#x220F;
      </button>
      <button class="keypad__btn" data-action="" data-type="number">1</button>
      <button class="keypad__btn" data-action="" data-type="number">2</button>
      <button class="keypad__btn" data-action="" data-type="number">3</button>
      <button class="keypad__btn" data-action="add" data-type="operator">
        +
      </button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn" data-action="">
        <img src="../assets/transfer.svg" />
      </button>
      <button class="keypad__btn" data-action="" data-type="number">e</button>
      <button class="keypad__btn" data-action="" data-type="number">0</button>
      <button
        class="keypad__btn"
        data-action="decimal"
        data-type="number"
        data-value="."
      >
        .
      </button>
      <button
        class="keypad__btn equal"
        data-action="equal"
        data-type="evaluate"
      >
        =
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.keypad__wrapper {
  margin-top: 10px;
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

.equal {
  background: linear-gradient(150deg, #21dd85 0%, #09b464 100%);
}
</style>
