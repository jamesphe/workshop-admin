<template>
  <el-dialog :title="title" :visible.sync="visible" width="650px" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入活动名称" />
      </el-form-item>
      <el-form-item label="活动类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择活动类型">
          <el-option
            v-for="(label, value) in typeOptions"
            :key="value"
            :label="label"
            :value="Number(value)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="活动地点" prop="location">
        <el-input v-model="form.location" placeholder="请输入活动地点" />
      </el-form-item>
      <el-form-item label="活动时间" prop="timeRange">
        <el-date-picker
          v-model="form.timeRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="人数限制" prop="maxParticipants">
        <el-input-number v-model="form.maxParticipants" :min="1" />
      </el-form-item>
      <el-form-item label="活动描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="4"
          placeholder="请输入活动描述"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'ActivityForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        name: '',
        type: undefined,
        location: '',
        timeRange: [],
        maxParticipants: 100,
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择活动类型', trigger: 'change' }],
        location: [{ required: true, message: '请输入活动地点', trigger: 'blur' }],
        timeRange: [{ required: true, message: '请选择活动时间', trigger: 'change' }],
        maxParticipants: [{ required: true, message: '请输入人数限制', trigger: 'blur' }]
      },
      typeOptions: {
        1: '文体活动',
        2: '学术讲座',
        3: '志愿服务',
        4: '社会实践'
      }
    }
  },
  methods: {
    setData(data) {
      this.form = {
        ...data,
        timeRange: [data.startTime, data.endTime]
      }
    },
    async submitForm() {
      try {
        await this.$refs.form.validate()
        
        const [startTime, endTime] = this.form.timeRange
        const data = {
          ...this.form,
          startTime,
          endTime
        }
        delete data.timeRange
        
        if (this.form.id) {
          // 更新活动
          await request({
            url: '/vue-element-admin/activity/update',
            method: 'put',
            data
          })
        } else {
          // 创建活动
          await request({
            url: '/vue-element-admin/activity/create',
            method: 'post',
            data
          })
        }
        
        this.$message.success(`${this.form.id ? '更新' : '创建'}成功`)
        this.$emit('success')
        this.cancel()
      } catch (error) {
        if (error !== 'cancel') {
          console.error(`${this.form.id ? '更新' : '创建'}活动失败:`, error)
        }
      }
    },
    cancel() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        type: undefined,
        location: '',
        timeRange: [],
        maxParticipants: 100,
        description: ''
      }
    }
  }
}
</script> 