<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    class?: string;
    icon?: string;
    title: string;
  }>(),
  {
    type: "button",
    icon: "",
    title: "",
  }
);
const emitters = defineEmits(["setStudentType"]);
</script>
<template>
  <!-- cards -->
  <div class="cursor-pointer" @click="emitters('setStudentType')">
    <div
      class="w-full bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex flex-col items-center p-10">
        <img
          class="w-40 h-40 mb-3 rounded-full shadow-lg"
          :src="props.icon"
          alt="icon"
          :class="props.class"
        />

        <span class="text-md text-gray-800 font-medium">{{ props.title }}</span>
      </div>
    </div>
  </div>
</template>
