<script setup lang="ts">
import { provide, shallowRef } from "vue";
import layouts from "./layouts";
import { useRouter } from "vue-router";
import type { RouteLocationNormalized } from "vue-router";

// initialize components based on data attribute selectors

type Layout = typeof layouts;

const router = useRouter();
const layout = shallowRef();

// compute which layout to use
router.afterEach((to: RouteLocationNormalized) => {
  const layoutkey = to.meta.layout as keyof Layout;
  layout.value = layouts[layoutkey];
});

// providers and injectors
provide("app:layout", layout);
</script>

<template>
  <div class="">
    <component :is="layout || 'div'">
      <router-view />
    </component>
  </div>
</template>

<style scoped></style>
