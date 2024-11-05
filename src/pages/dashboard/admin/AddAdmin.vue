<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { Button } from "@/components";
import { Role } from "@/type";
import { useOperatorStore } from "@/stores/operator.store";
import { AddOperator } from "@/services/operator/operator.type";

const operatorStore = useOperatorStore();
const confirmPassword = ref("");
const operatorData = reactive<AddOperator>({
  email: "",

  firstName: "",

  lastName: "",

  role: Role.Admin,

  password: "",

  adminPassword: "",
});

const passwordMatch = computed(() => {
  return operatorData.password === confirmPassword.value;
});
const createOperator = async () => {
  if (!passwordMatch) return;
  await operatorStore.createOperator(operatorData);
};
</script>

<template>
  <div class="">
    <p
      for="password"
      class="block mb-7 font-medium text-center text-[30px] text-gray-900 dark:text-white"
    >
      Create new operator
    </p>
    <form v-on:submit.prevent="createOperator" class="max-w-sm mx-auto">
      <div class="grid grid-cols-2 gap-4">
        <div class="mb-5">
          <label
            for="first-name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Operator First Name</label
          >
          <input
            type="text"
            id="first-name"
            v-model="operatorData.firstName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Operator first name here"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="last-name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Operator Last Name</label
          >
          <input
            type="text"
            id="last-name"
            v-model="operatorData.lastName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Operator last name here"
            required
          />
        </div>
      </div>
      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Operator Email</label
        >
        <input
          type="email"
          v-model="operatorData.email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@gmail.com"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Assign Operator Password</label
        >
        <input
          type="password"
          v-model="operatorData.password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Assign Operator password Again</label
        >
        <input
          type="password"
          id="password"
          v-model="confirmPassword"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <span v-if="!passwordMatch" style="color: red"
          >Passwords do not match!</span
        >
      </div>
      <div class="mb-5">
        <label
          for="role"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select Admin Role</label
        >
        <select
          id="role"
          v-model="operatorData.role"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="" disabled selected>Select a role...</option>
          <option v-for="(role, i) in Object.values(Role).slice(1)" :key="i">
            {{ role }}
          </option>
        </select>
      </div>
      <div class="mb-5">
        <label
          for="super-password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Super Admin Password</label
        >
        <input
          type="password"
          v-model="operatorData.adminPassword"
          id="super-password"
          class="bg-indigo-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <div class="flex w-full">
        <Button
        :loading="operatorStore.isLoading"
          title="Create Admin"
          type="submit"
          class="text-white mb-2 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        />
      </div>
    </form>
  </div>
</template>
