<script setup lang="ts">
import { Button } from "@/components";
import { Semester, Options, Level } from "@/type";
</script>

<template>
  <div class="">
    <p
      for="password"
      class="block mb-7 font-medium text-center text-[30px] text-gray-900 dark:text-white"
    >
      Create new course
    </p>
    <form v-on:submit.prevent="() => {}" class="max-w-sm mx-auto">
      <div class="grid grid-cols-2 gap-4">
        <div class="mb-5">
          <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Course Title</label
          >
          <input
            type="text"
            id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="course title here"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="course-code"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Course Code</label
          >
          <input
            required
            type="text"
            id="course-code"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Course code here"
          />
        </div>
      </div>
      <div class="mb-5">
        <label
          for="unit"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Course Unit</label
        >
        <input
          type="number"
          id="unit"
          min="1"
          max="25"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="course unit here"
          required
        />
      </div>

      <div class="mb-5">
        <label
          for="option"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select Course Option</label
        >
        <select
          required
          id="option"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="" disabled selected>Select an option...</option>
          <option v-for="(option, i) in Options" :key="i">
            <span>{{ option }}</span>
          </option>
        </select>
      </div>
      <div class="mb-5">
        <label
          for="semester"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select Semester</label
        >

        <select
          id="semester"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="" disabled selected>Select semester...</option>
          <option v-for="(semester, i) in Semester" :key="i">
            <span>{{ semester }}</span>
          </option>
        </select>
      </div>

      <div class="mb-5">
        <label
          for="semester"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select Level</label
        >

        <select
          id="level"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="" disabled selected>Select level...</option>
          <option v-for="(level, i) in Level" :key="i">
            <span>{{ level }}</span>
          </option>
        </select>
      </div>
      <div class="flex w-full">
        <Button
          type="submit"
          class="text-white mb-2 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        />
      </div>
    </form>
  </div>
</template>
