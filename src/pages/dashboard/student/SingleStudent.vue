<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStudentStore } from "@/stores/student.store";
import RenderIf from "@/components/shared/RenderIf.vue";
import EmptyState from "@/components/shared/EmptyState.vue";
import Spinner from "@/components/shared/Spinner.vue";

const studentStore = useStudentStore();
const route = useRoute();

const studentData = reactive({
  regNumber: "",
  firstName: "",
  lastName: "",
  middleName: "",
  gender: "",
  option: "",
  admissionSet: "",
});
const fetchStudent = async (id: any) => {
  if (typeof id === "object" && id[0]) id = id.join("/");
  const student = await studentStore.fetchStudent(`regNumber=${id}`);
  studentData.firstName = student.data.firstName;
  studentData.gender = student.data.gender;

  studentData.lastName = student.data.lastName;

  studentData.middleName = student.data.middleName;

  studentData.option = student.data.option;

  studentData.admissionSet = student.data.admissionSet;

  studentData.regNumber = student.data.regNumber;
};
const studentReg = computed(() => {
  return route.params.id;
});
fetchStudent(studentReg.value);
</script>

<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
      <RenderIf :condition="studentStore.isLoading">
        <Spinner />
      </RenderIf>
      <RenderIf
        :condition="
          studentStore.isLoading == false && studentData.regNumber === ''
        "
      >
        <component :is="EmptyState" />
      </RenderIf>

      <RenderIf
        :condition="
          studentStore.isLoading == false && studentData.regNumber !== ''
        "
      >
        <div class="flex flex-col items-center mb-6">
          <img
            class="w-24 h-24 rounded-full shadow-md"
            src="/images/user-icon.jpeg"
            alt="Profile Picture"
          />
          <h1 class="text-2xl font-semibold mt-2">
            {{ studentData.firstName }} {{ studentData.lastName }}
            {{ studentData.middleName }}
          </h1>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700"
            >Registration Number</label
          >
          <p class="mt-1 text-md font-bold text-gray-900">
            {{ studentData.regNumber }}
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Gender</label>
          <p class="mt-1 text-md font-bold text-gray-900">
            {{ studentData.gender }}
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Option</label>
          <p class="mt-1 text-md font-bold text-gray-900">
            {{ studentData.option }}
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700"
            >Admission Set</label
          >
          <p class="mt-1 text-md font-bold text-gray-900">
            {{ studentData.admissionSet }}
          </p>
        </div>
      </RenderIf>
    </div>
  </div>
</template>
