// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";
import resultService from "@/services/result/result.service";
import { notify } from "@kyvg/vue3-notification";
import { AddResult, UpdateResult } from "@/services/result/result.type";

export const useResultStore = defineStore("result", () => {
  const isLoading = ref(false);
  const page = ref(0);
  const totalPage = ref(0);

  const fetchResults = async (query: string) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        if (page.value == totalPage.value && totalPage.value !== 0) {
          return;
        }
        page.value += 1;
        const queryString = `page=${page.value}${query}`;
        const students = await resultService.findManyResults(queryString);
        totalPage.value = students.totalPage;
        return students;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Fetch Error",
        text: error.message || " could not fetch results",
      });
      throw new Error(error.message || " could not fetch results");
    } finally {
      isLoading.value = false;
    }
  };
  const updateResult = async (data: UpdateResult, id: string) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;
        const students = await resultService.updateResult(data, id);
        notify({
          type: "success",
          title: "Update Success",
          text: "Result updated successfully",
        });
        return students;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Update Error",
        text: error.message || " could not update results",
      });
      throw new Error(error.message || " could not update results");
    } finally {
      isLoading.value = false;
    }
  };
  const uploadResult = async (data: AddResult[]) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;
        const students = await resultService.createResult(data);
        notify({
          type: "success",
          title: "Add Success",
          text: "Results uploaded successfully",
        });
        return students;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Add Error",
        text: error.message || " could not upload results",
      });
      throw new Error(error.message || " could not upload results");
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, uploadResult, fetchResults, updateResult, page };
});
