<template>
  <div>
    <v-divider></v-divider>
    <div class="numeric-keypad unselectable">
      <div class="left">
        <div class="left__btnrow">
          <button class="left__btn" @click="clickHandler" data-value="7">
            7
          </button>
          <button class="left__btn" @click="clickHandler" data-value="8">
            8
          </button>
          <button class="left__btn" @click="clickHandler" data-value="9">
            9
          </button>
        </div>
        <div class="left__btnrow">
          <button class="left__btn" @click="clickHandler" data-value="4">
            4
          </button>
          <button class="left__btn" @click="clickHandler" data-value="5">
            5
          </button>
          <button class="left__btn" @click="clickHandler" data-value="6">
            6
          </button>
        </div>
        <div class="left__btnrow">
          <button class="left__btn" @click="clickHandler" data-value="1">
            1
          </button>
          <button class="left__btn" @click="clickHandler" data-value="2">
            2
          </button>
          <button class="left__btn" @click="clickHandler" data-value="3">
            3
          </button>
        </div>
        <div class="left__btnrow">
          <button class="left__btn left__btn--empty" data-value=""></button>
          <button class="left__btn" @click="clickHandler" data-value="0">
            0
          </button>
          <button class="left__btn" @click="clickHandler" data-value=".">
            .
          </button>
        </div>
      </div>
      <div class="right">
        <button
          class="numeric-btn"
          @click="clickHandler"
          data-value="BACKSPACE"
        >
          <v-icon color="#09b464">{{ backspace }}</v-icon>
        </button>
        <button class="numeric-btn" @click="clickHandler" data-value="AC">
          AC
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiBackspaceOutline } from "@mdi/js";
export default {
  data() {
    return {
      backspace: mdiBackspaceOutline
    };
  },
  methods: {
    clickHandler(ev) {
      if (ev.currentTarget) {
        this.$emit("click-numeric-key", ev.currentTarget.dataset.value);
      } else {
        this.$emit("click-numeric-key", ev.target.dataset.value);
      }
    }
  }
};
</script>

<style scoped>
* {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
  -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
  outline: none !important;
}

button:focus,
button::-moz-focus-inner {
  border: none;
  outline: none !important;
}

button {
  transform: scale(1);
  transition: transform ease-in-out 0.15s 0s;
}

button:hover {
  transform: scale(0.8);
  background-color: #eee;
}

button:focus {
  transform: scale(1);
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
  padding: 20px 10px;
  border-radius: 10px;
}

.left__btn--empty:hover {
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
  background-color: #eee;
}

.numeric-btn + .numeric-btn {
  margin-top: 15px;
}

.right img {
  width: 25px;
  height: 25px;
}
</style>
