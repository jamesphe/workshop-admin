<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-tabs v-model="activeTab">
      <!-- 基本信息 -->
      <el-tab-pane label="基本信息" name="basic">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="学号" prop="studentNumber">
              <el-input v-model="form.studentNumber" placeholder="请输入学号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="form.gender">
                <el-radio label="male">男</el-radio>
                <el-radio label="female">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="dateOfBirth">
              <el-date-picker
                v-model="form.dateOfBirth"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="政治面貌" prop="politicalStatus">
              <el-select v-model="form.politicalStatus" placeholder="请选择政治面貌">
                <el-option label="群众" value="群众" />
                <el-option label="共青团员" value="共青团员" />
                <el-option label="中共党员" value="中共党员" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 学籍信息 -->
      <el-tab-pane label="学籍信息" name="academic">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属院系" prop="department">
              <el-cascader
                v-model="form.department"
                :options="departmentOptions"
                placeholder="请选择院系"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业" prop="major">
              <el-input v-model="form.major" placeholder="请输入专业" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年级" prop="grade">
              <el-select v-model="form.grade" placeholder="请选择年级">
                <el-option
                  v-for="year in gradeOptions"
                  :key="year"
                  :label="year + '级'"
                  :value="year"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级" prop="class">
              <el-input v-model="form.class" placeholder="请输入班级" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学籍状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择学籍状态">
                <el-option label="在读" value="在读" />
                <el-option label="休学" value="休学" />
                <el-option label="退学" value="退学" />
                <el-option label="毕业" value="毕业" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 学习信息 -->
      <el-tab-pane label="学习信息" name="study">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="平均绩点" prop="gpa">
              <el-input-number
                v-model="form.gpa"
                :precision="2"
                :step="0.01"
                :min="0"
                :max="4"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已修学分" prop="credits">
              <el-input-number
                v-model="form.credits"
                :precision="1"
                :step="0.5"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业排名" prop="ranking">
              <el-input-number
                v-model="form.ranking"
                :min="1"
                :max="form.totalStudents"
              />
              <span style="margin-left: 10px">/ {{ form.totalStudents }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 联系方式 -->
      <el-tab-pane label="联系方式" name="contact">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phoneNumber">
              <el-input v-model="form.phoneNumber" placeholder="请输入手机号码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入电子邮箱" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <!-- 表单操作按钮 -->
    <div style="text-align: center; margin-top: 20px">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="$emit('cancel')">取 消</el-button>
    </div>
  </el-form>
</template>

<script>
import { createStudent, updateStudent } from '@/api/student'

export default {
  name: 'StudentForm',
  props: {
    studentInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeTab: 'basic',
      form: {
        studentNumber: '',
        name: '',
        gender: 'male',
        dateOfBirth: '',
        politicalStatus: '',
        department: [],
        major: '',
        grade: '',
        class: '',
        status: '在读',
        gpa: 0,
        credits: 0,
        ranking: 1,
        totalStudents: 100,
        phoneNumber: '',
        email: ''
      },
      rules: {
        studentNumber: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { pattern: /^\d{8,12}$/, message: '学号格式不正确', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        dateOfBirth: [
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择院系', trigger: 'change' }
        ],
        major: [
          { required: true, message: '请输入专业', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        phoneNumber: [
          { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      },
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
  watch: {
    studentInfo: {
      handler(val) {
        if (val) {
          this.form = { ...val }
        }
      },
      immediate: true
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.$refs.form.validate()
        if (this.studentInfo) {
          await updateStudent(this.studentInfo.id, this.form)
        } else {
          await createStudent(this.form)
        }
        this.$emit('success')
      } catch (error) {
        console.error('提交表单失败:', error)
      }
    }
  }
}
</script> 