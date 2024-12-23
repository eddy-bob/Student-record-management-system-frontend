// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";
import studentService from "@/services/student/student.service";
import { notify } from "@kyvg/vue3-notification";
import { AddStudent, UpdateStudent } from "@/services/student/student.type";

export const useStudentStore = defineStore("student", () => {
  const isLoading = ref(false);

  const fetchStudents = async (query: string, pageNumber = 1) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        const queryString = `page=${pageNumber}${query}`;
        const students = await studentService.findManyStudents(queryString);
        return students;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Fetch Error",
        text: error.response?.data?.message || " could not fetch students",
      });
      throw new Error(
        error.response?.data?.message || " could not fetch students"
      );
    } finally {
      isLoading.value = false;
    }
  };

  const fetchStudent = async (query: string) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        const student = await studentService.findStudent(query);
        return student;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Fetch Error",
        text: error.response?.data?.message || " could not fetch student",
      });
      throw new Error(
        error.response?.data?.message || " could not fetch student"
      );
    } finally {
      isLoading.value = false;
    }
  };
  const deleteStudent = async (id: string) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        const student = await studentService.deleteStudent(id);
        return student;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Delete Error",
        text: error.response?.data?.message || " could not delete student data",
      });
      throw new Error(
        error.response?.data?.message || " could not delete student data"
      );
    } finally {
      isLoading.value = false;
    }
  };
  const updateStudent = async (data: UpdateStudent, id: string) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        const student = await studentService.updateStudent(data, id);
        notify({
          type: "success",
          title: "Update Success",
          text: "Updated student successfully",
        });
        return student;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Update Error",
        text:
          error.response?.data?.message || " could not update student record",
      });
      throw new Error(
        error.response?.data?.message || " could not update student record"
      );
    } finally {
      isLoading.value = false;
    }
  };
  const addStudent = async (data: AddStudent[]) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        const student = await studentService.createStudent(data);
        notify({
          type: "success",
          title: "Add Success",
          text: "Created student record successfully",
        });
        return student;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Add Error",
        text:
          error.response?.data?.message || " could not create student record",
      });
      throw new Error(
        error.response?.data?.message || " could not create student record"
      );
    } finally {
      isLoading.value = false;
    }
  };
  return {
    isLoading,
    addStudent,
    updateStudent,
    deleteStudent,
    fetchStudents,
    fetchStudent,
  };
});
