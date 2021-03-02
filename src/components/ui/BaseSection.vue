<template>
  <section class="container my-4 p-4">
    <div class="row">
      <div class="col-lg-12">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}
</style>