// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";
export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(true);
  return { isAuthenticated };
});
