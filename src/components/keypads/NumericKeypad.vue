<template>
  <div>
    <v-divider></v-divider>
    <div class="numeric-keypad unselectable">
      <div class="left">
        <div class="left__btnrow">
          <button class="left__btn" @mousedown="clickHandler" data-value="7">
            7
          </button>
          <button class="left__btn" @mousedown="clickHandler" data-value="8">
            8
          </button>
          <button class="left__btn" @mousedown="clickHandler" data-value="9">
            9
          </button>
        </div>
        <div class="left__btnrow">
          <button class="left__btn" @mousedown="clickHandler" data-value="4">
            4
          </button>
          <button class="left__btn" @mousedown="clickHandler" data-value="5">
            5
          </button>
          <button class="left__btn" @mousedown="clickHandler" data-value="6">
            6
          </button>
        </div>
        <div class="left__btnrow">
          <button class="left__btn" @mousedown="clickHandler" data-value="1">
            1
          </button>
          <button class="left__btn" @mousedown="clickHandler" data-value="2">
            2
          </button>
          <button class="left__btn" @mousedown="clickHandler" data-value="3">
            3
          </button>
        </div>
        <div class="left__btnrow">
          <button
            class="left__btn"
            :class="{ 'left__btn--empty': !sign }"
            @mousedown="clickHandler"
            data-value="Minus"
          >
            <v-icon color="#09b464" v-if="sign">{{ plusMinus }}</v-icon>
          </button>
          <button class="left__btn" @mousedown="clickHandler" data-value="0">
            0
          </button>
          <button class="left__btn" @mousedown="clickHandler" data-value=".">
            .
          </button>
        </div>
      </div>
      <div class="right">
        <button
          class="numeric-btn"
          @mousedown="clickHandler"
          data-value="Backspace"
        >
          <v-icon color="#09b464">{{ backspace }}</v-icon>
        </button>
        <button class="numeric-btn" @mousedown="clickHandler" data-value="AC">
          AC
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiBackspaceOutline, mdiPlusMinusVariant } from "@mdi/js";
export default {
  created() {
    window.addEventListener("keyup", this.keyupHandler);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.keyupHandler);
  },
  props: {
    sign: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      plusMinus: mdiPlusMinusVariant,
      backspace: mdiBackspaceOutline,
      allowedKeys: [
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
        "Backspace",
        "+",
        "-"
      ]
    };
  },
  methods: {
    keyupHandler(ev) {
      if (this.allowedKeys.includes(ev.key)) {
        if (ev.key == "-") {
          this.$emit("numeric-key-event", "Minus");
        } else if (ev.key == "+") {
          this.$emit("numeric-key-event", "Plus");
        } else {
          this.$emit("numeric-key-event", ev.key);
        }
      }
    },
    clickHandler(ev) {
      if (ev.currentTarget) {
        this.$emit("numeric-key-event", ev.currentTarget.dataset.value);
      } else {
        this.$emit("numeric-key-event", ev.target.dataset.value);
      }
    }
  }
};
</script>

<style scoped>
button:hover {
  background-color: var(--grey-lighten-3);
}

.numeric-keypad {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 22px;
  font-weight: bold;
  margin: 10px 0 0 0;
}

.left {
  flex: 0.9;
}

.left__btnrow {
  display: flex;
}

.left__btn {
  flex: 1;
  margin: 2px;
  padding: 20px 10px;
  border-radius: 5px;
}

.left__btn--empty:hover {
  cursor: unset;
  background-color: transparent;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: #09b464;
}

.right .numeric-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 35px 10px;
  border-radius: 50px;
  background-color: var(--grey-lighten-3);
}

.numeric-btn + .numeric-btn {
  margin-top: 15px;
}

.right img {
  width: 25px;
  height: 25px;
}
</style>
