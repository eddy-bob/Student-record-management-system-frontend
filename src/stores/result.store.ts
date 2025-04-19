// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";
import resultService from "@/services/result/result.service";
import { notify } from "@kyvg/vue3-notification";
import { AddResult, UpdateResult } from "@/services/result/result.type";

export const useResultStore = defineStore("result", () => {
  const isLoading = ref(false);

  const fetchResults = async (query: string, pageNumber = 1) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        const queryString = `page=${pageNumber}${query}`;
        const results = await resultService.findManyResults(queryString);
        return results;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Fetch Error",
        text: error.response?.data?.message || " could not fetch results",
      });
      throw new Error(
        error.response?.data?.message || " could not fetch results"
      );
    } finally {
      isLoading.value = false;
    }
  };
  const updateResult = async (data: UpdateResult, id: string) => {
    try {
      if (!isLoading.value) {
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
        text: error.response?.data?.message || " could not update results",
      });
      throw new Error(
        error.response?.data?.message || " could not update results"
      );
    }
  };
  const deleteResult = async (id: string) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;
        const deletedResult = await resultService.deleteResult(id);
        notify({
          type: "success",
          title: "Delete Success",
          text: "Result deleted successfully",
        });
        return deletedResult;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Delete Error",
        text: error.response?.data?.message || " could not update results",
      });
      throw new Error(
        error.response?.data?.message || " could not remove result"
      );
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
        text: error.response?.data?.message || " could not upload results",
      });
      throw new Error(
        error.response?.data?.message || " could not upload results"
      );
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, uploadResult, fetchResults, updateResult, deleteResult };
});
