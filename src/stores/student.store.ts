// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";
import studentService from "@/services/student/student.service";
import { notify } from "@kyvg/vue3-notification";

export const useStudentStore = defineStore("student", () => {
  const isLoading = ref(false);
  const page = ref(0);
  const totalPage = ref(0);

  const fetchStudents = async (query: string) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        if (page.value == totalPage.value && totalPage.value !== 0) {
          return;
        }
        page.value += 1;
        const queryString = `page=${page.value}&${query}`;
        const students = await studentService.findManyStudents(queryString);
        totalPage.value = students.totalPage;
        return students;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Fetch Error",
        text: error.message || " could not fetch students",
      });
      throw new Error(error.message || " could not fetch students");
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, fetchStudents, page };
});
