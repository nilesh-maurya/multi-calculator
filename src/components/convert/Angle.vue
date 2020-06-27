<template>
  <div class="angle wrapper-convert-element">
    <title-bar title="Angle"></title-bar>
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
        class="g-1 angle__input-1"
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
        class="g-2 angle__input-2"
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
  name: "Angle",
  mixins: [convertMixin],
  data() {
    return {
      measure: "angle",
      toggleFocus: true,
      select1: { unit: "Degree", abbr: "deg" },
      select2: { unit: "Radian", abbr: "rad" },
      items: [
        { unit: "Degree", abbr: "deg" },
        { unit: "Radian", abbr: "rad" },
        { unit: "Gradian", abbr: "grad" },
        { unit: "Minute of arc", abbr: "arcmin" },
        { unit: "Second of arc", abbr: "arcsec" }
      ]
    };
  },
  components: {
    NumericKeypad,
    TitleBar
  }
};
</script>
