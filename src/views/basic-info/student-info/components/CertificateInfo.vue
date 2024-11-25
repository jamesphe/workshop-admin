<template>
  <div class="certificate-info">
    <el-table :data="studentInfo.certificates" border style="width: 100%">
      <el-table-column prop="name" label="证书名称" />
      <el-table-column prop="number" label="证书编号" width="180" />
      <el-table-column prop="issueDate" label="发证日期" width="120" />
      <el-table-column prop="issuer" label="发证机构" width="120" />
      <el-table-column prop="score" label="成绩/等级" width="100">
        <template #default="{ row }">
          <el-tag :type="getCertificateScoreType(row.score)">{{ row.score }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CertificateInfo',
  props: {
    studentInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCertificateScoreType(score) {
      if (score >= 550) return 'success'
      if (score >= 500) return 'primary'
      if (score >= 425) return 'warning'
      return 'info'
    }
  }
}
</script> 