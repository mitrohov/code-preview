<template>
  <xlsx-workbook class="mb-20">
    <xlsx-sheet
        :collection="sheet.data"
        v-for="sheet in sheets"
        :key="sheet.name"
        :sheet-name="sheet.name"
    />
    <xlsx-download>
      <Button icon="pi pi-download" outlined />
    </xlsx-download>
  </xlsx-workbook>
</template>

<script setup lang="ts">
import { XlsxWorkbook, XlsxSheet, XlsxDownload } from "vue3-xlsx/dist/vue3-xlsx.cjs.prod.js";

const props = defineProps<{
  data: any[];
  fileName: string
}>();

const sheets = computed(() => {
  return [
    {
      name: props.fileName,
      data: props.data
    }
  ]
})
</script>
