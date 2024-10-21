<script setup lang="ts">
import { withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    onClick?: () => any;
    class?: string;
    style?: string;
    title?: string;
    loading?: boolean;
  }>(),
  {
    type: "button",
    onClick: () => {},
    style: "",
    title: "Submit",
    loading: false,
  }
);
</script>
<template>
  <button
    :disabled="loading"
    class="hover:bg-gray-100 flex justify-center text-gray-800 font-semibold text-center align-middle py-2 px-4 border border-gray-400 rounded shadow"
    :class="class"
    :type="type"
    :onclick="onClick"
    :style="style"
  >
    <svg
      v-if="loading == true"
      class="animate-spin h-5 w-5 mr-3 bg-white ..."
      viewBox="0 0 24 24"
    ></svg>
    <span> {{ props.title }}</span>
  </button>
</template>
