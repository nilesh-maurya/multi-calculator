<template>
  <div class="numeral-keypad">
    <v-divider></v-divider>
    <div class="btn__row">
      <button
        class="btn"
        @click="clickHandler"
        data-value="AC"
        style="color:#09b464"
      >
        AC
      </button>
      <button class="btn" @click="clickHandler" data-value="Backspace">
        <v-icon color="#09b464">{{ mdiBackspaceOutline }}</v-icon>
      </button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="F"
        :disabled="disableHexBtn"
      >
        F
      </button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="E"
        :disabled="disableHexBtn"
      >
        E
      </button>
    </div>
    <div class="btn__row">
      <button
        class="btn"
        @click="clickHandler"
        data-value="7"
        :disabled="disable2To7"
      >
        7
      </button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="8"
        :disabled="disable8And9"
      >
        8
      </button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="9"
        :disabled="disable8And9"
      >
        9
      </button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="D"
        :disabled="disableHexBtn"
      >
        D
      </button>
    </div>
    <div class="btn__row">
      <button
        class="btn"
        @click="clickHandler"
        data-value="4"
        :disabled="disable2To7"
      >
        4
      </button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="5"
        :disabled="disable2To7"
      >
        5
      </button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="6"
        :disabled="disable2To7"
      >
        6
      </button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="C"
        :disabled="disableHexBtn"
      >
        C
      </button>
    </div>
    <div class="btn__row">
      <button class="btn" @click="clickHandler" data-value="1">1</button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="2"
        :disabled="disable2To7"
      >
        2
      </button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="3"
        :disabled="disable2To7"
      >
        3
      </button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="B"
        :disabled="disableHexBtn"
      >
        B
      </button>
    </div>
    <div class="btn__row">
      <button class="btn" @click="clickHandler" data-value="" disabled></button>
      <button class="btn" @click="clickHandler" data-value="0">0</button>
      <button class="btn" @click="clickHandler" data-value=".">.</button>
      <button
        class="btn"
        @click="clickHandler"
        data-value="A"
        :disabled="disableHexBtn"
      >
        A
      </button>
    </div>
  </div>
</template>

<script>
import { mdiBackspaceOutline } from "@mdi/js";
export default {
  created() {
    window.addEventListener("keyup", this.keyupHandler);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.keyupHandler);
  },
  props: {
    disableHexBtn: Boolean,
    disable8And9: Boolean,
    disable2To7: Boolean
  },
  data() {
    return {
      mdiBackspaceOutline,
      allowedKeys: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        ".",
        "Backspace"
      ]
    };
  },
  methods: {
    keyupHandler(ev) {
      if (this.allowedKeys.includes(ev.key)) {
        const isHex = ["a", "b", "c", "d", "e", "f"].includes(ev.key);
        const is8Or9 = ["8", "9"].includes(ev.key);
        const is2To7 = ["2", "3", "4", "5", "6", "7"].includes(ev.key);

        if (
          this.disableHexBtn === true &&
          this.disable8And9 === false &&
          this.disable2To7 === false
        ) {
          // Base: decimal

          if (!isHex) {
            this.$emit("numeral-input", ev.key);
          }
        } else if (
          this.disableHexBtn === true &&
          this.disable8And9 === true &&
          this.disable2To7 === false
        ) {
          // Base: Octal
          if (!isHex && !is8Or9) {
            this.$emit("numeral-input", ev.key);
          }
        } else if (
          this.disableHexBtn === true &&
          this.disable8And9 === true &&
          this.disable2To7 === true
        ) {
          // Base: Binary
          if (!isHex && !is8Or9 && !is2To7) {
            this.$emit("numeral-input", ev.key);
          }
        } else {
          if (isHex) {
            this.$emit("numeral-input", ev.key.toUpperCase());
          } else {
            this.$emit("numeral-input", ev.key);
          }
        }
      }
    },
    clickHandler(ev) {
      if (ev.currentTarget) {
        this.$emit("numeral-input", ev.currentTarget.dataset.value);
      } else {
        this.$emit("numeral-input", ev.target.dataset.value);
      }
    }
  }
};
</script>

<style scoped>
.btn__row {
  display: flex;
}
.btn {
  flex: 1;
  margin: 1px;
  padding: 16px 5px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bolder;
}

.btn[disabled] {
  color: #ccc;
}

button:not([disabled]):hover {
  background-color: var(--grey-lighten-3);
}
</style>
