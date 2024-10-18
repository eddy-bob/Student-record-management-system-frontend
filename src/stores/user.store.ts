// stores/counter.js
import { defineStore } from "pinia";
import { reactive } from "vue";
export const useUserStore = defineStore("user", () => {
  const userProfile = reactive({});
  return { userProfile };
});
