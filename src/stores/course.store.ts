// stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";
import courseService from "@/services/course/course.service";
import { notify } from "@kyvg/vue3-notification";
import { AddCourse, UpdateCourse } from "@/services/course/course.type";

export const useCourseStore = defineStore("course", () => {
  const isLoading = ref(false);

  const fetchCourses = async (query: string, pageNumber = 1) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;
        const queryString = `page=${pageNumber}${query}`;
        const courses = await courseService.findManyCourses(queryString);
        return courses;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Fetch Error",
        text: error.response?.data?.message || " could not fetch courses",
      });
      throw new Error(
        error.response?.data?.message || " could not fetch courses"
      );
    } finally {
      isLoading.value = false;
    }
  };

  const addCourse = async (data: AddCourse[]) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        const course = await courseService.createCourse(data);
        notify({
          type: "success",
          title: "Add Success",
          text: "Course created successfully",
        });
        return course;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Add Error",
        text: error.response?.data?.message || "Could not create course",
      });
      throw new Error(
        error.response?.data?.message || "Could not create course"
      );
    } finally {
      isLoading.value = false;
    }
  };

  const updateCourse = async (data: UpdateCourse, id: string) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        const course = await courseService.updateCourse(data, id);
        notify({
          type: "success",
          title: "Update Success",
          text: "Course updated successfully",
        });
        return course;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Update Error",
        text: error.response?.data?.message || "Could not update course",
      });
      throw new Error(
        error.response?.data?.message || "Could not update course"
      );
    } finally {
      isLoading.value = false;
    }
  };
  const deleteCourse = async (id: string) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        const course = await courseService.deleteCourse(id);
        notify({
          type: "success",
          title: "Delete Success",
          text: "Course deleted successfully",
        });
        return course;
      }
    } catch (error: any) {
      console.log(error);
      notify({
        type: "error",
        title: "Delete Error",
        text: error.response?.data?.message || "Could not delete course",
      });
      throw new Error(
        error.response?.data?.message || "Could not delete course"
      );
    } finally {
      isLoading.value = false;
    }
  };

  const findCourse = async (id: string) => {
    try {
      if (!isLoading.value) {
        isLoading.value = true;

        const course = await courseService.findCourse(id);
        notify({
          type: "success",
          title: "Fetch Success",
          text: "Course fetched successfully",
        });
        return course;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Fetch Error",
        text: error.response?.data?.message || "Could not fetch course",
      });
      throw new Error(
        error.response?.data?.message || "Could not fetch course"
      );
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    deleteCourse,
    updateCourse,
    addCourse,
    fetchCourses,
    findCourse,
  };
});
