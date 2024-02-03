<template>
<div v-if="!isLoading" class="form">
  <div>
    <Button label="Назад" severity="secondary" @click="routeToEventCategoryTable" />
  </div>
  <div v-if="!route.query.id" class="form_title">
    Новая категория
  </div>
  <ui-input-text
      v-model="title"
      :error-message="errors.title"
      id="fio"
      label="Название категории"
  />
  <div v-if="eventColorsStore.eventColors.length > 0" class="d-flex flex-column">
    <label for="color">Цвет</label>
    <Dropdown
        :modelValue="eventColorsStore.findColorById(color_id)"
        :options="eventColorsStore.eventColors"
        optionLabel="title"
        class="mt-5"
        @update:modelValue="updateEventColor($event)"
    >
      <template #value="slotProps">
        <ui-tag
            v-if="slotProps.value"
            :background="slotProps.value.code"
            :title="slotProps.value.title"
            :padding="'10px'"
            :color="'black'"
        />
      </template>
      <template #option="slotProps">
        <ui-tag
            v-if="slotProps.option"
            :background="slotProps.option.code"
            :title="slotProps.option.title"
            :padding="'10px'"
            :color="'black'"
        />
      </template>
    </Dropdown>
  </div>
  <div class="mt-20">
    <Button label="Сохранить" @click="onSubmit" />
  </div>
</div>
<ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import type { PostEventsCategory, PatchEventsCategory } from "~/server/types/events-category"
import type { GetEventColor } from "~/server/types/event-color"
import {PostEventCategorySchema} from "~/server/schemas/event-category"
import {useForm} from "vee-validate";

const router = useRouter()
const route = useRoute()
const apiService = useApiService()
const eventColorsStore = useEventColorsStore()
const isLoading = ref<boolean>(false)

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: PostEventCategorySchema,
});

const [title] = defineField('title');
const [color_id] = defineField('color_id');

const routeToEventCategoryTable = () => {
  router.push('/event-categories')
}

const updateEventColor = (color: GetEventColor) => {
  color_id.value = eventColorsStore.findColorById(color.id).id
}

const setValues = (data: PostEventsCategory) => {
  title.value = data.title
  color_id.value = data.color_id
}

const onSubmit = handleSubmit(async (values) => {
  if (route.query.id) {
    const body = { id: Number(route.query.id), ...values } as PatchEventsCategory
    await apiService.eventCategories.updateOneById(body, body.id)
  } else {
    const body = { ...values } as PostEventsCategory
    await apiService.eventCategories.createOne(body)
  }
  routeToEventCategoryTable()
});

onMounted(async () => {
  isLoading.value = true
  await apiService.eventColors.getAll()

  if (route.query.id) {
    const response = await apiService.eventCategories.getOneById(Number(route.query.id))
    setValues(response as PostEventsCategory)
  } else {
    color_id.value = eventColorsStore.eventColors[0].id
  }
  isLoading.value = false
})
</script>
