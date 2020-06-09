<template>
  <div class="keypad">
    <div class="keypad__row" v-if="isAdvanced">
      <button class="keypad__btn" @click="clickHandler({ value: 'inv' })">
        inv
      </button>
      <button
        class="keypad__btn"
        v-if="isRadian"
        @click="clickHandler({ value: 'rad' })"
      >
        rad
      </button>
      <button
        class="keypad__btn"
        v-else
        @click="clickHandler({ value: 'deg' })"
        :disabled="isDisabled"
      >
        deg
      </button>
      <button class="keypad__btn" v-if="isInverse">sin<sup>-1</sup></button>
      <button class="keypad__btn" v-else>sin</button>
      <button class="keypad__btn" v-if="isInverse">cos<sup>-1</sup></button>
      <button class="keypad__btn" v-else>cos</button>
      <button class="keypad__btn" v-if="isInverse">tan<sup>-1</sup></button>
      <button class="keypad__btn" v-else>tan</button>
    </div>
    <div class="keypad__row" v-if="isAdvanced">
      <button class="keypad__btn">X<sup>y</sup></button>
      <button class="keypad__btn">log</button>
      <button class="keypad__btn">ln</button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'paren', value: '(', html: '(' })"
      >
        (
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'paren', value: ')', html: ')' })"
      >
        )
      </button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn" v-if="isAdvanced">
        <v-icon color="#2c3e50">{{ icon.mdiSquareRoot }}</v-icon>
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'clear', value: 'AC', html: '' })"
      >
        AC
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'clear', value: 'Backspace', html: '' })"
      >
        <v-icon color="#2c3e50">{{ icon.mdiBackspaceOutline }}</v-icon>
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'operator', value: '%', html: 'mod' })"
      >
        mod
      </button>
      <button
        class="keypad__btn"
        @click="
          clickHandler({
            type: 'operator',
            value: '/',
            html: icon.mdiDivision
          })
        "
      >
        <v-icon color="#2c3e50">{{ icon.mdiDivision }}</v-icon>
      </button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn" v-if="isAdvanced">X!</button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'number', value: '7', html: '7' })"
      >
        7
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'number', value: '8', html: '8' })"
      >
        8
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'number', value: '9', html: '9' })"
      >
        9
      </button>
      <button
        class="keypad__btn"
        @click="
          clickHandler({
            type: 'operator',
            value: '*',
            html: icon.mdiClose
          })
        "
      >
        <v-icon color="#2c3e50">{{ icon.mdiClose }}</v-icon>
      </button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn" v-if="isAdvanced"></button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'number', value: '4', html: '4' })"
      >
        4
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'number', value: '5', html: '5' })"
      >
        5
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'number', value: '6', html: '6' })"
      >
        6
      </button>
      <button
        class="keypad__btn"
        @click="
          clickHandler({
            type: 'operator',
            value: '-',
            html: icon.mdiMinus
          })
        "
      >
        <v-icon color="#2c3e50">{{ icon.mdiMinus }}</v-icon>
      </button>
    </div>
    <div class="keypad__row">
      <button
        class="keypad__btn"
        v-if="isAdvanced"
        @click="
          clickHandler({ type: 'number', value: 'Math.PI', html: icon.mdiPi })
        "
      >
        <v-icon color="#2c3e50">{{ icon.mdiPi }}</v-icon>
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'number', value: '1', html: '1' })"
      >
        1
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'number', value: '2', html: '2' })"
      >
        2
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'number', value: '3', html: '3' })"
      >
        3
      </button>
      <button
        class="keypad__btn"
        @click="
          clickHandler({
            type: 'operator',
            value: '+',
            html: icon.mdiPlus
          })
        "
      >
        <v-icon color="#2c3e50">{{ icon.mdiPlus }}</v-icon>
      </button>
    </div>
    <div class="keypad__row">
      <button class="keypad__btn" @click="clickHandler({ value: 'change' })">
        <v-icon color="#09b464">
          {{ isAdvanced ? icon.mdiArrowCollapse : icon.mdiArrowExpand }}
        </v-icon>
      </button>
      <button
        class="keypad__btn"
        v-if="isAdvanced"
        @click="clickHandler({ type: 'number', value: 'Math.E', html: 'e' })"
      >
        e
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'number', value: '0', html: '0' })"
      >
        0
      </button>
      <button
        class="keypad__btn"
        @click="clickHandler({ type: 'number', value: '.', html: '.' })"
      >
        .
      </button>
      <button
        class="keypad__btn equal"
        @click="
          clickHandler({
            type: 'Evaluate',
            value: 'Enter',
            html: ''
          })
        "
      >
        <v-icon color="#2c3e50">{{ icon.mdiEqual }}</v-icon>
      </button>
    </div>
  </div>
