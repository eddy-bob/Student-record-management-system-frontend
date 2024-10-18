<script setup lang="ts">
import { ref } from "vue";
import { Role } from "@/type";
import RenderIf from "@/components/shared/RenderIf.vue";

const data = ref({
  firstName: "Eddy",
  lastName: "Madu",
  email: "edymadu90@gmail.com",
  role: Role.Admin,
  confirmPassword: "",
  password: "1234567",
});
const isEditPasword = ref(false);
</script>

<template>
  <div>
    <form>
      <div>
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Admin Information
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <label
                for="first-name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >First Name</label
              >
              <div class="mt-2">
                <input
                  v-model="data.firstName"
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                for="last-name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Last name</label
              >
              <div class="mt-2">
                <input
                  v-model="data.lastName"
                  type="text"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  v-model="data.email"
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
              <div class="mt-2">
                <input
                  @focusin="[(isEditPasword = true), (data.password = '')]"
                  id="password"
                  name="password"
                  type="password"
                  v-model="data.password"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <RenderIf :condition="isEditPasword == true">
              <div>
                <label
                  for="confirm-password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Confirm Password</label
                >
                <div class="mt-2">
                  <input
                    required
                    v-model="data.confirmPassword"
                    id="confirm-pasword"
                    name="confirm-password"
                    type="password"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </RenderIf>

            <div>
              <label
                for="role"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Role</label
              >
              <div class="mt-2">
                <select
                  disabled
                  id="role"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option>
                    {{ data.role }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex justify-start">
        <button
          type="submit"
          class="rounded-md w-[100px] bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
