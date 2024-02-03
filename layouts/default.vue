<template>
  <div class="default-layout">
    <div class="default-layout_sidebar">
      <layoutNavbar />
    </div>
    <div class="default-layout_content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  display: grid;
  grid-template-columns: 200px calc(100vw - 220px);
  height: 100vh;
  &_sidebar {
    border-right: 1px solid #e5e7eb;
  }
  &_content {
    margin: 20px;
  }
}
@media screen and (max-device-width: 600px) {
  .default-layout {
    grid-template-columns: 1fr;
    height: 100px;
    &_sidebar {
      height: 80px;
    }
  }
}
</style>


