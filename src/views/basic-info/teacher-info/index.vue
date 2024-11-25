<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>教师一张表</span>
        <div style="float: right">
          <el-button type="success" icon="el-icon-plus" @click="handleCreate">新增教师</el-button>
          <el-button type="primary" icon="el-icon-download" @click="handleExport">导出Excel</el-button>
        </div>
      </div>

      <!-- 搜索区域 -->
      <div class="filter-container">
        <el-input
          v-model="query.keyword"
          placeholder="姓名/工号/身份证号"
          style="width: 200px"
          class="filter-item"
          clearable
        />
        <el-cascader
          v-model="query.department"
          :options="departmentOptions"
          placeholder="所属部门"
          clearable
          class="filter-item"
        />
        <el-select v-model="query.position" placeholder="职称" clearable class="filter-item">
          <el-option label="教授" value="professor" />
          <el-option label="副教授" value="associate_professor" />
          <el-option label="讲师" value="lecturer" />
          <el-option label="助教" value="assistant" />
        </el-select>
        <el-select v-model="query.employmentType" placeholder="雇佣类型" clearable class="filter-item">
          <el-option label="正式" value="正式" />
          <el-option label="兼职" value="兼职" />
          <el-option label="临时" value="临时" />
        </el-select>
        <el-select v-model="query.employmentStatus" placeholder="工作状态" clearable class="filter-item">
          <el-option label="在职" value="在职" />
          <el-option label="离职" value="离职" />
          <el-option label="退休" value="退休" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </div>

      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="teacherList"
        border
        style="width: 100%"
        :fit="true"
      >
        <!-- 基本信息 -->
        <el-table-column label="基本信息" align="center">
          <el-table-column prop="employeeNumber" label="工号" min-width="100" />
          <el-table-column prop="name" label="姓名" min-width="80" />
          <el-table-column prop="gender" label="性别" min-width="60">
            <template #default="{ row }">
              {{ row.gender === 'male' ? '男' : row.gender === 'female' ? '女' : '其他' }}
            </template>
          </el-table-column>
          <el-table-column prop="dateOfBirth" label="出生日期" min-width="100" />
          <el-table-column prop="politicalStatus" label="政治面貌" min-width="100" />
        </el-table-column>

        <!-- 教职信息 -->
        <el-table-column label="教职信息" align="center">
          <el-table-column prop="department" label="所属部门" min-width="150">
            <template #default="{ row }">
              {{ getDepartmentLabel(row.department) }}
            </template>
          </el-table-column>
          <el-table-column prop="position" label="职称" min-width="100">
            <template #default="{ row }">
              <el-tag :type="getPositionType(row.position)">{{ getPositionLabel(row.position) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="employmentType" label="雇佣类型" min-width="80" />
          <el-table-column prop="employmentStatus" label="工作状态" min-width="80">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.employmentStatus)">{{ row.employmentStatus }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="hireDate" label="入职日期" min-width="100" />
        </el-table-column>

        <!-- 教学信息 -->
        <el-table-column label="教学信息" align="center">
          <el-table-column prop="teachingSubject" label="主讲课程" min-width="120" />
          <el-table-column prop="workload" label="工作量" min-width="80">
            <template #default="{ row }">
              {{ row.workload }}学时
            </template>
          </el-table-column>
          <el-table-column prop="evaluationScore" label="教学评分" min-width="80">
            <template #default="{ row }">
              <el-tag :type="getScoreType(row.evaluationScore)">{{ row.evaluationScore }}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>

        <!-- 联系方式 -->
        <el-table-column label="联系方式" align="center">
          <el-table-column prop="phoneNumber" label="手机号码" min-width="120" />
          <el-table-column prop="email" label="电子邮箱" min-width="180" />
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" min-width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleView(row)">查看</el-button>
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="query.page"
        :limit.sync="query.limit"
        @pagination="getList"
      />
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="80%" append-to-body>
      <teacher-form
        ref="teacherForm"
        :teacher-info="selectedTeacher"
        @cancel="dialogVisible = false"
        @success="handleSuccess"
      />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import TeacherForm from './components/TeacherForm'
import { getTeacherList, deleteTeacher } from '@/api/teacher'

export default {
  name: 'TeacherInfo',
  components: {
    Pagination,
    TeacherForm
  },
  data() {
    return {
      loading: false,
      query: {
        page: 1,
        limit: 10,
        keyword: '',
        department: '',
        position: '',
        employmentType: '',
        employmentStatus: ''
      },
      total: 0,
      teacherList: [],
      dialogVisible: false,
      dialogTitle: '',
      selectedTeacher: null,
      departmentOptions: [
        {
          value: '教学部门',
          label: '教学部门',
          children: [
            { value: '计算机系', label: '计算机系' },
            { value: '机械系', label: '机械系' }
          ]
        },
        {
          value: '行政部门',
          label: '行政部门',
          children: [
            { value: '教务处', label: '教务处' },
            { value: '学生处', label: '学生处' }
          ]
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getTitleType(title) {
      const types = {
        professor: 'success',
        associate_professor: 'primary',
        lecturer: 'warning',
        assistant: 'info'
      }
      return types[title] || ''
    },
    getTitleLabel(title) {
      const labels = {
        professor: '教授',
        associate_professor: '副教授',
        lecturer: '讲师',
        assistant: '助教'
      }
      return labels[title] || title
    },
    getPositionType(position) {
      const types = {
        full_time: 'success',
        admin: 'primary',
        support: 'info'
      }
      return types[position] || ''
    },
    getPositionLabel(position) {
      const labels = {
        full_time: '专任教师',
        admin: '行政人员',
        support: '教辅人员'
      }
      return labels[position] || position
    },
    async getList() {
      this.loading = true
      try {
        const { data } = await getTeacherList(this.query)
        this.teacherList = data.items
        this.total = data.total
      } catch (error) {
        console.error('获取教师列表失败:', error)
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.query.page = 1
      this.getList()
    },
    resetQuery() {
      this.query = {
        page: 1,
        limit: 10,
        keyword: '',
        department: '',
        position: '',
        employmentType: '',
        employmentStatus: ''
      }
      this.getList()
    },
    handleCreate() {
      this.dialogTitle = '新增教师'
      this.selectedTeacher = null
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑教师'
      this.selectedTeacher = { ...row }
      this.dialogVisible = true
    },
    handleView(row) {
      this.$router.push({ path: `/basic-info/teacher-info/detail/${row.id}` })
    },
    handleDelete(row) {
      this.$confirm('确认删除该教师信息吗？', '警告', {
        type: 'warning'
      }).then(async() => {
        try {
          await deleteTeacher(row.id)
          this.$message.success('删除成功')
          this.getList()
        } catch (error) {
          console.error('删除教师失败:', error)
        }
      }).catch(() => {})
    },
    handleSuccess() {
      this.dialogVisible = false
      this.getList()
      this.$message.success('操作成功')
    },
    handleExport() {
      // TODO: 实现导出功能
      this.$message.success('导出成功')
    },
    getDepartmentLabel(department) {
      if (!department || !Array.isArray(department)) return ''
      const [type, dept] = department
      return `${type} - ${dept}`
    },
    getStatusType(status) {
      const types = {
        '在职': 'success',
        '离职': 'danger',
        '退休': 'info'
      }
      return types[status] || ''
    },
    getScoreType(score) {
      if (score >= 90) return 'success'
      if (score >= 80) return 'primary'
      if (score >= 60) return 'warning'
      return 'danger'
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  padding-bottom: 15px;
  .filter-item {
    margin-right: 10px;
  }
}
</style> 