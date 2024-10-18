<script setup lang="ts">
defineProps<{
  condition: boolean;
}>();
</script>

<template>
  <div>
    <slot v-if="condition"></slot>
  </div>
</template>

<style></style>
