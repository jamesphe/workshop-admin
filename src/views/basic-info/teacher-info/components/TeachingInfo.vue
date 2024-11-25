<template>
  <div class="teaching-info">
    <el-descriptions :column="3" border>
      <el-descriptions-item label="任教课程">
        {{ teacherInfo.teachingSubject }}
      </el-descriptions-item>
      <el-descriptions-item label="课程名称">
        {{ teacherInfo.courseName }}
      </el-descriptions-item>
      <el-descriptions-item label="授课班级">
        {{ teacherInfo.className }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'TeachingInfo',
  props: {
    teacherInfo: {
      type: Object,
      required: true
    }
  }
}
</script> 