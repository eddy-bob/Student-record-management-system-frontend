<script setup lang="ts">
import { reactive, ref } from "vue";
import RenderIf from "@/components/shared/RenderIf.vue";
import { Role } from "@/type";
import { Button } from "@/components";
import { useRouter } from "vue-router";

const router = useRouter();

const editedValue = ref("");
let currentlyEditedOperator = ref<{ field: string; index: number }>({
  field: "",
  index: -1,
});
const operators = reactive([
  {
    id: "1",
    name: "Engr Chisom ",
    email: "hodelectrical@gmail.com",
    role: Role.Super,
  },
  {
    id: "2",
    name: "Hon Igwe Victor",
    email: "igwevictor@gmail.com",
    role: Role.Exco,
  },
  { id: "3", name: "Dr Ezenugu", email: "ezenugu@gmail.com", role: Role.Admin },
  { id: "4", name: "Dr Eze", email: "eze@gmail.com", role: Role.Admin },
]);

// methods
const editField = (index: number, field: string) => {
  currentlyEditedOperator.value = { index, field };
  editedValue.value = operators[index][field as keyof (typeof operators)[0]];
};
const saveItem = (index: number, field: string) => {
  if (editedValue.value.trim()) {
    operators[index][field as keyof (typeof operators)[0]] =
      editedValue.value as any;
  }
};
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="p-6 flex justify-end">
      <Button
        title="Create New Admin"
        class="text-sm"
        type="button"
        :onClick="() => router.push('/add-operator')"
      />
    </div>
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Role</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          v-for="(data, i) in operators"
          :key="data.id"
        >
          <th
            scope="row"
            class="px-6 py-4 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <RenderIf
              :condition="
                currentlyEditedOperator.index == i &&
                currentlyEditedOperator.field === 'name'
              "
            >
              <input
                v-model="editedValue"
                @blur="saveItem(i, 'name')"
                @keyup.enter="saveItem(i, 'name')"
                class="bg-grey-400"
              />
            </RenderIf>
            <RenderIf
              :condition="
                currentlyEditedOperator.index !== i ||
                currentlyEditedOperator.field !== 'name'
              "
            >
              {{ data.name
              }}<i class="fa-solid fa-pencil" @click="editField(i, 'name')"></i>
            </RenderIf>
          </th>

          <td class="px-6 py-4 cursor-pointer text-gray-900 font-medium">
            <RenderIf
              :condition="
                currentlyEditedOperator.index == i &&
                currentlyEditedOperator.field === 'email'
              "
            >
              <input
                v-model="editedValue"
                class="bg-grey-400"
                @blur="saveItem(i, 'email')"
                @keyup.enter="saveItem(i, 'email')"
              />
            </RenderIf>
            <RenderIf
              :condition="
                currentlyEditedOperator.index !== i ||
                currentlyEditedOperator.field !== 'email'
              "
            >
              {{ data.email }}
              <i class="fa-solid fa-pencil" @click="editField(i, 'email')"></i>
            </RenderIf>
          </td>
          <td class="px-6 py-4 cursor-pointer font-medium text-gray-900">
            <RenderIf
              :condition="
                currentlyEditedOperator.index == i &&
                currentlyEditedOperator.field === 'role'
              "
            >
              <input
                v-model="editedValue"
                class="bg-grey-400"
                @blur="saveItem(i, 'role')"
                @keyup.enter="saveItem(i, 'role')"
              />
            </RenderIf>

            <RenderIf
              :condition="
                currentlyEditedOperator.index !== i ||
                currentlyEditedOperator.field !== 'role'
              "
            >
              {{ data.role }}
              <i class="fa-solid fa-pencil" @click="editField(i, 'role')"></i>
            </RenderIf>
          </td>
          <td class="px-6 py-4">
            <button
              type="button"
              class="font-medium text-red-600 dark:text-blue-500 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
