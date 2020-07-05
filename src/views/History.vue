<template>
  <div class="history">
    <div class="history__groups" v-if="items">
      <div
        class="history__group"
        v-for="(item, index) in Object.entries(items)"
        :key="index"
      >
        <v-subheader>{{ formatDate(item[0]) }}</v-subheader>
        <div class="history__items">
          <div v-for="(obj, i) in item[1]" :key="i">
            <history-item :item="obj"></history-item>
            <v-divider></v-divider>
          </div>
        </div>
      </div>
    </div>
    <h2 class="history__nothing" v-else>
      Nothing to show
    </h2>
  </div>
</template>

<script>
import HistoryItem from "../components/HistoryItem.vue";
import moment from "moment";

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
  methods: {
    formatDate(from) {
      // const today = moment();

      return moment(from, "YYYY MM DD").fromNow();
    }
  },
  components: {
    HistoryItem
  }
};
</script>

<style scoped>
.history {
  font-size: 18px;
}

.history__items {
  padding: 0 16px;
}

.history__item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
