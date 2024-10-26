<script setup lang="ts">
import { InputTypeHTMLAttribute, useTemplateRef, ref, defineEmits } from "vue";
import { notify } from "@kyvg/vue3-notification";
const props = withDefaults(
  defineProps<{
    type?: InputTypeHTMLAttribute;
    fileName: string;
    dataToMap: any;
  }>(),
  {
    type: "file",
    fileName: ".image",
  }
);
const emit = defineEmits(["retrieve-file-data"]);
const file = useTemplateRef("file-manager");
const fileDone = ref(false);
const fileData = ref<any[]>([]);

const openFile = () => {
  file.value?.click();
};

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const data = e.target?.result as string;
      if (props.fileName === ".csv") {
        parseCSV(data);
      } else {
        fileData.value.push(data);
      }

      emit("retrieve-file-data", fileData.value);
    };

    reader.onerror = () => {
      fileDone.value = true;
      notify({
        type: "error",
        title: "File Load Error",
        text: " could not load  file",
      });
      throw new Error("could not load  file");
    };

    reader.readAsText(file);
  }
};
const parseCSV = (data: string) => {
  const rows = data.split("\n");
  const headers = rows[0].split(",");
  headers[headers.length - 1] = headers[headers.length - 1].split("\r")[0];
  // Remove any empty rows
  const nonEmptyRows = rows.filter((row) => row.trim() !== "");

  for (let i = 1; i < nonEmptyRows.length; i++) {
    const cols = nonEmptyRows[i].split(",");
    const obj: typeof props.dataToMap = {};
    Object.keys(props.dataToMap).forEach((key) => {
      headers.forEach((data, i) => {
        if (data === key) {
          obj[key] = cols[i];
        }
      });
    });

    fileData.value.push(obj);
  }
  fileDone.value = true;
};
</script>
<template>
  <div class="flex font-medium cursor-pointer">
    <input
      ref="file-manager"
      @change="handleFileChange"
      class="hidden"
      :type="type"
      :accept="fileName"
    />
    <button @click="openFile" type="button" class="focus:border-none">
      <i class="fas fa-paperclip mt-1 pr-2"></i>
      upload students from {{ fileName }} file?
    </button>
  </div>
</template>
