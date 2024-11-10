<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import comingSoon from "../../assets/lotties/coming-soon.json";
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center bg-gray-100">
    <Vue3Lottie
      ref="customControl"
      :animationData="comingSoon"
      :height="400"
      :width="400"
      :loop="true"
      :speed="2"
      :autoPlay="true"
      :pauseAnimation="true"
      :pauseOnHover="true"
    />
  </div>
</template>
