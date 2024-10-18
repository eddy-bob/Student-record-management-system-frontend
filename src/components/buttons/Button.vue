<script setup lang="ts">
import { withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    onClick?: () => any;
    class?: string;
    style?: string;
    title?: string;
  }>(),
  {
    type: "button",
    onClick: () => {},
    style: "",
    title: "Submit",
  }
);
</script>
<template>
  <button
    class="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    :class="props.class"
    :type="props.type"
    :onclick="props.onClick"
    :style="props.style"
  >
    {{ props.title }}
  </button>
</template>
