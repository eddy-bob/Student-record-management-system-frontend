<script setup lang="ts">
import { defineEmits } from "vue";
import { useOperatorStore } from "@/stores/operator.store";

const operatorStore = useOperatorStore();
const toggleDropdown = (id: string) => {
  const dropdown = document.getElementById(id);
  dropdown?.classList.contains("hidden")
    ? dropdown.classList.replace("hidden", "block")
    : dropdown?.classList.replace("block", "hidden");
};
const emit = defineEmits(["openLogoutModal"]);
</script>
<template>
  <nav
    class="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            id="toggleSidebarMobile"
            aria-expanded="true"
            aria-controls="sidebar"
            class="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              id="toggleSidebarMobileHamburger"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              id="toggleSidebarMobileClose"
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <a href="" class="flex ml-2 md:mr-24">
            <img
              src="/images/logo-small.jpeg"
              class="h-8 mr-3"
              alt="FlowBite Logo"
            />
            <span
              class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
              >{{ operatorStore.operatorProfile.role }}</span
            >
          </a>
        </div>
        <div class="flex items-center">
          <button
            @click="toggleDropdown('admin')"
            class="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-indigo-600 dark:hover:text-indigo-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
            type="button"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 me-2 rounded-full"
              src="/images/user-icon.jpeg"
              alt="user photo"
            />
            {{ operatorStore.operatorProfile.firstName || "Admin" }}
            {{ operatorStore.operatorProfile.lastName || "Name" }}
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
          </button>

          <!-- Dropdown menu -->
          <div
            id="admin"
            class="z-10 hidden absolute top-16 right-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div class="font-medium">
                {{ operatorStore.operatorProfile.role || "Operator Role" }}
              </div>
              <div class="truncate">
                {{
                  operatorStore.operatorProfile.email || "operator@gmail.com"
                }}
              </div>
            </div>
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
            >
              <li>
                <RouterLink
                  to="/operator-profile"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Profile</RouterLink
                >
              </li>
            </ul>
            <div @click="emit('openLogoutModal')" class="py-2 cursor-pointer">
              <p
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
