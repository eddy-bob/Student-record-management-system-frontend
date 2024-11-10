<script setup lang="ts">
import { reactive, ref, useTemplateRef, watch } from "vue";
import { useResultStore } from "@/stores/result.store";
import { useCourseStore } from "@/stores/course.store";
import { useStudentStore } from "@/stores/student.store";
import { Level, Options, Grade, Semester } from "@/type";
import { Button } from "@/components";
import RenderIf from "@/components/shared/RenderIf.vue";
import EmptyState from "@/components/shared/EmptyState.vue";
import Spinner from "@/components/shared/Spinner.vue";
import { useRouter } from "vue-router";

const resultStore = useResultStore();
const courseStore = useCourseStore();
const studentStore = useStudentStore();
const router = useRouter();

const isSearchStart = ref(false);

const searchQuery = reactive<{
  semester?: Semester;
  level?: Level;
  option?: Options;
  courseCode?: string;
  session?: string;
}>({});

interface Result {
  score: string;
  regNumber: string;
  grade: string;
  session: string;
  course: string;
  student: string;
  firstName: string;
  lastName: string;
  middleName: string;
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
let results = reactive<Result[]>([
  {
    score: "",
    regNumber: "Imsu/2019/1430",
    grade: "",
    course: "erkjefjerlerkler",
    session: "2019/2020",
    student: "324567dsfghjkl;iuotyrewq",
    firstName: "Eddy",
    lastName: "Madu",
    middleName: "Taye",
  },
  {
    score: "",
    regNumber: "Imsu/2019/1430",
    grade: "",
    course: "erkjefjerlerkler",
    session: "2019/2020",
    student: "324567dsfghjkl;iuotyrewq",
    firstName: "Eddy",
    lastName: "Madu",
    middleName: "Taye",
  },
  {
    score: "",
    regNumber: "Imsu/2019/1430",
    grade: "",
    course: "erkjefjerlerkler",
    session: "2019/2020",
    student: "324567dsfghjkl;iuotyrewq",
    firstName: "Eddy",
    lastName: "Madu",
    middleName: "Taye",
  },
  {
    score: "",
    regNumber: "Imsu/2019/1430",
    grade: "",
    course: "erkjefjerlerkler",
    session: "2019/2020",
    student: "324567dsfghjkl;iuotyrewq",
    firstName: "Eddy",
    lastName: "Madu",
    middleName: "Taye",
  },
  {
    score: "",
    regNumber: "Imsu/2019/1430",
    grade: "",
    course: "erkjefjerlerkler",
    session: "2019/2020",
    student: "324567dsfghjkl;iuotyrewq",
    firstName: "Eddy",
    lastName: "Madu",
    middleName: "Taye",
  },
  {
    score: "",
    regNumber: "Imsu/2019/1430",
    grade: "",
    course: "erkjefjerlerkler",
    session: "2019/2020",
    student: "324567dsfghjkl;iuotyrewq",
    firstName: "Eddy",
    lastName: "Madu",
    middleName: "Taye",
  },
  {
    score: "",
    regNumber: "Imsu/2019/1430",
    grade: "",
    course: "erkjefjerlerkler",
    session: "2019/2020",
    student: "324567dsfghjkl;iuotyrewq",
    firstName: "Eddy",
    lastName: "Madu",
    middleName: "Taye",
  },
  {
    score: "",
    regNumber: "Imsu/2019/1430",
    grade: "",
    course: "erkjefjerlerkler",
    session: "2019/2020",
    student: "324567dsfghjkl;iuotyrewq",
    firstName: "Eddy",
    lastName: "Madu",
    middleName: "Taye",
  },
  {
    score: "",
    regNumber: "Imsu/2019/1430",
    grade: "",
    course: "erkjefjerlerkler",
    session: "2019/2020",
    student: "324567dsfghjkl;iuotyrewq",
    firstName: "Eddy",
    lastName: "Madu",
    middleName: "Taye",
  },
  {
    score: "",
    regNumber: "Imsu/2019/1430",
    grade: "",
    course: "erkjefjerlerkler",
    session: "2019/2020",
    student: "324567dsfghjkl;iuotyrewq",
    firstName: "Eddy",
    lastName: "Madu",
    middleName: "Taye",
  },
]);
let courses = reactive<Course[]>([]);
const page = ref(1);
const totalPages = ref<number | undefined>();

const scrollDiv = useTemplateRef("scrollDiv");
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

const fetchCourses = async (query: string) => {
  const data = await courseStore.fetchCourses(query);
  if (data?.items) {
    courses.splice(0, courses.length, ...data.items);
    if (scrollDiv.value) {
      scrollDiv.value.scrollTop = 20;
    }
  }
};
const fetchStudents = async () => {
  let queryString = "";
  if (searchQuery.option) {
    queryString += `&option=${searchQuery.option}`;
  }

  if (searchQuery.session) {
    queryString += `&session=${searchQuery.session}`;
  }

  const data = await studentStore.fetchStudents(queryString);

  if (data?.items) {
    const sortedData = data.items.map((student: any) => {
      return {
        score: "",
        regNumber: student.regNumber,
        grade: "",
        course: searchQuery.courseCode,
        session: searchQuery.session,
        student: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        middleName: student.middleName,
      };
    });
    results.splice(0, results.length, ...sortedData);
  }
};

const calculateGrade = (index: number) => {
  const obj = results[index];

  if (obj.score !== "") {
    const score = parseInt(obj.score);
    switch (true) {
      case score >= 70 && score <= 100:
        obj.grade = Grade.A;
        break;
      case score >= 60 && score <= 69:
        obj.grade = Grade.B;
        break;
      case score >= 50 && score <= 59:
        obj.grade = Grade.C;
        break;
      case score >= 45 && score <= 49:
        obj.grade = Grade.D;
        break;
      case score >= 40 && score <= 44:
        obj.grade = Grade.E;
        break;
      case score < 40 && score >= 0:
        obj.grade = Grade.F;
        break;
      case score < 0:
        obj.grade = "";
        obj.score = "";
        break;
      case score > 100:
        obj.grade = "";
        obj.score = "";
    }
  }
};
const years = ref(generateYears());

const handleScroll = () => {
  if (scrollDiv.value) {
    const scrollTop = scrollDiv.value?.scrollTop;

    if (
      scrollTop + scrollDiv.value?.clientHeight >=
        scrollDiv.value?.scrollHeight &&
      results[0]
    ) {
      if (totalPages && page.value !== totalPages.value) {
        page.value += 1;
        fetchStudents();
      }
    }
    if (scrollTop === 0 && courses[0]) {
      if (page.value !== 1) {
        page.value -= 1;
        fetchStudents();
      }
    }
  }
};
const uploadResults = async () => {
  await resultStore.uploadResult(results);
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
  <div
    ref="scrollDiv"
    @scroll="handleScroll"
    class="max-h-screen m-h-screen overflow-y-scroll"
  >
    <div>
      <i class="fa fa-arrow-left cursor-pointer" @click="router.go(-1)"></i>
    </div>
    <RenderIf :condition="!isSearchStart">
      <p class="text-lg font-medium">Select result details</p>

      <div class="">
        <div class="space-y-5 p-3 gap-3">
          <div class="flex flex-col lg:flex-row lg:items-center gap-10">
            <div class="flex gap-3 w-full max-w-sm">
              <span class="text-md font-medium">Level</span>:<select
                v-model="searchQuery.level"
                required
                id="level"
                class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
              >
                <option disabled>level</option>
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
          <div class="flex flex-col lg:flex-row lg:items-center gap-10">
            <div class="flex gap-3 w-full max-w-sm">
              <span class="text-md font-medium">Session</span>:<select
                v-model="searchQuery.session"
                id="level"
                required
                class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
              >
                <option disabled>Session</option>
                <option
                  v-for="session in years"
                  :key="session"
                  :value="session"
                >
                  {{ session }}
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
            <div class="relative gap-3 flex w-full max-w-sm">
              <span class="text-md font-medium">Semester</span>:
              <select
                required
                v-model="searchQuery.semester"
                id="semester"
                class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
              >
                <option disabled>semester</option>
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
            <div class="relative gap-3 flex w-full max-w-sm">
              <span class="text-md font-medium">Option</span>:
              <select
                v-model="searchQuery.option"
                id="option"
                class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
              >
                <option :value="null">option</option>
                <option
                  v-for="option in Object.values(Options).splice(1, 4)"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
                :value="null"
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
            <div class="relative flex gap-3 w-full max-w-sm">
              <span class="text-md font-medium">Course</span>:
              <select
                v-model="searchQuery.courseCode"
                id="course-code"
                class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
              >
                <option disabled>course code</option>
                <RenderIf :condition="courseStore.isLoading">
                  <Spinner />
                </RenderIf>
                <RenderIf :condition="courseStore.isLoading == false">
                  <option
                    v-for="course in courses"
                    :key="course.id"
                    :value="course.id"
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
          <div class="flex w-full rounded-lg">
            <Button
              :onclick="
                () => {
                  searchQuery.level &&
                    searchQuery.semester &&
                    searchQuery.option &&
                    searchQuery.courseCode &&
                    (fetchStudents(), (isSearchStart = true));
                }
              "
              title="Next"
              class="ml-2 bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>
    </RenderIf>
    <RenderIf :condition="isSearchStart">
      <section class="py-2">
        <div class="p-6 flex justify-end">
          <Button
            title="Upload results"
            class="text-sm"
            type="button"
            :loading="resultStore.isLoading"
            :onClick="uploadResults"
          />
        </div>
        <div
          v-for="search in Object.values(searchQuery)"
          :key="search"
          class="w-full max-w-7xl mx-auto px-4 md:px-8"
        >
          <div>
            <select
              disabled
              class="h-12 border border-gray-3 font-medium text-sm text-gray-900 pl-11 leading-7 rounded-xl block w-full px-1 appearance-none focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
            >
              <option selected>{{ search }}</option>
            </select>
          </div>
        </div>
      </section>
      <div class="relative overflow-x-auto sm:rounded-lg">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Mat/Reg Number</th>
              <th scope="col" class="px-6 py-3">Student Name</th>
              <th scope="col" class="px-6 py-3">Score</th>
              <th scope="col" class="px-6 py-3">Grade</th>
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
          <RenderIf :condition="studentStore.isLoading == false && !results[0]">
            <tbody>
              <tr>
                <td colspan="7">
                  <div class="mt-20"><component :is="EmptyState" /></div>
                </td>
              </tr>
            </tbody>
          </RenderIf>
          <RenderIf :condition="!studentStore.isLoading && !!results[0]">
            <tbody>
              <tr
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                v-for="(data, i) in results"
                :key="i"
              >
                <th
                  scope="row"
                  class="px-6 py-4 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ data.regNumber }}
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ data.firstName }} {{ data.lastName }}
                  {{ data.middleName }}
                </th>

                <td class="px-6 py-4 cursor-pointer text-gray-900 font-medium">
                  <input
                    class="border"
                    @blur="calculateGrade(i)"
                    v-model="data.score"
                    type="number"
                  />
                </td>
                <th
                  scope="row"
                  :class="
                    data.grade === Grade.F ? 'text-red-500' : 'text-blue-800'
                  "
                  class="px-6 py-4 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ data.grade }}
                </th>
              </tr>
            </tbody>
          </RenderIf>
        </table>
      </div>
    </RenderIf>
  </div>
</template>
