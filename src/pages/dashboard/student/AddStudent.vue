<script setup lang="ts">
import { reactive, ref } from "vue";
import { Button } from "@/components";
import { Gender, Options } from "@/type";
import { useStudentStore } from "@/stores/student.store";
import { AddStudent } from "@/services/student/student.type";
import SelectFile from "@/components/forms/SelectFile.vue";
import RenderIf from "@/components/shared/RenderIf.vue";

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
const multipleStudentData = ref<AddStudent[]>([]);
const editedValue = ref("");
let currentlyEditedOperator = ref<{ field: string; index: number }>({
  field: "",
  index: -1,
});

const editField = <K extends keyof AddStudent>(index: number, field: K) => {
  currentlyEditedOperator.value = { index, field };
  editedValue.value = multipleStudentData.value[index][field] as string;
};
const saveItem = <K extends keyof AddStudent>(index: number, field: K) => {
  if (editedValue.value.trim()) {
    multipleStudentData.value[index][field] =
      editedValue.value as AddStudent[typeof field];
  }
  currentlyEditedOperator.value = { index: -1, field: "" };
};
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 1981;
  const yearsArray = [];

  for (let year = startYear; year < currentYear + 1; year++) {
    yearsArray.push(`${year}/${year + 1}`);
  }
  return yearsArray;
};

const createStudent = async (data?: AddStudent[]) => {
  data
    ? await studentStore.addStudent(data)
    : await studentStore.addStudent([studentData]);
};
const years = ref(generateYears());
</script>

