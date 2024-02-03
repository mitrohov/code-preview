<template>
  <div v-if="!apiService.orderPlatform.isLoading" class="form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToOrderPlatformsTable" />
    </div>
    <div v-if="!route.query.id" class="form_title">
      Новая платформа
    </div>
    <ui-input-text
        v-model="title"
        :error-message="errors.title"
        id="fio"
        label="Название платформы"
    />
    <div class="mt-20">
      <Button label="Сохранить" @click="onSubmit" />
    </div>
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import type { PostOrderPlatform, PatchOrderPlatform } from "~/server/types/order-platform"
import {PostOrderPlatformSchema} from "~/server/schemas/order-platform"
import {useForm} from "vee-validate";

const router = useRouter()
const route = useRoute()
const apiService = useApiService()

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: PostOrderPlatformSchema,
});

const [title] = defineField('title');

const routeToOrderPlatformsTable = () => {
  router.push('/order-platforms')
}

const setValues = (data: PostOrderPlatform) => {
  title.value = data.title
}

const onSubmit = handleSubmit(async (values) => {
  if (route.query.id) {
    const body = { id: Number(route.query.id), ...values } as PatchOrderPlatform
    await apiService.orderPlatform.updateOneById(body, body.id)
  } else {
    const body = { ...values } as PostOrderPlatform
    await apiService.orderPlatform.createOne(body)
  }
  routeToOrderPlatformsTable()
});

onMounted(async () => {
  await apiService.orderPlatform.getAll()
  if (route.query.id) {
    const response = await apiService.orderPlatform.getOneById(Number(route.query.id))
    setValues(response as PostOrderPlatform)
  }
})
</script>
