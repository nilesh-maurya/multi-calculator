<template>
  <div class="convert">
    <div class="convert__items" v-if="showConvertItems">
      <div
        class="convert__item"
        v-for="(item, index) in items"
        :key="index"
        :data-item="item.title"
        @click="changeComponent"
      >
        <img :data-item="item.title" src="" alt="" />
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
        { title: "Age" },
        { title: "Date" },
        { title: "Discount" },
        { title: "Percentage" },
        { title: "Length" },
        { title: "Area" },
        { title: "Volume" },
        { title: "Temperature" },
        { title: "Speed" },
        { title: "Time" },
        { title: "Mass" },
        { title: "Numeral System" }
      ]
    };
  },
  computed: {
    currentItemComponent() {
      let ret = "";
      switch (this.currentItem) {
        case "Age":
          ret = "convert-age";
          break;
        case "Date":
          ret = "Date";
          break;
      }
      return ret;
    }
  },
  methods: {
    changeComponent(ev) {
      console.log(ev);
      this.showConvertItems = false;
      this.currentItem = ev.target.dataset.item;
    }
  },
  components: {
    "convert-age": () =>
      import(
        /* webpackPrefetch: true, webpackChunkname: "Age" */ "../components/convert/Age.vue"
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
  /* margin: 10px; */
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
}
</style>
