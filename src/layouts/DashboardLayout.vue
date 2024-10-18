<script setup lang="ts">
import SideNav from "@/components/dashboard/SideNav.vue";
import AppNav from "@/components/dashboard/AppNav.vue";
</script>
<template>
  <div class="bg-gray-100">
    <!-- navbar -->
    <component :is="AppNav" />

    <div class="flex space-x-5">
      <component :is="SideNav" />
      <div
        class="w-full mt-[100px] max-h-screen min-h-screen overflow-y-scroll"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style></style>
