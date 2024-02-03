<template>
  <div v-if="!apiService.purposeLessons.isLoading" class="purpose-lesson-form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToPurposeLessonTable" />
    </div>
    <div v-if="!route.query.id" class="purpose-lesson-form_title">
      Новая цель занятий
    </div>
    <ui-input-text
        v-model="title"
        :error-message="errors.title"
        id="fio"
        label="Название цели"
    />
    <div class="mt-20">
      <Button label="Сохранить" @click="onSubmit" />
    </div>
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import type { PostPurposeLesson, PatchPurposeLesson } from "~/server/types/purpose-lesson"
import {PostOrderPlatformSchema} from "~/server/schemas/order-platform"
import {useForm} from "vee-validate";

const router = useRouter()
const route = useRoute()
const apiService = useApiService()

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: PostOrderPlatformSchema,
});

const [title] = defineField('title');

const routeToPurposeLessonTable = () => {
  router.push('/purpose-lesson')
}

const setValues = (data: PostPurposeLesson) => {
  title.value = data.title
}

const onSubmit = handleSubmit(async (values) => {
  if (route.query.id) {
    const body = { id: Number(route.query.id), ...values } as PatchPurposeLesson
    await apiService.purposeLessons.updateOneById(body, body.id)
  } else {
    const body = { ...values } as PostPurposeLesson
    await apiService.purposeLessons.createOne(body)
  }
  routeToPurposeLessonTable()
});

onMounted(async () => {
  await apiService.purposeLessons.getAll()
  if (route.query.id) {
    const response = await apiService.purposeLessons.getOneById(Number(route.query.id))
    setValues(response as PostPurposeLesson)
  }
})
</script>

<style lang="scss" scoped>
.purpose-lesson-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  &_title {
    font-size: 26px;
    font-weight: 500;
  }
}
</style>
