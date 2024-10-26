<script setup lang="ts">
import { ref } from "vue";
import RenderIf from "@/components/shared/RenderIf.vue";
import { useOperatorStore } from "@/stores/operator.store";
import Button from "@/components/buttons/Button.vue";

const operatorStore = useOperatorStore();
const data = ref({
  firstName: operatorStore.operatorProfile.firstName,
  lastName: operatorStore.operatorProfile.lastName,
  email: operatorStore.operatorProfile.email,
  role: operatorStore.operatorProfile.role,
  newPassword: "",
  password: "",
});

const isEditPasword = ref(false);

const updateProfile = async () => {
  await operatorStore.updateSelfOperator(data.value);
};
</script>

<template>
  <div>
    <form @submit.prevent="updateProfile">
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
                  required
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                for="last-name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Last Name</label
              >
              <div class="mt-2">
                <input
                  v-model="data.lastName"
                  type="text"
                  required
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Email Address</label
              >
              <div class="mt-2">
                <input
                  v-model="data.email"
                  id="email"
                  required
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Current Password</label
              >
              <div class="mt-2">
                <input
                  @focusin="[(isEditPasword = true), (data.password = '')]"
                  id="password"
                  name="password"
                  required
                  type="password"
                  v-model="data.password"
                  class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <RenderIf :condition="isEditPasword == true">
              <div>
                <label
                  for="confirm-password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password</label
                >
                <div class="mt-2">
                  <input
                    required
                    v-model="data.newPassword"
                    id="confirm-pasword"
                    name="confirm-password"
                    type="password"
                    class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        <Button
          :loading="operatorStore.isLoading"
          title="Save"
          type="submit"
          class="rounded-md w-[100px] bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </div>
    </form>
  </div>
</template>
