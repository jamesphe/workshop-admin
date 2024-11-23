<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <!-- 基本信息 -->
    <el-divider content-position="left">基本信息</el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工号" prop="employeeNumber">
          <el-input v-model="form.employeeNumber" placeholder="请输入工号" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="male" />
            <el-option label="女" value="female" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="出生日期" prop="dateOfBirth">
          <el-date-picker
            v-model="form.dateOfBirth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="国籍" prop="nationality">
          <el-input v-model="form.nationality" placeholder="请输入国籍" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="民族" prop="ethnicity">
          <el-select v-model="form.ethnicity" placeholder="请选择民族">
            <el-option label="汉族" value="汉族" />
            <el-option label="满族" value="满族" />
            <el-option label="回族" value="回族" />
            <el-option label="藏族" value="藏族" />
            <el-option label="维吾尔族" value="维吾尔族" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="政治面貌" prop="politicalStatus">
          <el-select v-model="form.politicalStatus" placeholder="请选择政治面貌">
            <el-option label="中共党员" value="中共党员" />
            <el-option label="中共预备党员" value="中共预备党员" />
            <el-option label="共青团员" value="共青团员" />
            <el-option label="民主党派" value="民主党派" />
            <el-option label="群众" value="群众" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="照片" prop="photo">
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handlePhotoSuccess"
            :before-upload="beforePhotoUpload"
          >
            <img v-if="form.photo" :src="form.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 联系方式 -->
    <el-divider content-position="left">联系方式</el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="请输入手机号码" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮箱" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="家庭住址" prop="address">
          <el-input v-model="form.address" placeholder="请输入家庭住址" />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 教职信息 -->
    <el-divider content-position="left">教职信息</el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="所属部门" prop="department">
          <el-cascader
            v-model="form.department"
            :options="departmentOptions"
            placeholder="请选择部门"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="职称" prop="position">
          <el-select v-model="form.position" placeholder="请选择职称">
            <el-option label="教授" value="教授" />
            <el-option label="副教授" value="副教授" />
            <el-option label="讲师" value="讲师" />
            <el-option label="助教" value="助教" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="雇佣类型" prop="employmentType">
          <el-select v-model="form.employmentType" placeholder="请选择雇佣类型">
            <el-option label="正式" value="正式" />
            <el-option label="兼职" value="兼职" />
            <el-option label="临时" value="临时" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="入职日期" prop="hireDate">
          <el-date-picker
            v-model="form.hireDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="合同结束" prop="contractEndDate">
          <el-date-picker
            v-model="form.contractEndDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="工作状态" prop="employmentStatus">
          <el-select v-model="form.employmentStatus" placeholder="请选择工作状态">
            <el-option label="在职" value="在职" />
            <el-option label="离职" value="离职" />
            <el-option label="退休" value="退休" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="工资等级" prop="salaryGrade">
          <el-select v-model="form.salaryGrade" placeholder="请选择工资等级">
            <el-option label="一级" value="一级" />
            <el-option label="二级" value="二级" />
            <el-option label="三级" value="三级" />
            <el-option label="四级" value="四级" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="工作量" prop="workload">
          <el-input-number v-model="form.workload" :min="0" :max="100" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="主讲课程" prop="teachingSubject">
          <el-select v-model="form.teachingSubject" placeholder="请选择主讲课程">
            <el-option label="Java程序设计" value="Java程序设计" />
            <el-option label="数据结构" value="数据结构" />
            <el-option label="计算机网络" value="计算机网络" />
            <el-option label="操作系统" value="操作系统" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 扩展信息 -->
    <el-divider content-position="left">扩展信息</el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="紧急联系人" prop="emergencyContact">
          <el-input v-model="form.emergencyContact" placeholder="请输入紧急联系人" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="紧急电话" prop="emergencyPhone">
          <el-input v-model="form.emergencyPhone" placeholder="请输入紧急电话" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="健康状况" prop="healthStatus">
          <el-select v-model="form.healthStatus" placeholder="请选择健康状况">
            <el-option label="健康" value="健康" />
            <el-option label="良好" value="良好" />
            <el-option label="一般" value="一般" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item label="备注信息" prop="remarks">
          <el-input
            v-model="form.remarks"
            type="textarea"
            :rows="3"
            placeholder="请输入备注信息"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 表单操作 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TeacherForm',
  props: {
    teacherInfo: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      form: {
        employeeNumber: '',
        name: '',
        gender: '',
        dateOfBirth: '',
        idCard: '',
        nationality: '',
        ethnicity: '',
        politicalStatus: '',
        phoneNumber: '',
        email: '',
        address: '',
        position: '',
        employmentType: '',
        hireDate: '',
        contractEndDate: '',
        employmentStatus: '',
        salaryGrade: '',
        workload: '',
        teachingSubject: '',
        emergencyContact: '',
        emergencyPhone: '',
        healthStatus: '',
        remarks: ''
      },
      rules: {
        employeeNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phoneNumber: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择所属部门', trigger: 'change' }
        ],
        position: [
          { required: true, message: '请选择职称', trigger: 'change' }
        ]
      },
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
  watch: {
    teacherInfo: {
      handler(val) {
        if (val) {
          this.form = { ...val }
        } else {
          this.$refs.form && this.$refs.form.resetFields()
        }
      },
      immediate: true
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('success', this.form)
        }
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    handlePhotoSuccess(res, file) {
      this.form.photo = URL.createObjectURL(file.raw)
    },
    beforePhotoUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;

  &:hover {
    border-color: #409EFF;
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style> 