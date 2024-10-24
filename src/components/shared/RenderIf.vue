<script setup lang="ts">
defineProps<{
  condition: boolean;
}>();
</script>

<template>
  <slot v-if="condition"></slot>
</template>

<style></style>
