<template>
  <div class="convert">
    <div class="convert__list" v-if="showConvertItems">
      <div
        class="convert__list--item"
        v-for="(item, index) in items"
        :key="index"
      >
        <v-subheader>{{ item.title }}</v-subheader>
        <div class="convert__items">
          <router-link
            class="convert__item"
            v-for="i in item.value"
            :key="i.title"
            :to="{ name: i.link }"
            tag="div"
            :data-item="i.title"
            tabindex="0"
          >
            <v-icon>{{ i.src }} </v-icon>
            <p :data-item="i.title">{{ i.title }}</p>
          </router-link>
        </div>
        <v-divider v-if="index < items.length - 1"></v-divider>
      </div>
    </div>
    <router-view />
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
  mdiSd,
  mdiLightningBoltOutline,
  mdiGauge
} from "@mdi/js";
export default {
  name: "Convert",
  data() {
    return {
      items: [
        {
          title: "Growth",
          value: [
            { title: "BMI", link: "BMI", src: mdiHumanMaleHeightVariant },
            { title: "Age", link: "Age", src: mdiCakeVariant },
            { title: "Date", link: "Date", src: mdiCalendarRange }
          ]
        },
        {
          title: "Finance",
          value: [
            { title: "Discount", link: "Discount", src: mdiTagMultipleOutline },
            { title: "Percentage", link: "Percentage", src: mdiPercentOutline }
          ]
        },
        {
          title: "Units",
          value: [
            { title: "Angle", link: "Angle", src: mdiAngleAcute },
            { title: "Length", link: "Length", src: mdiRuler },
            { title: "Area", link: "Area", src: mdiTextureBox },
            { title: "Volume", link: "Volume", src: mdiCubeOutline },
            {
              title: "Temperature",
              link: "Temperature",
              src: mdiThermometerLow
            },
            { title: "Speed", link: "Speed", src: mdiSpeedometerSlow },
            { title: "Time", link: "Time", src: mdiClockTimeThreeOutline },
            { title: "Mass", link: "Mass", src: mdiWeight },
            { title: "Energy", link: "Energy", src: mdiLightningBoltOutline },
            { title: "Pressure", link: "Pressure", src: mdiGauge },
            { title: "Frequency", link: "Frequency", src: mdiAccessPoint }
          ]
        },
        {
          title: "Digital",
          value: [
            { title: "Digital Storage", link: "DigitalStorage", src: mdiSd },
            {
              title: "Numeral System",
              link: "NumeralSystem",
              src: mdiDiceD10Outline
            }
          ]
        }
      ]
    };
  },
  computed: {
    showConvertItems() {
      return this.$route.name === "convert";
    }
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
</style>
