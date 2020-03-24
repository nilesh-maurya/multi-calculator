<template>
  <button :data-type="type" :data-action="action" :data-value="value">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ""
    },
    action: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped></style>
