<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from "vue";

import { Card } from "@/components";
import { Gender, Options } from "@/type";
import { Button } from "@/components";
import { useRouter } from "vue-router";
import RenderIf from "@/components/shared/RenderIf.vue";
import { useStudentStore } from "@/stores/student.store";
import EmptyState from "@/components/shared/EmptyState.vue";

const router = useRouter();
const studentStore = useStudentStore();

const editedValue = ref("");
const query = reactive({ session: "", option: "" });
const studentRegNumber = ref("");
let currentlyEditedOperator = ref<{ field: string; index: number }>({
  field: "",
  index: -1,
});
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  option: Options;
  gender: Gender;
  session: string;
  regNumber: string;
}
let students = reactive<Student[]>([]);
// let students = reactive<Student[]>([
//   {
//     id: "1",
//     name: "Charlse Akwuoha",
//     option: Options.ELECTRONICS,
//     gender: Gender.MALE,
//     session: "2019/2020",
//     regNumber: "imsu/2019/1503",
//   },
//   {
//     id: "2",
//     name: "Charlse Akwuoha",
//     option: Options.ELECTRONICS,
//     gender: Gender.MALE,
//     session: "2019/2020",
//     regNumber: "imsu/2019/1503",
//   },
//   {
//     id: "2",
//     name: "Charlse Akwuoha",
//     option: Options.ELECTRONICS,
//     session: "2019/2020",
//     gender: Gender.MALE,
//     regNumber: "imsu/2019/1503",
//   },
//   {
//     id: "3",
//     name: "Charlse Akwuoha",
//     option: Options.ELECTRONICS,
//     gender: Gender.MALE,
//     session: "2019/2020",
//     regNumber: "imsu/2019/1503",
//   },
//   {
//     id: "4",
//     name: "Charlse Akwuoha",
//     option: Options.ELECTRONICS,
//     gender: Gender.MALE,
//     session: "2019/2020",
//     regNumber: "imsu/2019/1503",
//   },
//   {
//     id: "5",
//     name: "Charlse Akwuoha",
//     option: Options.ELECTRONICS,
//     gender: Gender.MALE,
//     session: "2019/2020",
//     regNumber: "imsu/2019/1503",
//   },
//   {
//     id: "6",
//     name: "Charlse Akwuoha",
//     option: Options.ELECTRONICS,
//     gender: Gender.MALE,
//     session: "2019/2020",
//     regNumber: "imsu/2019/1503",
//   },
//   {
//     id: "7",
//     name: "Charlse Akwuoha",
//     option: Options.ELECTRONICS,
//     gender: Gender.MALE,
//     session: "2019/2020",
//     regNumber: "imsu/2019/1503",
//   },
// ]);

const studentType = ref<"Single" | "Multiple">();
// methods
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 1981;
  const yearsArray = [];

  for (let year = startYear; year < currentYear + 1; year++) {
    yearsArray.push(`${year}/${year + 1}`);
  }
  return yearsArray;
};

const editField = <K extends keyof Student>(index: number, field: K) => {
  currentlyEditedOperator.value = { index, field };
  editedValue.value = students[index][field];
};
const saveItem = <K extends keyof Student>(index: number, field: K) => {
  if (editedValue.value.trim()) {
    students[index][field] = editedValue.value as Student[typeof field];
    updateStudent(students[index].id, { [field]: editedValue.value });
  }
};
const fetchStudents = async () => {
  let queryString = "";
  if (query.option !== "") {
    queryString + `&option=${query.option}`;
  }
  if (query.session !== "") {
    queryString + `&admissionSet=${query.session}`;
  }
  const studentsData = await studentStore.fetchStudent(queryString);
  students = [...studentsData.data];
};
const updateStudent = async (id: string, data: any) => {
  await studentStore.updateStudent(data, id);
};
const years = ref(generateYears());

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1 &&
    students[0]
  ) {
    fetchStudents();
  }
};
// fetch students on created
fetchStudents();
</script>

