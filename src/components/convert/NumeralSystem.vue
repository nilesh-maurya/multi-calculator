<template>
  <div class="numeral wrapper-convert-element">
    <title-bar title="Numeral System"></title-bar>
    <v-row align="center" class="wrapper__item">
      <v-col cols="4">
        <v-select
          v-model="select1"
          :items="items"
          item-text="unit"
          item-value="abbr"
          item-color="green"
          :hint="select1.abbr"
          persistent-hint
          return-object
          color="#09b464"
          @change="handleChange('1')"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: toggleFocus }"
        class="g-1 numeral__input-1"
        data-id="1"
        @keydown.enter="toggleFocus = true"
        @click="toggleFocus = true"
        tabindex="0"
      >
        {{ first_input }}
      </span>
    </v-row>
    <v-row align="center" class="wrapper__item">
      <v-col cols="4">
        <v-select
          v-model="select2"
          :items="items"
          item-text="unit"
          item-value="abbr"
          item-color="green"
          :hint="select2.abbr"
          persistent-hint
          return-object
          color="#09b464"
          @change="handleChange('2')"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: !toggleFocus }"
        class="g-2 numeral__input-2"
        data-id="2"
        @keydown.enter="toggleFocus = false"
        @click="toggleFocus = false"
        tabindex="0"
      >
        {{ second_input }}
      </span>
    </v-row>
    <numeral-system-keypad
      :disableHexBtn="disableHexBtn"
      :disable8And9="disable8And9"
      :disable2To7="disable2To7"
      @numeral-input="handleInput"
    ></numeral-system-keypad>
  </div>
</template>

<script>
import TitleBar from "../TitleBar.vue";
import NumeralSystemKeypad from "../NumeralSystemKeypad";
import { getters, mutations, actions } from "../../utils/numeric-keypad-store";
import convert from "../../utils/baseConverter";

export default {
  name: "NumeralSystem",
  created() {
    actions.reset();
    this.handleChange();
  },
  data() {
    return {
      toggleFocus: true,
      select1: { unit: "Decimal", abbr: "DEC", base: 10 },
      select2: { unit: "Hexadecimal", abbr: "HEX", base: 16 },
      items: [
        { unit: "Binary", abbr: "BIN", base: 2 },
        { unit: "Octal", abbr: "OCT", base: 8 },
        { unit: "Decimal", abbr: "DEC", base: 10 },
        { unit: "Hexadecimal", abbr: "HEX", base: 16 }
      ],
      disableHexBtn: false,
      disable8And9: false,
      disable2To7: false
    };
  },
  computed: {
    first_input() {
      return getters.getFirstInput();
    },
    second_input() {
      return getters.getSecondInput();
    }
  },
  watch: {
    toggleFocus: function() {
      this.handleChange();
    }
  },
  methods: {
    handleInput(key) {
      const id = document.querySelector("span.focus").dataset.id;

      switch (key) {
        case "AC": {
          actions.reset(id);
          break;
        }
        case "Backspace": {
          actions.backspace(id);
          break;
        }
        case ".": {
          actions.decimal(id);
          break;
        }
        default: {
          actions.number(id, key, 10, 20);
        }
      }
      this.calculateNumeralSystem(id);
    },
    handleChange(id) {
      if (
        (this.toggleFocus === true && id === "1") ||
        (this.toggleFocus === false && id === "2")
      ) {
        actions.reset();
      }

      if (this.toggleFocus === true) {
        this.disableButtons(this.select1.abbr);
        this.calculateNumeralSystem("1");
      } else {
        this.disableButtons(this.select2.abbr);
        this.calculateNumeralSystem("2");
      }
    },
    disableButtons(abbr) {
      if (abbr === "HEX") {
        this.disableHexBtn = false;
        this.disable8And9 = false;
        this.disable2To7 = false;
      } else if (abbr === "DEC") {
        this.disableHexBtn = true;
        this.disable8And9 = false;
        this.disable2To7 = false;
      } else if (abbr === "OCT") {
        this.disableHexBtn = true;
        this.disable8And9 = true;
        this.disable2To7 = false;
      } else if (abbr === "BIN") {
        this.disableHexBtn = true;
        this.disable8And9 = true;
        this.disable2To7 = true;
      }
    },
    calculateNumeralSystem(id) {
      if (id === "1") {
        const convertedValue = convert(
          this.first_input,
          this.select1.base,
          this.select2.base
        );
        mutations.setSecondInput(convertedValue);
      } else if (id === "2") {
        const convertedValue = convert(
          this.second_input,
          this.select2.base,
          this.select1.base
        );
        mutations.setFirstInput(convertedValue);
      }
    }
  },
  components: {
    NumeralSystemKeypad,
    TitleBar
  }
};
</script>
<style scoped>
.numeral__input-1,
.numeral__input-2 {
  overflow-y: scroll;
}

.numeral__input-1::-webkit-scrollbar,
.numeral__input-2::-webkit-scrollbar {
  height: 5px;
}

.numeral__input-1::-webkit-scrollbar-thumb,
.numeral__input-2::-webkit-scrollbar-thumb {
  background-color: var(--grey-lighten-3);
}
</style>
