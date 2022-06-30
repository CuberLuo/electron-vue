<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="班级课程查询"
    />
    <div class="searchBox">
      <a-select
        ref="select"
        v-model:value="selectedValue1"
        style="min-width: 250px"
        :options="options1"
      ></a-select>
      <a-select
        ref="select"
        v-model:value="selectedValue2"
        style="width: 120px; margin-left: 20px"
        :options="options2"
      ></a-select>
      <a-button
        type="primary"
        class="searchBtn"
        @click="showClassCourse"
        :disabled="disabled"
      >
        <template #icon><SearchOutlined /></template>
        查询
      </a-button>
    </div>

    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      :loading="loading"
      :scroll="{ x: 800, y: 2000 }"
      bordered
      class="dataTable"
    >
    </a-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { HttpRequest } from '@/utils/httpRequest'
const http = new HttpRequest()
const selectedValue1 = ref('请选择')
const selectedValue2 = ref('请选择学年')
const loading = ref(false)
const dataSource = ref()
const options1 = ref([])
const options2 = ref([
  {
    value: 'to',
    label: '全部'
  },
  {
    value: '21to22',
    label: '2021-2022'
  },
  {
    value: '20to21',
    label: '2020-2021'
  },
  {
    value: '19to20',
    label: '2019-2020'
  }
])
const columns = [
  {
    title: '课程代码',
    dataIndex: 'Cno',
    key: 'Cno'
  },
  {
    title: '课程名称',
    dataIndex: 'Cname',
    key: 'Cname'
  },
  {
    title: '开课学期',
    dataIndex: 'CTerm',
    key: 'CTerm'
  },
  {
    title: '学时',
    dataIndex: 'Chour',
    key: 'Chour'
  },
  {
    title: '考核方式',
    dataIndex: 'Cway',
    key: 'Cway'
  },
  {
    title: '学分',
    dataIndex: 'Ccredit',
    key: 'Ccredit'
  }
]
const disabled = computed(() => {
  return !(
    selectedValue1.value !== '请选择' && selectedValue2.value !== '请选择学年'
  )
})
const getAllClass = () => {
  http
    .get('/getAllClass')
    .then((response) => {
      options1.value = response.data
    })
    .catch((error) => {
      message.error('网络连接失败' + error)
    })
}
getAllClass()
const showClassCourse = () => {
  loading.value = true
  http
    .post('/getClassCourse', {
      clno: selectedValue1.value,
      year: selectedValue2.value
    })
    .then((response) => {
      dataSource.value = response.data
      loading.value = false
    })
    .catch((error) => {
      message.error('网络连接失败' + error)
      loading.value = false
    })
}
</script>

<style scoped>
.searchBox {
  margin-top: 10px;
}
.searchBtn {
  margin-left: 20px;
}

.dataTable {
  margin-top: 10px;
}
</style>
