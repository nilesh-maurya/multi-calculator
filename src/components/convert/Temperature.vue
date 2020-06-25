<template>
  <div class="temperature wrapper-convert-element">
    <title-bar title="Temperature"></title-bar>
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
          @change="handleChange('1', measure)"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: toggleFocus }"
        class="g-1 temperature__input-1"
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
          @change="handleChange('2', measure)"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: !toggleFocus }"
        class="g-2 temperature__input-2"
        data-id="2"
        @keydown.enter="toggleFocus = false"
        @click="toggleFocus = false"
        tabindex="0"
        role="input"
        :aria-label="'Enter value for ' + select2.unit"
      >
        {{ second_input }}
      </span>
    </v-row>
    <numeric-keypad
      @numeric-key-event="handleInput($event, measure)"
      :sign="true"
    >
    </numeric-keypad>
  </div>
</template>

<script>
import TitleBar from "../TitleBar.vue";
import NumericKeypad from "../NumericKeypad";
import convertMixin from "../../mixins/convertMixin";

export default {
  name: "Temperature",
  mixins: [convertMixin],
  data() {
    return {
      measure: "temperature",
      toggleFocus: true,
      select1: { unit: "Celcius", abbr: "C" },
      select2: { unit: "Fahrenheit", abbr: "F" },
      items: [
        { unit: "Celcius", abbr: "C" },
        { unit: "Kelvin", abbr: "K" },
        { unit: "Fahrenheit", abbr: "F" },
        { unit: "Rankine", abbr: "R" }
      ]
    };
  },
  components: {
    NumericKeypad,
    TitleBar
  }
};
</script>
