<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="`${tname}任课情况查询`"
      :sub-title="tno"
    >
      <template #extra>
        <a-button type="primary" ghost @click="routerBack">返回</a-button>
      </template>
    </a-page-header>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      :loading="loading"
      :scroll="{ y: 2000 }"
      bordered
      class="dataTable"
    >
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'

import router from '@/router'
import { HttpRequest } from '@/utils/httpRequest'

export default defineComponent({
  name: 'query-score',

  setup() {
    const loading = ref(true)
    const dataSource = ref()
    const http = new HttpRequest()
    const route = useRoute()
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

    const tno = ref(route.query.tno) // 获取路由参数中的教师编号
    const tname = ref(route.query.tname)
    const routerBack = () => {
      router.push('/teachers-manage')
    }
    const getCourses = () => {
      http
        .post('/getCoursesByTno', {
          Tno: tno.value
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
    getCourses()

    return {
      tno,
      tname,
      routerBack,
      loading,
      dataSource,
      columns
    }
  }
})
</script>

<style scoped>
.dataTable {
  margin-top: 10px;
}
</style>
