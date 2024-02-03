<template>
  <div class="p-card">
    <div class="auth-form">
      <div>Авторизация</div>
      <InputText
          v-model="user.login"
          type="text"
          class="mt-10"
          placeholder="Логин"
      />
      <InputText
          v-model="user.password"
          type="text"
          class="mt-10"
          placeholder="Пароль"
      />
      <Button
          label="Войти"
          class="mt-10"
          @click="auth"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {User} from "~/server/types/auth";

const toast = useToast();
const router = useRouter()

const user = ref<User>({
  login: '',
  password: ''
})

const auth = async () => {
  await $fetch('/api/sign-in', {
    method: 'POST',
    body: user.value
  }).then(() => {
    router.push('/')
  }).catch(() => {
    toast.add({
      severity: 'error',
      summary: 'Не удалось авторизоваться',
      detail: 'Не верный логин или пароль',
      life: 4000
    });
  })
}
</script>

<style scoped lang="scss">
.auth-form {
  margin: 40px;
  display: flex;
  flex-direction: column;
}
</style>
