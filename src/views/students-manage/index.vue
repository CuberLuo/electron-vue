<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="学生信息查询"
    />
    <div class="searchBox">
      <label for="searchStu">学生信息检索:</label>
      <a-input
        id="searchStu"
        v-model:value="keyword"
        placeholder="请输入学号"
        style="width: 200px"
      ></a-input>
      <a-button
        type="primary"
        class="searchBtn"
        @click="searchStu"
        :disabled="disabled"
        style="margin-left: 10px"
      >
        <template #icon><SearchOutlined /></template>
        查询
      </a-button>
      <a-button
        type="primary"
        ghost
        @click="refreshList"
        style="margin-left: 10px"
      >
        <template #icon><RedoOutlined /></template>
        刷新
      </a-button>
    </div>

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
          <a-button
            type="primary"
            @click="showStuScore(record.Sno, record.Sname)"
            >成绩查询</a-button
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
import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue'
import router from '@/router'
const http = new HttpRequest()
const columns = [
  {
    title: '学号',
    dataIndex: 'Sno',
    key: 'Sno',
    fixed: 'left'
  },
  {
    title: '姓名',
    dataIndex: 'Sname',
    key: 'Sname',
    fixed: 'left'
  },
  {
    title: '性别',
    dataIndex: 'Ssex',
    key: 'Ssex'
  },
  {
    title: '年龄',
    dataIndex: 'Sage',
    key: 'Sage'
  },
  {
    title: '已修学分',
    dataIndex: 'Scredit',
    key: 'Scredit'
  },
  {
    title: '地区',
    dataIndex: 'Sregion',
    key: 'Sregion'
  },
  {
    title: '专业',
    dataIndex: 'Smajor',
    key: 'Smajor',
    width: '15%'
  },
  {
    title: '班级',
    dataIndex: 'SClass',
    key: 'SClass',
    width: '15%'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation'
  }
]
const keyword = ref('')
const loading = ref(true)
const dataSource = ref()
const current = ref(1)
const page = ref(1)
const size = ref(5)
const total = ref(0)
const getStudentList = (currentPage) => {
  loading.value = true
  http
    .post('/getStudentList', {
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
getStudentList(page.value)
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: size.value,
  showSizeChanger: false,
  position: ['bottomCenter']
}))

const handleTableChange = (changeObj) => {
  getStudentList(changeObj.current)
  pagination.value.current = changeObj.current
}

const showStuScore = (Sno, Sname) => {
  router.push({
    name: 'query-score',
    query: {
      sno: Sno,
      sname: Sname
    }
  })
}

const disabled = computed(() => {
  return !(keyword.value !== '')
})

const searchStu = () => {
  http
    .post('/getStuListByKeyword', {
      keyword: keyword.value
    })
    .then((response) => {
      if (response.code === 10000) {
        dataSource.value = response.data
        total.value = response.total
        message.success('查询成功')
      } else {
        message.warn('查无此学号')
      }
    })
    .catch((error) => {
      message.error('网络连接失败' + error)
    })
}

const refreshList = () => {
  getStudentList(page.value)
  keyword.value = ''
}
</script>

<style scoped>
.dataTable {
  margin-top: 10px;
}
</style>
