<template>
  <div class="pressure wrapper-convert-element">
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
          @change="handleChange('1', 'pressure')"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: toggleFocus }"
        class="g-1 pressure__input-1"
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
          @change="handleChange('2', 'pressure')"
        ></v-select>
      </v-col>
      <span
        :class="{ focus: !toggleFocus }"
        class="g-2 pressure__input-2"
        data-id="2"
        @keydown.enter="toggleFocus = false"
        @click="toggleFocus = false"
        tabindex="0"
      >
        {{ second_input }}
      </span>
    </v-row>
    <numeric-keypad
      @numeric-key-event="handleInput($event, 'pressure')"
    ></numeric-keypad>
  </div>
</template>

<script>
import NumericKeypad from "../NumericKeypad";
import convertMixin from "../../mixins/convertMixin";

export default {
  name: "Pressure",
  mixins: [convertMixin],
  data() {
    return {
      toggleFocus: true,
      select1: { unit: "Pascal", abbr: "Pa" },
      select2: { unit: "Standard atmosphere", abbr: "atm" },
      items: [
        { unit: "Pascal", abbr: "Pa" },
        { unit: "Kilopascal", abbr: "kPa" },
        { unit: "Megapascal", abbr: "MPa" },
        { unit: "Hectopascal", abbr: "hPa" },
        { unit: "Bar", abbr: "bar" },
        { unit: "torr", abbr: "torr" },
        { unit: "Standard atmosphere", abbr: "atm" }
      ]
    };
  },
  components: {
    NumericKeypad
  }
};
</script>
