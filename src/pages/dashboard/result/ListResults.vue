<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted, watch } from "vue";
import { useResultStore } from "@/stores/result.store";
import { useCourseStore } from "@/stores/course.store";
import { Level, Options, Semester } from "@/type";
import { Button } from "@/components";
import { useRouter } from "vue-router";
import RenderIf from "@/components/shared/RenderIf.vue";
import EmptyState from "@/components/shared/EmptyState.vue";
import Spinner from "@/components/shared/Spinner.vue";

const router = useRouter();
const resultStore = useResultStore();
const courseStore = useCourseStore();

const editedValue = ref("");
const isSearchStart = ref(false);

const searchQuery = reactive<{
  semester?: Semester;
  level?: Level;
  option?: Options;
  courseCode?: string;
  regNumber?: string;
}>({});

let currentlyEditedOperator = ref<{ field: string; index: number }>({
  field: "",
  index: -1,
});
interface Result {
  id: string;
  title: string;
  courseCode: string;
  option: Options;
  unit: string;
  level: Level;
  semester: Semester;
  student: {
    firstName: string;
    lastName: string;
    middleName: string;
  };
}
interface Course {
  id: string;

  title: string;

  courseCode: string;

  option: Options;

  semester: Semester;

  level: Level;

  unit: string;
}
let results = reactive<Result[]>([]);
let courses = reactive<Course[]>([]);

// methods
const editField = <K extends keyof Result>(index: number, field: K) => {
  currentlyEditedOperator.value = { index, field };

  editedValue.value = results[index][field] as string;
};
const saveItem = <K extends keyof Result>(index: number, field: K) => {
  if (editedValue.value.trim()) {
    results[index][field] = editedValue.value as Result[typeof field];
    updateResult(results[index].id, { [field]: editedValue.value });
    currentlyEditedOperator.value = { index: -1, field: "" };
  }
};
const fetchResults = async () => {
  let queryString = "";
  if (!!searchQuery.option) {
    queryString + `&option=${searchQuery.option}`;
  }
  if (!!searchQuery.level) {
    queryString + `&level=${searchQuery.level}`;
  }
  if (!!searchQuery.semester) {
    queryString + `&semester=${searchQuery.semester}`;
  }
  const coursesData = await resultStore.fetchResults(queryString);
  results = [...coursesData.items];
};

const updateResult = async (id: string, data: any) => {
  await resultStore.updateResult(data, id);
};

const fetchCourses = async (query: string) => {
  const data = await courseStore.fetchCourses(query);
  courses = [...data.data];
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1 &&
    results[0]
  ) {
    fetchResults();
  }
};

watch(
  () => [searchQuery.level, searchQuery.option, searchQuery.semester],
  ([newLevel, newOption, newSemester]) => {
    let query = "";
    if (newLevel) {
      query += `&level=${newLevel}`;
    }
    if (newOption) {
      query += `&option=${newOption}`;
    }
    if (newSemester) {
      query += `&semester=${newSemester}`;
    }

    if (query !== "") {
      fetchCourses(query);
    }
  }
);
</script>

