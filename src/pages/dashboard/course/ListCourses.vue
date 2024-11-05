<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from "vue";
import { useCourseStore } from "@/stores/course.store";
import { Level, Options, Semester } from "@/type";
import { Button } from "@/components";
import { useRouter } from "vue-router";
import RenderIf from "@/components/shared/RenderIf.vue";
import EmptyState from "@/components/shared/EmptyState.vue";
import Spinner from "@/components/shared/Spinner.vue";

const router = useRouter();
const courseStore = useCourseStore();
const editedValue = ref("");

const searchQuery = reactive<{
  semester?: Semester;
  level?: Level;
  option?: Options;
}>({});

let currentlyEditedOperator = ref<{ field: string; index: number }>({
  field: "",
  index: -1,
});
interface Course {
  id: string;
  title: string;
  courseCode: string;
  option: Options;
  unit: string;
  level: Level;
  semester: Semester;
}
let courses = reactive<Course[]>([]);

// const courses = reactive<Course[]>([
//   {
//     id: "1",
//     title: "Engineering mathematics 1",
//     courseCode: "MATH 201",
//     option: Options.GENERAL,
//     unit: "3",
//     level: Level.SECOND,
//     semester: Semester.FIRST,
//   },
//   {
//     id: "2",
//     title: "Engineering mathematics 1",
//     courseCode: "MATH 201",
//     option: Options.GENERAL,
//     unit: "3",
//     level: Level.SECOND,
//     semester: Semester.FIRST,
//   },
//   {
//     id: "3",
//     title: "Engineering mathematics 1",
//     courseCode: "MATH 201",
//     option: Options.GENERAL,
//     unit: "3",
//     level: Level.SECOND,
//     semester: Semester.FIRST,
//   },
//   {
//     id: "4",
//     title: "Engineering mathematics 1",
//     courseCode: "MATH 201",
//     option: Options.GENERAL,
//     unit: "3",
//     level: Level.SECOND,
//     semester: Semester.FIRST,
//   },
//   {
//     id: "5",
//     title: "Engineering mathematics 1",
//     courseCode: "MATH 201",
//     option: Options.GENERAL,
//     unit: "3",
//     level: Level.SECOND,
//     semester: Semester.FIRST,
//   },
//   {
//     id: "6",
//     title: "Engineering mathematics 1",
//     courseCode: "MATH 201",
//     option: Options.GENERAL,
//     unit: "3",
//     level: Level.SECOND,
//     semester: Semester.FIRST,
//   },
//   {
//     id: "7",
//     title: "Engineering mathematics 1",
//     courseCode: "MATH 201",
//     option: Options.GENERAL,
//     unit: "3",
//     level: Level.SECOND,
//     semester: Semester.FIRST,
//   },
//   {
//     id: "8",
//     title: "Engineering mathematics 1",
//     courseCode: "MATH 201",
//     option: Options.GENERAL,
//     unit: "3",
//     level: Level.SECOND,
//     semester: Semester.FIRST,
//   },
//   {
//     id: "9",
//     title: "Engineering mathematics 1",
//     courseCode: "MATH 201",
//     option: Options.GENERAL,
//     unit: "3",
//     level: Level.SECOND,
//     semester: Semester.FIRST,
//   },
// ]);

// methods
const editField = <K extends keyof Course>(index: number, field: K) => {
  currentlyEditedOperator.value = { index, field };
  editedValue.value = courses[index][field];
};
const saveItem = <K extends keyof Course>(index: number, field: K) => {
  if (editedValue.value.trim()) {
    courses[index][field] = editedValue.value as Course[typeof field];
    updateCourse(courses[index].id, { [field]: editedValue.value });
      currentlyEditedOperator.value = {index:-1,field:''};

  }
};
const fetchCourses = async () => {
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
  const coursesData = await courseStore.fetchCourses(queryString);
  courses = [...coursesData.items];
};
const updateCourse = async (id: string, data: any) => {
  await courseStore.updateCourse(data, id);
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
    courses[0]
  ) {
    fetchCourses();
  }
};
// fetch courses on created
fetchCourses();
</script>

<template>
  <div>
    <div class="relative overflow-x-auto sm:rounded-lg">
      <div class="p-6 flex justify-end">
        <Button
          title="Add Course"
          class="text-sm"
          type="button"
          :onClick="() => router.push('/add-course')"
        />
      </div>

      <!-- filter -->
      <section class="py-2 relative">
        <div class="w-full mx-auto px-4 md:px-8">
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
                @change="fetchCourses"
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
                @change="fetchCourses"
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
                @change="fetchCourses"
                v-model="searchQuery.option"
                id="option"
                class="h-12 border border-gray-3 text-sm text-gray-900 pl-11 font-medium leading-7 rounded-xl block w-full py-2.5 px-2 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
              >
                <option disabled>Sort by option</option>
                <option
                  v-for="(option, i) in Object.values(Options).splice(1, 4)"
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
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">CourseCode</th>
            <th scope="col" class="px-6 py-3">Option</th>
            <th scope="col" class="px-6 py-3">Unit</th>
            <th scope="col" class="px-6 py-3">Level</th>
            <th scope="col" class="px-6 py-3">Semester</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
         <RenderIf :condition="courseStore.isLoading"">
          <tbody>
            <tr>
              <td colspan="7">
                <div class="mt-20"><Spinner /></div>
              </td>
            </tr>
          </tbody>
        </RenderIf>
        <RenderIf :condition="courseStore.isLoading == false && !courses[0]">
          <tbody>
            <tr>
              <td colspan="7">
                <div class="mt-20"><component :is="EmptyState" /></div>
              </td>
            </tr>
          </tbody>
        </RenderIf>
    
        <RenderIf :condition="!courseStore.isLoading && !!courses[0]">
          <tbody>
            <tr
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              v-for="(data, i) in courses"
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
                    <option v-for="level in Level" :key="level" :value="level">
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
                <Button
                  title="Delete"
                  type="button"
                  :onClick="() => {}"
                  class="font-medium text-red-800 dark:text-red-500"
                />
              </td>
            </tr></tbody
        ></RenderIf>
      </table>
    </div>
  </div>
</template>
