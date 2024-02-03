<template>
  <div v-if="!apiService.englishLevels.isLoading" class="form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToEnglishLevelsTable" />
    </div>
    <div v-if="!route.query.id" class="form_title">
      Новый уровень
    </div>
    <ui-input-text
        v-model="title"
        :error-message="errors.title"
        id="fio"
        label="Название уровня"
    />
    <div class="mt-20">
      <Button label="Сохранить" @click="onSubmit" />
    </div>
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import type { PostEnglishLevel, PatchEnglishLevel } from "~/server/types/english-level"
import {PostEnglishLevelSchema} from "~/server/schemas/english-level"
import {useForm} from "vee-validate";

const router = useRouter()
const route = useRoute()
const apiService = useApiService()

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: PostEnglishLevelSchema,
});

const [title] = defineField('title');

const routeToEnglishLevelsTable = () => {
  router.push('/english-levels')
}

const setValues = (data: PostEnglishLevel) => {
  title.value = data.title
}

const onSubmit = handleSubmit(async (values) => {
  if (route.query.id) {
    const body = { id: Number(route.query.id), ...values } as PatchEnglishLevel
    await apiService.englishLevels.updateOneById(body, body.id)
  } else {
    const body = { ...values } as PostEnglishLevel
    await apiService.englishLevels.createOne(body)
  }
  routeToEnglishLevelsTable()
});

onMounted(async () => {
  await apiService.englishLevels.getAll()
  if (route.query.id) {
    const response = await apiService.englishLevels.getOneById(Number(route.query.id))
    setValues(response as PostEnglishLevel)
  }
})
</script>
