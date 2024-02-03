<template>
  <div class="form">
    <div class="form_title">
      Настройки
    </div>
    <ui-input-number
        v-model="standard_hours_per_month"
        :error-message="errors.standardHoursPerMonth"
        id="fio"
        label="Полная загрузка в часах"
    />
    <div class="mt-20">
      <Button label="Сохранить" @click="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {PatchSettings} from "~/server/types/settings"
import {PatchSettingsSchema} from "~/server/schemas/settings"
import {useForm} from "vee-validate";

const router = useRouter()
const apiService = useApiService()

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: PatchSettingsSchema
});

const [id] = defineField('id');
const [standard_hours_per_month] = defineField('standard_hours_per_month');

const setValues = (data: PatchSettings) => {
  id.value = data.id
  standard_hours_per_month.value = data.standard_hours_per_month
}

const onSubmit = handleSubmit(async (values) => {
  const body = { id: 1, ...values } as PatchSettings
  await apiService.settings.updateOneById(body, body.id)
});

onMounted(async () => {
  const response = await apiService.settings.getOneById(1)
  setValues(response as PatchSettings)
})
</script>
