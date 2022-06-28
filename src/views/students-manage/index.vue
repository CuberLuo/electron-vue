<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
    bordered
  >
  </a-table>
</template>

<script setup>
import { computed } from 'vue'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '20%'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '20%'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
]

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

const pagination = computed(() => ({
  total: 200,
  current: 1,
  pageSize: 10
}))

const handleTableChange = (pag) => {
  console.log(pag)
}
</script>

<style scoped></style>
