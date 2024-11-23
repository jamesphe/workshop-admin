<template>
  <div class="custom-descriptions-item">
    <div class="custom-descriptions-item__label">{{ label }}</div>
    <div class="custom-descriptions-item__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DescriptionsItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    span: {
      type: Number,
      default: 1
    }
  },
  inject: ['descriptions']
}
</script>

<style lang="scss" scoped>
.custom-descriptions-item {
  display: flex;
  flex-direction: column;
  grid-column: span v-bind(span);

  &__label {
    margin-bottom: 4px;
    color: #909399;
    font-size: 14px;
  }

  &__content {
    color: #303133;
    font-size: 14px;
  }
}
</style> 