</template>

<script>
import {
  mdiEqual,
  mdiArrowCollapse,
  mdiArrowExpand,
  mdiPi,
  mdiPlus,
  mdiMinus,
  mdiClose,
  mdiDivision,
  mdiBackspaceOutline,
  mdiSquareRoot
} from "@mdi/js";
export default {
  created() {
    window.addEventListener("keyup", this.keyupHandler);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.keyupHandler);
  },
  data() {
    return {
      icon: {
        mdiEqual,
        mdiArrowCollapse,
        mdiArrowExpand,
        mdiPi,
        mdiPlus,
        mdiMinus,
        mdiClose,
        mdiDivision,
        mdiBackspaceOutline,
        mdiSquareRoot
      },
      isAdvanced: false,
      isInverse: false,
      isRadian: false,
      isDisabled: false
    };
  },
  methods: {
    clickHandler(event) {
      if (event.value === "change") {
        this.isAdvanced = !this.isAdvanced;
      } else if (event.value === "inv") {
        this.isInverse = !this.isInverse;
        this.isDisabled = !this.isDisabled;
        this.isRadian = false;
      } else if (event.value === "rad") {
        this.isRadian = false;
      } else if (event.value === "deg") {
        this.isRadian = true;
      } else {
        this.$emit("keypad-input", event);
      }
    },
    keyupHandler(ev) {
      const numberkeys = [
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
        "."
      ];
      const operatorKeys = {
        "+": this.icon.mdiPlus,
        "-": this.icon.mdiMinus,
        "*": this.icon.mdiClose,
        "/": this.icon.mdiDivision,
        "%": "mod"
      };

      if (numberkeys.includes(ev.key)) {
        this.$emit("keypad-input", {
          type: "number",
          value: ev.key,
          html: ev.key
        });
      } else if (Object.keys(operatorKeys).includes(ev.key)) {
        const event = {
          type: "operator",
          value: ev.key,
          html: operatorKeys[ev.key]
        };
        this.$emit("keypad-input", event);
      } else if (ev.key === "Backspace") {
        this.$emit("keypad-input", {
          type: "clear",
          value: "Backspace",
          html: ""
        });
      } else if (ev.key === "Enter") {
        this.$emit("keypad-input", {
          type: "Evaluate",
          value: "Enter",
          html: ""
        });
      } else if (ev.key === "e") {
        this.$emit("keypad-input", {
          type: "number",
          value: "Math.E",
          html: "e"
        });
      } else if (ev.key === "(" || ev.key === ")") {
        this.$emit("keypad-input", {
          type: "paren",
          value: ev.key,
          html: ev.key
        });
      }
    }
  }
};
</script>

<style scoped>
button:hover {
  background-color: var(--grey-lighten-3);
}

.keypad {
  margin: 10px;
}

.keypad__row {
  display: flex;
}
.keypad__btn {
  flex: 1;
  font-weight: bold;
  font-size: 18px;
  margin: 2px;
  padding: 12px 10px;
  border-radius: 10px;
}

.equal {
  background-color: #09b464;
}
.equal:hover,
.equal:focus {
  background-color: #09b464;
}
</style>
