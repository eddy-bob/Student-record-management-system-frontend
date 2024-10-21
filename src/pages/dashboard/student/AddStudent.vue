<script setup lang="ts">
import { reactive } from "vue";
import { Button } from "@/components";
import { Gender, Options } from "@/type";
import { useStudentStore } from "@/stores/student.store";
import { AddStudent } from "@/services/student/student.type";

const studentStore = useStudentStore();
const studentData = reactive<AddStudent>({
  regNumber: "",
  firstName: "",
  lastName: "",
  middleName: "",
  admissionSet: "",
  option: Options.TELECOM,
  gender: Gender.MALE,
});

const createStudent = async () => {
  await studentStore.addStudent([studentData]);
};
</script>

<template>
  <div class="">
    <p
      for="password"
      class="block mb-7 font-medium text-center text-[30px] text-gray-900 dark:text-white"
    >
      Register new student
    </p>
    <form v-on:submit.prevent="createStudent" class="max-w-sm mx-auto">
      <div class="grid grid-cols-2 gap-4">
        <div class="mb-5">
          <label
            for="first-name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >User first name*</label
          >
          <input
            type="text"
            v-model="studentData.firstName"
            id="first-name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="user first name here"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="middle-name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >User middle name*</label
          >
          <input
            type="text"
            id="middle-name"
            v-model="studentData.middleName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="User middle name here"
          />
        </div>
      </div>
      <div class="mb-5">
        <label
          for="last-name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >User last name</label
        >
        <input
          type="text"
          v-model="studentData.lastName"
          id="last-name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="User last name here"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="reg-number"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >User Reg/Mat Number*</label
        >
        <input
          type="text"
          v-model="studentData.regNumber"
          id="reg-number"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="E.G IMSU/2019/1430"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="option"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select option*</label
        >
        <select
          v-model="studentData.option"
          id="option"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="" disabled selected>Select an option...</option>
          <option
            v-for="(option, i) in Object.values(Options).slice(0, -1)"
            :key="i"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="mb-5">
        <label
          for="gender"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select gender*</label
        >

        <select
          v-model="studentData.gender"
          id="gender"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="" disabled selected>Select a gender...</option>
          <option v-for="(gender, i) in Gender" :key="i">
            {{ gender }}
          </option>
        </select>
      </div>

      <div class="flex w-full">
        <Button
          :loading="studentStore.isLoading"
          type="submit"
          class="text-white mb-2 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        />
      </div>
    </form>
  </div>
</template>
