<template>
  <div class="history">
    <div class="history__items" v-if="items.length > 0">
      <div class="history__item" v-for="(item, index) in items" :key="index">
        <calculator-input :input="item.input"></calculator-input>
        <div class="history__result">{{ item.result }}</div>
        <v-divider></v-divider>
      </div>
    </div>
    <h2 class="history__nothing" v-else>
      Nothing to show
    </h2>
  </div>
</template>

<script>
import CalculatorInput from "../components/CalculatorInput.vue";
export default {
  name: "History",
  created() {
    const items = JSON.parse(window.localStorage.getItem("calculator"));
    if (items) {
      this.items = items;
    }
  },
  data() {
    return {
      items: []
    };
  },
  components: {
    CalculatorInput
  }
};
</script>

<style scoped>
.history {
  font-size: 20px;
}

.history__item {
  margin: 10px;
}

.history__result {
  text-align: right;
}

.history__nothing {
  margin-top: 50px;
  text-align: center;
  color: #bdbdbd;
}
</style>
