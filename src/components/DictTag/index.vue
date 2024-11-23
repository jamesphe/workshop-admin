<template>
  <el-tag
    :type="type"
    :class="'dict-tag'"
  >
    {{ label }}
  </el-tag>
</template>

<script>
export default {
  name: 'DictTag',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    }
  },
  computed: {
    label() {
      const option = this.options.find(item => item.value === this.value)
      return option ? option.label : this.value
    },
    type() {
      const option = this.options.find(item => item.value === this.value)
      return option && option.type ? option.type : ''
    }
  }
}
</script>

<style scoped>
.dict-tag {
  margin-right: 5px;
}
</style> 