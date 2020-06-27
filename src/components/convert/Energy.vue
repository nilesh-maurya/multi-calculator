<template>
  <div class="energy wrapper-convert-element">
    <title-bar title="Energy"></title-bar>
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
        class="g-1 energy__input-1"
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
        class="g-2 energy__input-2"
        data-id="2"
        @keydown.enter="toggleFocus = false"
        @click="toggleFocus = false"
        tabindex="0"
      >
        {{ second_input }}
      </span>
    </v-row>
    <numeric-keypad
      @numeric-key-event="handleInput($event, measure)"
    ></numeric-keypad>
  </div>
</template>

<script>
import TitleBar from "../TitleBar.vue";
import NumericKeypad from "../keypads/NumericKeypad";
import convertMixin from "../../mixins/convertMixin";

export default {
  name: "Energy",
  mixins: [convertMixin],
  data() {
    return {
      measure: "energy",
      toggleFocus: true,
      select1: { unit: "Joule", abbr: "J" },
      select2: { unit: "Kilojoule", abbr: "kJ" },
      items: [
        { unit: "Calorie", abbr: "cal" },
        { unit: "Kilocalorie", abbr: "kcal" },
        { unit: "Joule", abbr: "J" },
        { unit: "Kilojoule", abbr: "kJ" },
        { unit: "Watt-hour", abbr: "Wh" },
        { unit: "Milliwatt-hour", abbr: "mWh" },
        { unit: "Kilowatt-hour", abbr: "kWh" },
        { unit: "Megawatt-hour", abbr: "MWh" },
        { unit: "Gigawatt-hour", abbr: "GWh" }
      ]
    };
  },
  components: {
    NumericKeypad,
    TitleBar
  }
};
</script>
