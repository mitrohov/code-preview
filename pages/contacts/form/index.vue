<template>
  <div v-if="!apiService.contacts.isLoading" class="form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToContactsTable" />
    </div>
    <div v-if="!route.query.id" class="form_title">
      Новый контакт
    </div>
    <ui-input-text
        v-model="fio"
        :error-message="errors.fio"
        id="fio"
        label="ФИО"
    />
    <ui-input-text
        v-model="mobile_number"
        id="mobile_number"
        label="Мобильный телефон"
    />
    <ui-dropdown
        v-if="orderPlatformsStore.orderPlatforms.length > 0"
        v-model="order_platform_id"
        :options="orderPlatformsStore.orderPlatforms"
        optionLabel="title"
        optionValue="id"
        label="Откуда контакт"
        id="order-platform"
    />
    <ui-editor
        v-model="socials"
        id="wishes"
        label="Социальные сети"
    />
    <ui-editor
        v-model="description"
        id="wishes"
        label="Описание"
    />
    <div class="mt-20">
      <Button label="Сохранить" @click="onSubmit" />
    </div>
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import type { PostContact, PatchContact } from "~/server/types/contacts"
import {PostContactSchema} from "~/server/schemas/contact"
import { useForm } from 'vee-validate';

const router = useRouter()
const route = useRoute()
const orderPlatformsStore = useOrderPlatformsStore()
const apiService = useApiService()

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: PostContactSchema,
});

const [fio] = defineField('fio');
const [mobile_number] = defineField('mobile_number');
const [socials] = defineField('socials');
const [description] = defineField('description');
const [order_platform_id] = defineField('order_platform_id');

const routeToContactsTable = () => {
  router.push('/contacts')
}

const setValues = (data: PostContact) => {
  fio.value = data.fio
  mobile_number.value = data.mobile_number
  socials.value = data.socials
  description.value = data.description
  order_platform_id.value = data.order_platform_id
}

const onSubmit = handleSubmit(async (values) => {
  if (route.query.id) {
    const body = { id: Number(route.query.id), ...values } as PatchContact
    await apiService.contacts.updateOneById(body, body.id)
  } else {
    const body = { ...values } as PostContact
    await apiService.contacts.createOne(body)
  }
  routeToContactsTable()
});

onMounted(async () => {
  await apiService.orderPlatform.getAll()
  if (route.query.id) {
    const response = await apiService.contacts.getOneById(Number(route.query.id))
    setValues(response as PostContact)
  } else {
    order_platform_id.value = orderPlatformsStore.orderPlatforms[0].id
    mobile_number.value = ''
    socials.value = ''
    description.value = ''
  }
})
</script>
