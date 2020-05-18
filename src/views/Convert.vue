<template>
  <div class="convert">
    <div class="convert__items" v-if="showConvertItems">
      <div
        class="convert__item"
        v-for="(item, index) in items"
        :key="index"
        :data-item="item.title"
        @click="showComponent"
      >
        <img :data-item="item.title" :src="item.src" alt="" />
        <p :data-item="item.title">{{ item.title }}</p>
      </div>
    </div>
    <div class="" v-else>
      <div class="titlebar">
        <button class="titlebar__back" @click="showConvertItems = true">
          <img src="../assets/back.svg" />
        </button>
        <h3 class="titlebar__title">{{ currentItem }}</h3>
      </div>
      <component :is="currentItemComponent"></component>
    </div>
  </div>
</template>

<script>
export default {
  name: "Convert",
  data() {
    return {
      showConvertItems: true,
      currentItem: "",
      items: [
        { title: "BMI", src: "../assets/" },
        { title: "Age", src: "../assets/" },
        { title: "Date", src: "../assets/" },
        { title: "Discount", src: "../assets/" },
        { title: "Percentage", src: "../assets/" },
        { title: "Length", src: "../assets/" },
        { title: "Area", src: "../assets/" },
        { title: "Volume", src: "../assets/" },
        { title: "Temperature", src: "../assets/" },
        { title: "Speed", src: "../assets/" },
        { title: "Time", src: "../assets/" },
        { title: "Mass", src: "../assets/" },
        { title: "Numeral System", src: "../assets/" }
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
        case "Numeral System":
          ret = "convert-numeral-system";
      }
      return ret;
    }
  },
  methods: {
    showComponent(ev) {
      this.showConvertItems = false;
      this.currentItem = ev.target.dataset.item;
    }
  },
  components: {
    "convert-age": () =>
      import(
        /* webpackPrefetch: true, webpackChunkname: "Age" */ "../components/convert/Age.vue"
      ),
    "convert-date": () =>
      import(
        /* webpackPrefetch: true, webpackChunkname: "Date" */ "../components/convert/Date.vue"
      ),
    "convert-discount": () =>
      import(
        /* webpackPrefetch: true, webpackChunkname: "Discount" */ "../components/convert/Discount.vue"
      ),
    "convert-percentage": () =>
      import(
        /* webpackPrefetch: true, webpackChunkname: "Percentage" */ "../components/convert/Percentage.vue"
      )
  }
};
</script>

<style scoped>
.convert {
  margin: 1rem;
}

.convert__items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}

.convert__item {
  width: 100px;
  font-size: 14px;
  border: 1px solid #000;
  padding: 2em 0.5em;
  cursor: pointer;
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
</style>
