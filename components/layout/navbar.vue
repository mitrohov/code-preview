<template>
  <tiered-menu class="vertical-nav" :model="items" />
  <div class="mobile-nav">
    <Button
        type="button"
        icon="pi pi-align-justify"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        @click="toggle"
    />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const clearAllCookie = () => {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

const items = ref([
  {
    label: 'Дэшборд',
    icon: 'pi pi-chart-pie',
    command: () => {
      router.push('/');
    }
  },
  {
    label: 'Ученики',
    icon: 'pi pi-user',
    command: () => {
      router.push('/students');
    }
  },
  {
    label: 'События',
    icon: 'pi pi-briefcase',
    command: () => {
      router.push('/events');
    }
  },
  {
    label: 'Расписание',
    icon: 'pi pi-calendar',
    command: () => {
      router.push('/event-calendar');
    }
  },
  {
    label: 'Оплаты',
    icon: 'pi pi-dollar',
    command: () => {
      router.push('/payments');
    }
  },
  {
    label: 'Контакты',
    icon: 'pi pi-phone',
    command: () => {
      router.push('/contacts');
    }
  },
  {
    label: 'Категории событий',
    icon: 'pi pi-copy',
    command: () => {
      router.push('/event-categories');
    }
  },
  {
    label: 'Уровни языка',
    icon: 'pi pi-chart-bar',
    command: () => {
      router.push('/english-levels');
    }
  },
  {
    label: 'Цели занятий',
    icon: 'pi pi-check-square',
    command: () => {
      router.push('/purpose-lesson');
    }
  },
  {
    label: 'Платформы',
    icon: 'pi pi-globe',
    command: () => {
      router.push('/order-platforms');
    }
  },
  {
    label: 'Настройки',
    icon: 'pi pi-cog',
    command: () => {
      router.push('/settings');
    }
  },
  {
    label: 'Выход',
    icon: 'pi pi-sign-out',
    command: () => {
      clearAllCookie()
      router.push('/auth');
    }
  },
]);

const menu = ref();

const toggle = (event: Event) => {
  menu.value.toggle(event);
};
</script>

<style lang="scss">
.p-tieredmenu {
  border: none;
}
.mobile-nav {
  margin-left: 20px;
  margin-top: 20px;
}
@media screen and (max-device-width: 600px) {
  .vertical-nav {
    display: none;
  }
}
@media screen and (min-device-width: 600px) {
  .mobile-nav {
    display: none;
  }
}
</style>