<template>
  <div>
    <!-- cards -->
    <RenderIf :condition="!!studentType == false">
      <div class="flex justify-center w-full space-x-2 mt-20">
        <Card
          @setStudentType="studentType = 'Single'"
          title="Search single student"
          class="flex-1"
          icon="/images/single-user.jpeg"
        />
        <Card
          @setStudentType="studentType = 'Multiple'"
          title="Search many students"
          class="flex-1"
          icon="/images/many-users.png"
        />
      </div>
    </RenderIf>
    <RenderIf :condition="!!studentType && studentType == 'Single'">
      <div class="bg-gray-100 flex items-center justify-center h-[50vh]">
        <div
          class="flex justify-center w-full max-w-lg bg-white rounded-lg shadow-lg p-4"
        >
          <input
            type="text"
            v-model="studentRegNumber"
            required
            placeholder=" reg/mat number eg IMSU/2019/1430"
            class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            :onclick="
              () =>
                studentRegNumber &&
                router.push(`/student-profile/'${studentRegNumber}'`)
            "
            title="Search"
            class="ml-2 bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </RenderIf>
    <RenderIf :condition="!!studentType && studentType == 'Multiple'">
      <div class="relative overflow-x-auto sm:rounded-lg">
        <div class="p-6 flex justify-end">
          <Button
            title="Register new student"
            class="text-sm"
            type="button"
            :onClick="() => router.push('/add-student')"
          />
        </div>
        <!-- filter -->
        <section class="py-2 relative">
          <div class="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div
              class="flex flex-col lg:flex-row lg:items-center gap-10 justify-between w-full"
            >
              <div class="relative w-full max-w-sm">
                <svg
                  class="absolute top-1/2 -translate-y-1/2 left-4 z-20"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
                    stroke="black"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                </svg>
                <select
                  @change="fetchStudents"
                  v-model="query.session"
                  id="session"
                  class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                >
                  <option selected>Sort by session</option>
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
                <svg
                  class="absolute top-1/2 -translate-y-1/2 right-4 z-20"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                    stroke="#111827"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="relative w-full max-w-sm">
                <svg
                  class="absolute top-1/2 -translate-y-1/2 left-4 z-20"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
                    stroke="black"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                </svg>
                <select
                  @change="fetchStudents"
                  v-model="query.option"
                  id="option"
                  class="h-12 border border-gray-3 text-sm text-gray-900 pl-11 font-medium leading-7 rounded-xl block w-full py-2.5 px-2 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                >
                  <option selected>Sort by option</option>
                  <option
                    v-for="(option, i) in Object.values(Options).slice(0, -1)"
                    :key="i"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <svg
                  class="absolute top-1/2 -translate-y-1/2 right-4 z-20"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                    stroke="#111827"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <svg
              class="my-7 w-full"
              xmlns="http://www.w3.org/2000/svg"
              width="1216"
              height="2"
              viewBox="0 0 1216 2"
              fill="none"
            >
              <path d="M0 1H1216" stroke="#E5E7EB" />
            </svg>
          </div>
        </section>

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
          <RenderIf :condition="studentStore.isLoading">
            <tbody>
              <tr>
                <td colspan="7">
                  <div class="mt-20"><Spinner /></div>
                </td>
              </tr>
            </tbody>
          </RenderIf>
          <RenderIf
            :condition="studentStore.isLoading == false && !students[0]"
          >
            <tbody>
              <tr>
                <td colspan="7">
                  <div class="mt-20"><component :is="EmptyState" /></div>
                </td>
              </tr>
            </tbody>
          </RenderIf>
          <RenderIf
            :condition="studentStore.isLoading == false && !!students[0]"
          >
            <tbody>
              <tr
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                v-for="(data, i) in students"
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
                        v-for="(option, i) in Object.values(Options).slice(
                          0,
                          -1
                        )"
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
                      <option selected>Sort by session</option>
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
                      currentlyEditedOperator.field === 'session'
                    "
                  >
                    <select
                      v-model="editedValue"
                      @blur="saveItem(i, 'session')"
                      @keyup.enter="saveItem(i, 'session')"
                      id="edit-session"
                      class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                    >
                      <option selected>Sort by session</option>
                      <option v-for="year in years" :key="year" :value="year">
                        {{ year }}
                      </option>
                    </select>
                  </RenderIf>

                  <RenderIf
                    :condition="
                      currentlyEditedOperator.index !== i ||
                      currentlyEditedOperator.field !== 'session'
                    "
                  >
                    {{ data.session }}
                    <i
                      class="fa-solid fa-pencil"
                      @click="editField(i, 'session')"
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
                <td class="px-6 py-4">
                  <Button
                    title="View"
                    type="button"
                    :onClick="
                      () => {
                        router.push(`/student-profile/${data.regNumber}`);
                      }
                    "
                    class="font-medium text-indigo-800 dark:text-blue-500"
                  />
                </td>
              </tr>
            </tbody>
          </RenderIf>
        </table>
      </div>
    </RenderIf>
  </div>
</template>
