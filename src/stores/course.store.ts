// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";
import courseService from "@/services/course/course.service";
import { notify } from "@kyvg/vue3-notification";

export const useCourseStore = defineStore("course", () => {
  const isLoading = ref(false);
  const page = ref(0);
  const totalPage = ref(0);

  const fetchCourses = async (query: string) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        if (page.value == totalPage.value && totalPage.value !== 0) {
          return;
        }
        page.value += 1;
        const queryString = `page=${page.value}&${query}`;
        const students = await courseService.findManyCourses(queryString);
        totalPage.value = students.totalPage;
        return students;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Fetch Error",
        text: error.message || " could not fetch courses",
      });
      throw new Error(error.message || " could not fetch courses");
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, fetchCourses, page };
});