<template>
  <div>
    <RenderIf :condition="!isSearchStart">
      <div class="flex items-center justify-center h-[50vh]">
        <div class="bg-white flex p-3 gap-3">
          <p class="font-bold">Search query</p>

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
                v-model="searchQuery.level"
                id="level"
                class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
              >
                <option disabled>Sort by level</option>
                <option v-for="level in Level" :key="level" :value="level">
                  {{ level }}
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
                v-model="searchQuery.semester"
                id="semester"
                class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
              >
                <option disabled>Sort by semester</option>
                <option
                  v-for="semester in Semester"
                  :key="semester"
                  :value="semester"
                >
                  {{ semester }}
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
                v-model="searchQuery.option"
                id="option"
                class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
              >
                <option disabled>Sort by option</option>
                <option
                  v-for="option in Object.values(Options).splice(1, 4)"
                  :key="option"
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
                v-model="searchQuery.courseCode"
                id="course-code"
                class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
              >
                <option disabled>Sort by course code</option>
                <RenderIf :condition="courseStore.isLoading">
                  <Spinner />
                </RenderIf>
                <RenderIf :condition="courseStore.isLoading == false">
                  <option
                    v-for="course in courses"
                    :key="course.id"
                    :value="course.courseCode"
                  >
                    {{ course.courseCode }}
                  </option>
                </RenderIf>
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
          <div class="flex justify-center w-full max-w-lg rounded-lg">
            <input
              v-model="searchQuery.regNumber"
              type="text"
              required
              placeholder=" reg/mat number eg IMSU/2019/1430"
              class="flex-grow border placeholder:text-sm border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
              :onclick="
                () => {
                  fetchResults, (isSearchStart = true);
                }
              "
              :loading="resultStore.isLoading"
              title="Search"
              class="ml-2 bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>
    </RenderIf>
    <RenderIf :condition="isSearchStart">
      <div class="relative overflow-x-auto sm:rounded-lg">
        <div class="p-6 flex justify-end">
          <Button
            title="Add Course"
            class="text-sm"
            type="button"
            :onClick="() => router.push('/upload-results')"
          />
        </div>

        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">CourseCode</th>
              <th scope="col" class="px-6 py-3">Option</th>
              <th scope="col" class="px-6 py-3">Unit</th>
              <th scope="col" class="px-6 py-3">Level</th>
              <th scope="col" class="px-6 py-3">Semester</th>
              <th scope="col" class="px-6 py-3">Student</th>
            </tr>
          </thead>

          <RenderIf :condition="resultStore.isLoading">
            <tbody>
              <tr>
                <td colspan="7">
                  <div class="mt-20"><Spinner /></div>
                </td>
              </tr>
            </tbody>
          </RenderIf>
          <RenderIf :condition="resultStore.isLoading == false && !results[0]">
            <tbody>
              <tr>
                <td colspan="7">
                  <div class="mt-20"><component :is="EmptyState" /></div>
                </td>
              </tr>
            </tbody>
          </RenderIf>
          <RenderIf :condition="!resultStore.isLoading && !!results[0]">
            <tbody>
              <tr
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                v-for="(data, i) in results"
                :key="data.id"
              >
                <th
                  scope="row"
                  class="px-6 py-4 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <RenderIf
                    :condition="
                      currentlyEditedOperator.index == i &&
                      currentlyEditedOperator.field === 'title'
                    "
                  >
                    <input
                      v-model="editedValue"
                      @blur="saveItem(i, 'title')"
                      @keyup.enter="saveItem(i, 'title')"
                      class="bg-grey-400"
                    />
                  </RenderIf>
                  <RenderIf
                    :condition="
                      currentlyEditedOperator.index !== i ||
                      currentlyEditedOperator.field !== 'title'
                    "
                  >
                    {{ data.title
                    }}<i
                      class="fa-solid fa-pencil"
                      @click="editField(i, 'title')"
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
                      currentlyEditedOperator.field === 'courseCode'
                    "
                  >
                    <input
                      v-model="editedValue"
                      @blur="saveItem(i, 'courseCode')"
                      @keyup.enter="saveItem(i, 'courseCode')"
                      class="bg-grey-400"
                    />
                  </RenderIf>
                  <RenderIf
                    :condition="
                      currentlyEditedOperator.index !== i ||
                      currentlyEditedOperator.field !== 'courseCode'
                    "
                  >
                    {{ data.courseCode
                    }}<i
                      class="fa-solid fa-pencil"
                      @click="editField(i, 'courseCode')"
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
                        v-for="(option, i) in Options"
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
                <th
                  scope="row"
                  class="px-6 py-4 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <RenderIf
                    :condition="
                      currentlyEditedOperator.index == i &&
                      currentlyEditedOperator.field === 'unit'
                    "
                  >
                    <input
                      v-model="editedValue"
                      @blur="saveItem(i, 'unit')"
                      @keyup.enter="saveItem(i, 'unit')"
                      class="bg-grey-400"
                    />
                  </RenderIf>
                  <RenderIf
                    :condition="
                      currentlyEditedOperator.index !== i ||
                      currentlyEditedOperator.field !== 'unit'
                    "
                  >
                    {{ data.unit
                    }}<i
                      class="fa-solid fa-pencil"
                      @click="editField(i, 'unit')"
                    ></i>
                  </RenderIf>
                </th>

                <td class="px-6 py-4 cursor-pointer font-medium text-gray-900">
                  <RenderIf
                    :condition="
                      currentlyEditedOperator.index == i &&
                      currentlyEditedOperator.field === 'level'
                    "
                  >
                    <select
                      v-model="editedValue"
                      @blur="saveItem(i, 'level')"
                      @keyup.enter="saveItem(i, 'level')"
                      id="edit-level"
                      class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                    >
                      <option
                        v-for="level in Level"
                        :key="level"
                        :value="level"
                      >
                        {{ level }}
                      </option>
                    </select>
                  </RenderIf>

                  <RenderIf
                    :condition="
                      currentlyEditedOperator.index !== i ||
                      currentlyEditedOperator.field !== 'gender'
                    "
                  >
                    {{ data.level }}
                    <i
                      class="fa-solid fa-pencil"
                      @click="editField(i, 'level')"
                    ></i>
                  </RenderIf>
                </td>
                <td class="px-6 py-4 cursor-pointer font-medium text-gray-900">
                  <RenderIf
                    :condition="
                      currentlyEditedOperator.index == i &&
                      currentlyEditedOperator.field === 'semester'
                    "
                  >
                    <select
                      v-model="editedValue"
                      @blur="saveItem(i, 'semester')"
                      @keyup.enter="saveItem(i, 'semester')"
                      id="edit-semester"
                      class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                    >
                      <option selected :value="null">Sort by semester</option>
                      <option
                        v-for="semester in Semester"
                        :key="semester"
                        :value="semester"
                      >
                        {{ semester }}
                      </option>
                    </select>
                  </RenderIf>

                  <RenderIf
                    :condition="
                      currentlyEditedOperator.index !== i ||
                      currentlyEditedOperator.field !== 'semester'
                    "
                  >
                    {{ data.semester }}
                    <i
                      class="fa-solid fa-pencil"
                      @click="editField(i, 'semester')"
                    ></i>
                  </RenderIf>
                </td>

                <td class="px-6 py-4">
                  {{ data.student.firstName }} {{ data.student.lastName }}
                </td>
              </tr>
            </tbody>
          </RenderIf>
        </table>
      </div>
    </RenderIf>
  </div>
</template>
