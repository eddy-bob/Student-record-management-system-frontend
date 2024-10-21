// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";
import studentService from "@/services/student/student.service";
import { notify } from "@kyvg/vue3-notification";
import { AddStudent, UpdateStudent } from "@/services/student/student.type";

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
        const queryString = `page=${page.value}${query}`;
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
        text: error.message || " could not fetch student",
      });
      throw new Error(error.message || " could not fetch student");
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
        text: error.message || " could not delete student data",
      });
      throw new Error(error.message || " could not delete student data");
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
        text: error.message || " could not update student record",
      });
      throw new Error(error.message || " could not update student record");
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
        text: error.message || " could not create student record",
      });
      throw new Error(error.message || " could not create student record");
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
    page,
  };
});
