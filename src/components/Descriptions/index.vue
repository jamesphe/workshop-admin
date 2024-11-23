<template>
  <div class="custom-descriptions">
    <div v-if="title" class="custom-descriptions__title">{{ title }}</div>
    <div class="custom-descriptions__body" :class="{ 'is-bordered': border }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Descriptions',
  props: {
    title: {
      type: String,
      default: ''
    },
    column: {
      type: Number,
      default: 3
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      descriptions: this
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-descriptions {
  &__title {
    margin-bottom: 16px;
    color: #303133;
    font-weight: 500;
    font-size: 16px;
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 0;

    &.is-bordered {
      border: 1px solid #EBEEF5;
      padding: 16px;
    }
  }
}
</style> 