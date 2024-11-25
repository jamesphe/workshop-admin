<template>
  <div class="award-info">
    <!-- 奖学金信息 -->
    <div class="section-title">奖学金信息</div>
    <el-table :data="studentInfo.scholarships" border style="width: 100%">
      <el-table-column prop="name" label="奖学金名称" />
      <el-table-column prop="amount" label="金额" width="120">
        <template #default="{ row }">
          {{ row.amount }}元
        </template>
      </el-table-column>
      <el-table-column prop="date" label="获得日期" width="120" />
    </el-table>

    <!-- 获奖记录 -->
    <div class="section-title">获奖记录</div>
    <el-table :data="studentInfo.awards" border style="width: 100%">
      <el-table-column prop="name" label="奖项名称" />
      <el-table-column prop="level" label="获奖级别" width="120">
        <template #default="{ row }">
          <el-tag :type="getAwardLevelType(row.level)">{{ row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="获奖日期" width="120" />
    </el-table>

    <!-- 处分记录 -->
    <div class="section-title">处分记录</div>
    <el-table :data="studentInfo.punishments" border style="width: 100%">
      <el-table-column prop="name" label="处分原因" />
      <el-table-column prop="type" label="处分类型" width="120">
        <template #default="{ row }">
          <el-tag type="danger">{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="处分日期" width="120" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AwardInfo',
  props: {
    studentInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    getAwardLevelType(level) {
      const types = {
        '国家级': 'success',
        '省级': 'primary',
        '市级': 'warning',
        '校级': 'info'
      }
      return types[level] || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.section-title {
  margin: 20px 0 10px;
  font-size: 16px;
  font-weight: bold;
}

.el-table {
  margin-bottom: 20px;
}
</style> 