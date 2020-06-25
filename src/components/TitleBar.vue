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

<style scoped></style>
