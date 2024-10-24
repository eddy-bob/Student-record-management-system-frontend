<script setup lang="ts">
import { reactive, ref } from "vue";
import RenderIf from "@/components/shared/RenderIf.vue";
import { Role } from "@/type";
import { useOperatorStore } from "@/stores/operator.store";
import { Button } from "@/components";
import { useRouter } from "vue-router";
import EmptyState from "@/components/shared/EmptyState.vue";
const operatorStore = useOperatorStore();

const router = useRouter();

const editedValue = ref("");
let currentlyEditedOperator = ref<{ field: string; index: number }>({
  field: "",
  index: -1,
});
interface Operator {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
}
let operators = reactive<Operator[]>([]);
// const operators = reactive([
//   {
//     id: "1",
//     name: "Engr Chisom ",
//     email: "hodelectrical@gmail.com",
//     role: Role.Super,
//   },
//   {
//     id: "2",
//     name: "Hon Igwe Victor",
//     email: "igwevictor@gmail.com",
//     role: Role.Exco,
//   },
//   { id: "3", name: "Dr Ezenugu", email: "ezenugu@gmail.com", role: Role.Admin },
//   { id: "4", name: "Dr Eze", email: "eze@gmail.com", role: Role.Admin },
// ]);

// methods
const editField = (index: number, field: string) => {
  currentlyEditedOperator.value = { index, field };
  editedValue.value = operators[index][field as keyof (typeof operators)[0]];
};
const updateOperator = async (id: string, data: any) => {
  await operatorStore.updateOperator(id, data.value);
};
const saveItem = (index: number, field: string) => {
  if (editedValue.value.trim()) {
    operators[index][field as keyof (typeof operators)[0]] =
      editedValue.value as any;
    updateOperator(operators[index].id, { [field]: editedValue.value });
  }
};
const fetchAdmins = async () => {
  const operatorsData = await operatorStore.findManyOperators();
  operators = [...operatorsData.data];
};
const deleteAdmin = async (id: string) => {
  await operatorStore.deleteOperator(id);
};

fetchAdmins();
</script>

<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
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
          <th scope="col" class="px-6 py-3">First Name</th>
          <th scope="col" class="px-6 py-3">Last Name</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Role</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <RenderIf :condition="operatorStore.isLoading">
        <tbody>
          <tr>
            <td colspan="7">
              <div class="mt-20"><Spinner /></div>
            </td>
          </tr>
        </tbody>
      </RenderIf>
      <RenderIf :condition="operatorStore.isLoading == false && !operators[0]">
        <tbody>
          <tr>
            <td colspan="7">
              <div class="mt-20"><component :is="EmptyState" /></div>
            </td>
          </tr>
        </tbody>
      </RenderIf>
      <RenderIf :condition="operatorStore.isLoading == false && !!operators[0]">
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
                  currentlyEditedOperator.field === 'firstName'
                "
              >
                <input
                  v-model="editedValue"
                  @blur="saveItem(i, 'firstName')"
                  @keyup.enter="saveItem(i, 'firstName')"
                  class="bg-grey-400"
                />
              </RenderIf>
              <RenderIf
                :condition="
                  currentlyEditedOperator.index !== i ||
                  currentlyEditedOperator.field !== 'firstName'
                "
              >
                {{ data.firstName
                }}<i
                  class="fa-solid fa-pencil"
                  @click="editField(i, 'firstName')"
                ></i>
              </RenderIf>
            </th>
            <th
              scope="row"
              class="px-6 py-4 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <RenderIf
                :condition="
                  currentlyEditedOperator.index == i &&
                  currentlyEditedOperator.field === 'lastName'
                "
              >
                <input
                  v-model="editedValue"
                  @blur="saveItem(i, 'lastName')"
                  @keyup.enter="saveItem(i, 'lastName')"
                  class="bg-grey-400"
                />
              </RenderIf>
              <RenderIf
                :condition="
                  currentlyEditedOperator.index !== i ||
                  currentlyEditedOperator.field !== 'lastName'
                "
              >
                {{ data.firstName
                }}<i
                  class="fa-solid fa-pencil"
                  @click="editField(i, 'lastName')"
                ></i>
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
                <i
                  class="fa-solid fa-pencil"
                  @click="editField(i, 'email')"
                ></i>
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
                :onclick="() => deleteAdmin(data.id)"
                type="button"
                class="font-medium text-red-600 dark:text-blue-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody></RenderIf
      >
    </table>
  </div>
</template>
