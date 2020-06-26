<template>
  <div class="convert">
    <div class="convert__group" v-if="showConvertItems">
      <!-- toggle view buttons -->
      <div class="view-type">
        <v-btn-toggle v-model="isListView" color="#09b464" dense mandatory>
          <v-btn :value="true" title="List View">
            <v-icon color="#09b464">{{ mdiFormatAlignJustify }}</v-icon>
          </v-btn>
          <v-btn :value="false" title="Grid View">
            <v-icon color="#09b464">{{ mdiViewGrid }}</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
      <div
        class="convert__group--item"
        v-for="(item, index) in items"
        :key="index"
      >
        <v-subheader>{{ item.title }}</v-subheader>

        <!-- if list view -->
        <v-list v-if="isListView">
          <v-list-item
            v-for="listItem in item.value"
            :to="{ name: listItem.link }"
            :key="listItem.title"
          >
            <v-list-item-action>
              <v-icon>{{ listItem.src }} </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ listItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- if grid view -->
        <div v-else class="convert__items">
          <router-link
            class="convert__item"
            v-for="gridItem in item.value"
            :key="gridItem.title"
            :to="{ name: gridItem.link }"
            tag="div"
            :data-item="gridItem.title"
            tabindex="0"
          >
            <v-icon>{{ gridItem.src }} </v-icon>
            <p :data-item="gridItem.title">{{ gridItem.title }}</p>
          </router-link>
        </div>

        <!-- divide different subheaders -->
        <v-divider v-if="index < items.length - 1"></v-divider>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  mdiViewGrid,
  mdiFormatAlignJustify,
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
  mdiGauge,
  mdiWallet
} from "@mdi/js";
export default {
  name: "Convert",
  data() {
    return {
      isListView: true,
      mdiViewGrid,
      mdiFormatAlignJustify,
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
            { title: "Percentage", link: "Percentage", src: mdiPercentOutline },
            { title: "Split Bill", link: "SplitBill", src: mdiWallet }
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

.view-type {
  display: flex;
  justify-content: right;
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
