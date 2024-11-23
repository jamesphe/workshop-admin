<template>
  <div class="app-container">
    <el-table :data="list" style="width: 100%">
      <el-table-column label="Order_No" min-width="200">
        <template slot-scope="scope">
          {{ scope.row.order_no | orderNoFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="金额" width="195" align="center">
        <template #default="scope">
          ¥ {{ scope.row.price | toThousandFilter }}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="100" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { transactionList } from '@/api/remote-search'
import { toThousandFilter } from '@/filters'

export default {
  name: 'TransactionTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    },
    toThousandFilter
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>
