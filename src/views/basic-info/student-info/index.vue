<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>学生一张表</span>
        <div style="float: right">
          <el-button type="success" icon="el-icon-plus" @click="handleCreate">新增学生</el-button>
          <el-button type="primary" icon="el-icon-download" @click="handleExport">导出Excel</el-button>
        </div>
      </div>

      <!-- 搜索区域 -->
      <div class="filter-container">
        <el-input
          v-model="query.keyword"
          placeholder="姓名/学号/身份证号"
          style="width: 200px"
          class="filter-item"
          clearable
        />
        <el-cascader
          v-model="query.department"
          :options="departmentOptions"
          placeholder="所属院系"
          clearable
          class="filter-item"
        />
        <el-select v-model="query.grade" placeholder="年级" clearable class="filter-item">
          <el-option
            v-for="year in gradeOptions"
            :key="year"
            :label="year + '级'"
            :value="year"
          />
        </el-select>
        <el-select v-model="query.status" placeholder="学籍状态" clearable class="filter-item">
          <el-option label="在读" value="在读" />
          <el-option label="休学" value="休学" />
          <el-option label="退学" value="退学" />
          <el-option label="毕业" value="毕业" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </div>

      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="studentList"
        border
        style="width: 100%"
        :fit="true"
      >
        <!-- 基本信息 -->
        <el-table-column label="基本信息" align="center">
          <el-table-column prop="studentNumber" label="学号" min-width="100" />
          <el-table-column prop="name" label="姓名" min-width="80" />
          <el-table-column prop="gender" label="性别" min-width="60">
            <template #default="{ row }">
              {{ row.gender === 'male' ? '男' : row.gender === 'female' ? '女' : '其他' }}
            </template>
          </el-table-column>
          <el-table-column prop="dateOfBirth" label="出生日期" min-width="100" />
          <el-table-column prop="politicalStatus" label="政治面貌" min-width="100" />
        </el-table-column>

        <!-- 学籍信息 -->
        <el-table-column label="学籍信息" align="center">
          <el-table-column prop="department" label="所属院系" min-width="150">
            <template #default="{ row }">
              {{ getDepartmentLabel(row.department) }}
            </template>
          </el-table-column>
          <el-table-column prop="major" label="专业" min-width="120" />
          <el-table-column prop="grade" label="年级" min-width="80">
            <template #default="{ row }">
              {{ row.grade }}级
            </template>
          </el-table-column>
          <el-table-column prop="class" label="班级" min-width="80" />
          <el-table-column prop="status" label="学籍状态" min-width="80">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>

        <!-- 学习信息 -->
        <el-table-column label="学习信息" align="center">
          <el-table-column prop="averageScore" label="平均成绩" min-width="100">
            <template #default="{ row }">
              <el-tooltip effect="dark" placement="top">
                <div slot="content">
                  成绩等级说明：<br>
                  90-100分：优秀<br>
                  80-89分：良好<br>
                  70-79分：中等<br>
                  60-69分：及格<br>
                  60分以下：不及格
                </div>
                <el-tag :type="getScoreType(row.averageScore)">
                  {{ row.averageScore }}分
                </el-tag>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="totalCredits" label="已修学分" min-width="100">
            <template #default="{ row }">
              {{ row.totalCredits }}/{{ row.requiredCredits }}
            </template>
          </el-table-column>
          <el-table-column prop="ranking" label="专业排名" min-width="100">
            <template #default="{ row }">
              {{ row.ranking }}/{{ row.totalStudents }}
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
      <student-form
        ref="studentForm"
        :student-info="selectedStudent"
        @cancel="dialogVisible = false"
        @success="handleSuccess"
      />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import StudentForm from './components/StudentForm'
import { getStudentList, deleteStudent, getStudent } from '@/api/student'

export default {
  name: 'StudentInfo',
  components: {
    Pagination,
    StudentForm
  },
  data() {
    return {
      loading: false,
      query: {
        page: 1,
        limit: 10,
        keyword: '',
        department: '',
        grade: '',
        status: ''
      },
      total: 0,
      studentList: [],
      dialogVisible: false,
      dialogTitle: '',
      selectedStudent: null,
      departmentOptions: [
        {
          value: '理工学院',
          label: '理工学院',
          children: [
            { value: '计算机系', label: '计算机系' },
            { value: '机械系', label: '机械系' }
          ]
        },
        {
          value: '文学院',
          label: '文学院',
          children: [
            { value: '中文系', label: '中文系' },
            { value: '外语系', label: '外语系' }
          ]
        }
      ],
      gradeOptions: (() => {
        const currentYear = new Date().getFullYear()
        return Array.from({ length: 4 }, (_, i) => currentYear - i)
      })()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      try {
        const { data } = await getStudentList(this.query)
        this.studentList = data.items
        this.total = data.total
      } catch (error) {
        console.error('获取学生列表失败:', error)
        this.$message.error('获取学生列表失败')
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
        grade: '',
        status: ''
      }
      this.getList()
    },
    handleCreate() {
      this.dialogTitle = '新增学生'
      this.selectedStudent = null
      this.dialogVisible = true
    },
    async handleEdit(row) {
      try {
        const { data } = await getStudent(row.id)
        this.dialogTitle = '编辑学生'
        this.selectedStudent = data
        this.dialogVisible = true
      } catch (error) {
        console.error('获取学生详情失败:', error)
        this.$message.error('获取学生详情失败')
      }
    },
    handleView(row) {
      this.$router.push({ 
        path: `/basic-info/student-info/detail/${row.id}`,
        query: { student: JSON.stringify(row) }
      })
    },
    async handleDelete(row) {
      try {
        await this.$confirm('确认删除该学生信息吗？', '警告', {
          type: 'warning'
        })
        
        await deleteStudent(row.id)
        this.$message.success('删除成功')
        this.getList()
      } catch (error) {
        if (error !== 'cancel') {
          console.error('删除学生失败:', error)
          this.$message.error('删除学生失败')
        }
      }
    },
    handleSuccess() {
      this.dialogVisible = false
      this.getList()
      this.$message.success('操作成功')
    },
    handleExport() {
      this.$message.success('导出成功')
    },
    getDepartmentLabel(department) {
      if (!department || !Array.isArray(department)) return ''
      const [college, dept] = department
      return `${college} - ${dept}`
    },
    getStatusType(status) {
      const types = {
        '在读': 'success',
        '休学': 'warning',
        '退学': 'danger',
        '毕业': 'info'
      }
      return types[status] || ''
    },
    getScoreType(score) {
      if (score >= 90) return 'success'
      if (score >= 80) return 'primary'
      if (score >= 70) return 'warning'
      if (score >= 60) return 'info'
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