<template>
  <div class="">
    <p
      for="password"
      class="block mb-7 font-medium text-center text-[30px] text-gray-900 dark:text-white"
    >
      Register new student
    </p>
    <RenderIf :condition="!multipleStudentData[0]">
      <form
        v-on:submit.prevent="() => createStudent()"
        class="max-w-sm mx-auto"
      >
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
            >Select admission set*</label
          >
          <select
            v-model="studentData.admissionSet"
            id="admission-set"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="" disabled selected>Select admission set...</option>
            <option v-for="(year, i) in years" :key="i">
              {{ year }}
            </option>
          </select>
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
        <component
          :is="SelectFile"
          fileName=".csv"
          :dataToMap="studentData"
          @retrieve-file-data="(files: AddStudent[]) => {
            multipleStudentData.length = 0;
            multipleStudentData = [...files];
          }
        "
        />
      </form>
    </RenderIf>
    <RenderIf :condition="!!multipleStudentData[0]">
      <button
        class="font-bold text-md"
        @click="
          () => {
            multipleStudentData.length = 0;
          }
        "
      >
        X
      </button>
      <div class="w-full flex justify-end pb-5">
        <Button
          :loading="studentStore.isLoading"
          title="Create multiple students"
          class="text-indigo-700 text-sm"
          :onclick="() => createStudent(multipleStudentData)"
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
            <th scope="col" class="px-6 py-3">Midle Name</th>
            <th scope="col" class="px-6 py-3">Option</th>
            <th scope="col" class="px-6 py-3">Gender</th>
            <th scope="col" class="px-6 py-3">Admission year</th>
            <th scope="col" class="px-6 py-3">Reg/Mat number</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            v-for="(data, i) in multipleStudentData"
            :key="i"
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
                {{ data.lastName
                }}<i
                  class="fa-solid fa-pencil"
                  @click="editField(i, 'lastName')"
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
                  currentlyEditedOperator.field === 'middleName'
                "
              >
                <input
                  v-model="editedValue"
                  @blur="saveItem(i, 'middleName')"
                  @keyup.enter="saveItem(i, 'middleName')"
                  class="bg-grey-400"
                />
              </RenderIf>
              <RenderIf
                :condition="
                  currentlyEditedOperator.index !== i ||
                  currentlyEditedOperator.field !== 'middleName'
                "
              >
                {{ data.middleName
                }}<i
                  class="fa-solid fa-pencil"
                  @click="editField(i, 'middleName')"
                ></i>
              </RenderIf>
            </th>
            <td class="px-6 py-4 cursor-pointer text-gray-900 font-medium">
              <RenderIf
                :condition="
                  currentlyEditedOperator.index == i &&
                  currentlyEditedOperator.field === 'option'
                "
              >
                <select
                  v-model="editedValue"
                  @blur="saveItem(i, 'option')"
                  @keyup.enter="saveItem(i, 'option')"
                  id="editOption"
                  class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                >
                  <option
                    v-for="(option, i) in Object.values(Options).slice(0, -1)"
                    :key="i"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </RenderIf>
              <RenderIf
                :condition="
                  currentlyEditedOperator.index !== i ||
                  currentlyEditedOperator.field !== 'option'
                "
              >
                {{ data.option }}
                <i
                  class="fa-solid fa-pencil"
                  @click="editField(i, 'option')"
                ></i>
              </RenderIf>
            </td>
            <td class="px-6 py-4 cursor-pointer font-medium text-gray-900">
              <RenderIf
                :condition="
                  currentlyEditedOperator.index == i &&
                  currentlyEditedOperator.field === 'gender'
                "
              >
                <select
                  v-model="editedValue"
                  @blur="saveItem(i, 'gender')"
                  @keyup.enter="saveItem(i, 'gender')"
                  id="edit-gender"
                  class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                >
                  <option
                    v-for="gender in Gender"
                    :key="gender"
                    :value="gender"
                  >
                    {{ gender }}
                  </option>
                </select>
              </RenderIf>

              <RenderIf
                :condition="
                  currentlyEditedOperator.index !== i ||
                  currentlyEditedOperator.field !== 'gender'
                "
              >
                {{ data.gender }}
                <i
                  class="fa-solid fa-pencil"
                  @click="editField(i, 'gender')"
                ></i>
              </RenderIf>
            </td>
            <td class="px-6 py-4 cursor-pointer font-medium text-gray-900">
              <RenderIf
                :condition="
                  currentlyEditedOperator.index == i &&
                  currentlyEditedOperator.field === 'admissionSet'
                "
              >
                <select
                  v-model="editedValue"
                  @blur="saveItem(i, 'admissionSet')"
                  @keyup.enter="saveItem(i, 'admissionSet')"
                  id="edit-admissionSet"
                  class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                >
                  <option selected>Sort by admissionSet</option>
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </RenderIf>

              <RenderIf
                :condition="
                  currentlyEditedOperator.index !== i ||
                  currentlyEditedOperator.field !== 'admissionSet'
                "
              >
                {{ data.admissionSet }}
                <i
                  class="fa-solid fa-pencil"
                  @click="editField(i, 'admissionSet')"
                ></i>
              </RenderIf>
            </td>
            <td class="px-6 py-4 cursor-pointer font-medium text-gray-900">
              <RenderIf
                :condition="
                  currentlyEditedOperator.index == i &&
                  currentlyEditedOperator.field === 'regNumber'
                "
              >
                <input
                  v-model="editedValue"
                  class="bg-grey-400"
                  @blur="saveItem(i, 'regNumber')"
                  @keyup.enter="saveItem(i, 'regNumber')"
                />
              </RenderIf>

              <RenderIf
                :condition="
                  currentlyEditedOperator.index !== i ||
                  currentlyEditedOperator.field !== 'regNumber'
                "
              >
                {{ data.regNumber }}
                <i
                  class="fa-solid fa-pencil"
                  @click="editField(i, 'regNumber')"
                ></i>
              </RenderIf>
            </td>
            <td>
              <Button
                title="Remove"
                class="text-red-500"
                :onclick="
                  () => {
                    multipleStudentData = multipleStudentData.filter((dt) => {
                      return dt.regNumber !== data.regNumber;
                    });
                  }
                "
              />
            </td>
          </tr>
        </tbody>
      </table>
    </RenderIf>
  </div>
</template>
