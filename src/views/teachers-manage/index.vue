<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="教师信息管理"
    />
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :scroll="{ x: 1300 }"
      bordered
      class="dataTable"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-button type="primary" @click="showTeach(record.Tno, record.Tname)"
            >查看任课情况</a-button
          >
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { HttpRequest } from '@/utils/httpRequest'
import { message } from 'ant-design-vue'
import router from '@/router'
const http = new HttpRequest()
const columns = [
  {
    title: '教师编号',
    dataIndex: 'Tno',
    key: 'Tno',
    fixed: 'left'
  },
  {
    title: '姓名',
    dataIndex: 'Tname',
    key: 'Tname',
    fixed: 'left'
  },
  {
    title: '性别',
    dataIndex: 'Tsex',
    key: 'Tsex'
  },
  {
    title: '年龄',
    dataIndex: 'Tage',
    key: 'Tage'
  },
  {
    title: '职称',
    dataIndex: 'Tlevel',
    key: 'Tlevel'
  },
  {
    title: '联系电话',
    dataIndex: 'Tphone',
    key: 'Tphone'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation'
  }
]
const loading = ref(true)
const dataSource = ref()
const current = ref(1)
const page = ref(1)
const size = ref(5)
const total = ref(0)
const getTeacherList = (currentPage) => {
  loading.value = true
  http
    .post('/getTeacherList', {
      page: currentPage,
      size: size.value
    })
    .then((response) => {
      dataSource.value = response.data
      total.value = response.total
      loading.value = false
    })
    .catch((error) => {
      message.error('网络连接失败' + error)
      loading.value = false
    })
}
getTeacherList(page.value)
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: size.value,
  showSizeChanger: false,
  position: ['bottomCenter']
}))

const handleTableChange = (changeObj) => {
  getTeacherList(changeObj.current)
  pagination.value.current = changeObj.current
}

const showTeach = (Tno, Tname) => {
  router.push({
    name: 'query-teach',
    query: {
      tno: Tno,
      tname: Tname
    }
  })
}
</script>

<style scoped>
.dataTable {
  margin-top: 10px;
}
</style>
