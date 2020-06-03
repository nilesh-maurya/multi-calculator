<template>
  <div class="convert">
    <div class="convert__items" v-if="showConvertItems">
      <div
        class="convert__item"
        v-for="(item, index) in items"
        :key="index"
        :data-item="item.title"
        @click="showComponent(item)"
      >
        <v-icon>{{ item.src }} </v-icon>
        <p :data-item="item.title">{{ item.title }}</p>
      </div>
    </div>
    <div class="" v-else>
      <div class="titlebar">
        <button
          class="titlebar__back btn-back"
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
  mdiSd
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
        { title: "Angle", src: mdiAngleAcute },
        { title: "Age", src: mdiCakeVariant },
        { title: "Date", src: mdiCalendarRange },
        { title: "Discount", src: mdiTagMultipleOutline },
        { title: "Percentage", src: mdiPercentOutline },
        { title: "Length", src: mdiRuler },
        { title: "Area", src: mdiTextureBox },
        { title: "Volume", src: mdiCubeOutline },
        { title: "Temperature", src: mdiThermometerLow },
        { title: "Speed", src: mdiSpeedometerSlow },
        { title: "Time", src: mdiClockTimeThreeOutline },
        { title: "Mass", src: mdiWeight },
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
    "convert-angle": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Angle" */
        "../components/convert/Angle.vue"
      ),
    "convert-age": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Age" */
        "../components/convert/Age.vue"
      ),
    "convert-date": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Date" */
        "../components/convert/Date.vue"
      ),
    "convert-discount": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Discount" */
        "../components/convert/Discount.vue"
      ),
    "convert-percentage": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Percentage" */
        "../components/convert/Percentage.vue"
      ),
    "convert-length": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Length" */
        "../components/convert/Length.vue"
      ),
    "convert-area": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Area" */
        "../components/convert/Area.vue"
      ),
    "convert-volume": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Volume" */
        "../components/convert/Volume.vue"
      ),
    "convert-temperature": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Temperature" */
        "../components/convert/Temperature.vue"
      ),
    "convert-speed": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Speed" */
        "../components/convert/Speed.vue"
      ),
    "convert-time": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Time" */
        "../components/convert/Time.vue"
      ),
    "convert-mass": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Mass" */
        "../components/convert/Mass.vue"
      ),
    "convert-frequency": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "Frequency" */
        "../components/convert/Frequency.vue"
      ),
    "convert-digital-storage": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "DigitalStorage" */
        "../components/convert/DigitalStorage.vue"
      ),
    "convert-numeral-system": () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "NumeralSystem" */
        "../components/convert/NumeralSystem.vue"
      )
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
  background-color: #eeeeee;
}

.titlebar {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-bottom: 15px;
}

.titlebar__back {
  width: 18px;
  height: 18px;
  border: none;
  outline: none;
  background-color: #fff;
  cursor: pointer;
}

.titlebar__title {
  flex: 2;
  font-size: 20px;
}

.wrapper-convert-element .focus {
  background: linear-gradient(210deg, #21dd85 0%, #09b464 100%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
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

button:focus,
button::-moz-focus-inner {
  border: none;
  outline: none !important;
}
</style>
