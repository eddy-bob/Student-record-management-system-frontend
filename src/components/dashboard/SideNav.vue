<script setup lang="ts">
import isActive from "@/utils/isActive";

const toggleDropdown = (id: string) => {
  const dropdown = document.getElementById(id);
  dropdown?.classList.contains("hidden")
    ? dropdown.classList.replace("hidden", "block")
    : dropdown?.classList.replace("block", "hidden");
};
</script>
<template>
  <aside
    id="sidebar"
    class="flex flex-col flex-shrink-0 w-64 min-h-screen pt-16 font-normal duration-75 lg:flex transition-width"
    aria-label="Sidebar"
  >
    <div
      class="relative flex flex-col flex-1 min-h-0 pt-8 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="space-y-3">
        <div class="mb-3">
          <div
            :class="isActive('analytics') && 'text-white bg-indigo-700'"
            class="text-grey-900 hover:bg-indigo-700 hover:text-white w-full font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          >
            <i class="fa fa-home pr-2"></i>
            <RouterLink to="/analytics">Dashboard</RouterLink>
          </div>
        </div>
        <!-- student -->
        <button
          @click="toggleDropdown('student-dropdown')"
          class="text-grey-900 hover:bg-indigo-700 hover:text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          <i class="fa-solid fa-book-open-reader pr-2"></i> Student
          <div class="flex justify-end w-full">
            <svg
              class="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
        </button>

        <div
          id="student-dropdown"
          class="z-10 hidden bg-white w-auto divide-y divide-gray-100 rounded-lg shadow mx-3 dark:bg-gray-800"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHoverButton"
          >
            <li>
              <RouterLink
                :class="isActive('add-student') && 'text-indigo-700'"
                to="/add-student"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Register Student</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :class="isActive('list-students') && 'text-indigo-700'"
                to="/list-students"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >List Students</RouterLink
              >
            </li>
          </ul>
        </div>

        <button
          @click="toggleDropdown('course-dropdown')"
          class="text-grey-900 hover:bg-indigo-700 hover:text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          <i class="fa-solid fa-book-open pr-2"></i> Course
          <div class="flex justify-end w-full">
            <svg
              class="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
        </button>

        <div
          id="course-dropdown"
          class="z-10 hidden bg-white w-auto divide-y divide-gray-100 rounded-lg shadow mx-3 dark:bg-gray-800"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHoverButton"
          >
            <li>
              <RouterLink
                :class="isActive('add-course') && 'text-indigo-700'"
                to="/add-course"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Add Course</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :class="isActive('list-courses') && 'text-indigo-700'"
                to="/list-courses"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >List Course</RouterLink
              >
            </li>
          </ul>
        </div>
        <!-- result -->
        <button
          @click="toggleDropdown('result-dropdown')"
          class="text-grey-900 hover:bg-indigo-700 hover:text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          <i class="fa-solid fa-list-alt pr-2"></i> Result
          <div class="flex justify-end w-full">
            <svg
              class="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
        </button>

        <div
          id="result-dropdown"
          class="z-10 hidden bg-white w-auto divide-y divide-gray-100 rounded-lg shadow mx-3 dark:bg-gray-800"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHoverButton"
          >
            <li>
              <RouterLink
                to="/upload-results"
                :class="isActive('upload-results') && 'text-indigo-700'"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Upload Result</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/list-results"
                :class="isActive('list-results') && 'text-indigo-700'"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >List Results</RouterLink
              >
            </li>
          </ul>
        </div>
        <!-- admin -->

        <button
          @click="toggleDropdown('admin-dropdown')"
          class="text-grey-900 hover:bg-indigo-700 hover:text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          <i class="fa-solid fa-user-shield pr-2"></i> Admin
          <div class="flex justify-end w-full">
            <svg
              class="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
        </button>

        <div
          id="admin-dropdown"
          class="z-10 hidden bg-white w-auto divide-y divide-gray-100 rounded-lg shadow mx-3 dark:bg-gray-800"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHoverButton"
          >
            <li>
              <RouterLink
                :class="isActive('list-operators') && 'text-indigo-700'"
                to="/list-operators"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Manage Admin</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>
