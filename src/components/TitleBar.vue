<template>
  <div class="titlebar">
    <button
      class="titlebar__back"
      tabindex="0"
      @keydown.enter="goBack"
      @click="goBack"
    >
      <v-icon>{{ mdiArrowLeft }} </v-icon>
    </button>
    <h3 class="titlebar__title">{{ title }}</h3>
  </div>
</template>

<script>
import { mdiArrowLeft } from "@mdi/js";
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      mdiArrowLeft
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.titlebar {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-bottom: 15px;
}

.titlebar__back {
  cursor: pointer;
}

.titlebar__title {
  flex: 2;
  font-size: 20px;
}
</style>
