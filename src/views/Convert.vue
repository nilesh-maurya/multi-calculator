<template>
  <div class="convert">
    <div class="convert__items" v-if="showConvertItems">
      <div
        class="convert__item"
        v-for="(item, index) in items"
        :key="index"
        :data-item="item.title"
        @keydown.enter="showComponent(item)"
        @click="showComponent(item)"
        tabindex="0"
      >
        <v-icon>{{ item.src }} </v-icon>
        <p :data-item="item.title">{{ item.title }}</p>
      </div>
    </div>
    <div class="" v-else>
      <div class="titlebar">
        <button
          class="titlebar__back btn-back"
          tabindex="0"
          @keydown.enter="showConvertItems = true"
          @click="showConvertItems = true"
        >
          <v-icon>{{ mdiArrowLeft }} </v-icon>
        </button>
        <h3 class="titlebar__title">{{ currentItem }}</h3>
      </div>
      <component :is="currentItemComponent"></component>
    </div>
  </div>
</template>

<script>
import BMI from "../components/convert/BMI.vue";
import Angle from "../components/convert/Angle.vue";
import Age from "../components/convert/Age.vue";
import Date from "../components/convert/Date.vue";
import Discount from "../components/convert/Discount.vue";
import Percentage from "../components/convert/Percentage.vue";
import Length from "../components/convert/Length.vue";
import Area from "../components/convert/Area.vue";
import Volume from "../components/convert/Volume.vue";
import Temperature from "../components/convert/Temperature.vue";
import Speed from "../components/convert/Speed.vue";
import Time from "../components/convert/Time.vue";
import Mass from "../components/convert/Mass.vue";
import Pressure from "../components/convert/Pressure.vue";
import Energy from "../components/convert/Energy.vue";
import Frequency from "../components/convert/Frequency.vue";
import DigitalStorage from "../components/convert/DigitalStorage.vue";
import NumeralSystem from "../components/convert/NumeralSystem.vue";

import {
  mdiClockTimeThreeOutline,
  mdiSpeedometerSlow,
  mdiTagMultipleOutline,
  mdiCalendarRange,
  mdiPercentOutline,
  mdiWeight,
  mdiAngleAcute,
  mdiCakeVariant,
  mdiCubeOutline,
  mdiThermometerLow,
  mdiRuler,
  mdiTextureBox,
  mdiDiceD10Outline,
  mdiHumanMaleHeightVariant,
  mdiAccessPoint,
  mdiArrowLeft,
  mdiSd,
  mdiLightningBoltOutline,
  mdiGauge
} from "@mdi/js";
export default {
  name: "Convert",
  data() {
    return {
      mdiArrowLeft: mdiArrowLeft,
      showConvertItems: true,
      currentItem: "",
      items: [
        { title: "BMI", src: mdiHumanMaleHeightVariant },
        { title: "Age", src: mdiCakeVariant },
        { title: "Date", src: mdiCalendarRange },
        { title: "Discount", src: mdiTagMultipleOutline },
        { title: "Percentage", src: mdiPercentOutline },
        { title: "Angle", src: mdiAngleAcute },
        { title: "Length", src: mdiRuler },
        { title: "Area", src: mdiTextureBox },
        { title: "Volume", src: mdiCubeOutline },
        { title: "Temperature", src: mdiThermometerLow },
        { title: "Speed", src: mdiSpeedometerSlow },
        { title: "Time", src: mdiClockTimeThreeOutline },
        { title: "Mass", src: mdiWeight },
        { title: "Energy", src: mdiLightningBoltOutline },
        { title: "Pressure", src: mdiGauge },
        { title: "Frequency", src: mdiAccessPoint },
        { title: "Digital Storage", src: mdiSd },
        { title: "Numeral System", src: mdiDiceD10Outline }
      ]
    };
  },
  computed: {
    currentItemComponent() {
      let ret = "";
      switch (this.currentItem) {
        case "BMI":
          ret = "convert-bmi";
          break;
        case "Angle":
          ret = "convert-angle";
          break;
        case "Age":
          ret = "convert-age";
          break;
        case "Date":
          ret = "convert-date";
          break;
        case "Discount":
          ret = "convert-discount";
          break;
        case "Percentage":
          ret = "convert-percentage";
          break;
        case "Length":
          ret = "convert-length";
          break;
        case "Area":
          ret = "convert-area";
          break;
        case "Volume":
          ret = "convert-volume";
          break;
        case "Temperature":
          ret = "convert-temperature";
          break;
        case "Speed":
          ret = "convert-speed";
          break;
        case "Time":
          ret = "convert-time";
          break;
        case "Mass":
          ret = "convert-mass";
          break;
        case "Energy":
          ret = "convert-energy";
          break;
        case "Pressure":
          ret = "convert-pressure";
          break;
        case "Frequency":
          ret = "convert-frequency";
          break;
        case "Digital Storage":
          ret = "convert-digital-storage";
          break;
        case "Numeral System":
          ret = "convert-numeral-system";
      }
      return ret;
    }
  },
  methods: {
    showComponent(item) {
      this.showConvertItems = false;
      this.currentItem = item.title;
    }
  },
  components: {
    "convert-bmi": BMI,
    "convert-angle": Angle,
    "convert-age": Age,
    "convert-date": Date,
    "convert-discount": Discount,
    "convert-percentage": Percentage,
    "convert-length": Length,
    "convert-area": Area,
    "convert-volume": Volume,
    "convert-temperature": Temperature,
    "convert-speed": Speed,
    "convert-time": Time,
    "convert-mass": Mass,
    "convert-pressure": Pressure,
    "convert-energy": Energy,
    "convert-frequency": Frequency,
    "convert-digital-storage": DigitalStorage,
    "convert-numeral-system": NumeralSystem
  }
};
</script>

<style>
.convert {
  margin: 1rem;
}

.convert__items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.convert__item {
  flex: 1;
  display: inline-block;
  font-size: 14px;
  min-width: 100px;
  margin: 3px;
  padding: 2em 0.5em;
  cursor: pointer;
  text-align: center;
  transition: 100ms ease;
}

.convert__item:hover {
  background-color: var(--grey-lighten-3);
}

.convert__item:focus {
  background-color: var(--grey-lighten-3);
  border: none;
  outline: none;
}

.titlebar {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-bottom: 15px;
}

.titlebar__back {
  border: none;
  outline: none;
  background-color: var(--white);
  cursor: pointer;
}

.titlebar__title {
  flex: 2;
  font-size: 20px;
}

.wrapper-convert-element .focus {
  color: #09b464;
}

.wrapper__item {
  display: flex;
  justify-content: space-between;
  margin: 0 10px 0 0;
  font-size: 18px;
}

.g-1,
.g-2 {
  flex: 1;
  text-align: right;
  cursor: pointer;
}

/* button:focus,
button::-moz-focus-inner {
  border: none;
  outline: none !important;
} */
</style>
