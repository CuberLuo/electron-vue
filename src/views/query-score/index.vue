<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="`${sname}成绩查询`"
      :sub-title="sno"
    >
      <template #extra>
        <a-button type="primary" ghost @click="routerBack">返回</a-button>
      </template>
    </a-page-header>
    <div class="searchBox">
      <a-select
        ref="select"
        v-model:value="selectedValue"
        style="width: 120px"
        :options="options"
      ></a-select>

      <a-button
        type="primary"
        class="searchBtn"
        @click="showStuScore"
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
      :scroll="{ x: 900, y: 2000 }"
      bordered
      class="dataTable"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'Teachers'">
          <a-tag
            v-for="Teacher in record.Teachers"
            :key="Teacher"
            color="geekblue"
          >
            {{ Teacher }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'Score' && record.Score < 60">
          <span style="color: red">
            {{ record.Score }}
          </span>
        </template>
        <template v-else-if="column.key === 'operation'">
          <a-button
            type="primary"
            ghost
            style="display: inline-block"
            @click="showStuScore(record.Sno, record.Sname)"
            >班级排名查询</a-button
          >
          <a-button
            type="primary"
            ghost
            style="display: inline-block; margin-left: 20px"
            @click="showStuScore(record.Sno, record.Sname)"
            >课程平均分查询</a-button
          >
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import router from '@/router'
import { HttpRequest } from '@/utils/httpRequest'

export default defineComponent({
  name: 'query-score',
  components: {
    SearchOutlined
  },
  setup() {
    const loading = ref(false)
    const dataSource = ref()
    const http = new HttpRequest()
    const route = useRoute()
    const columns = [
      {
        title: '课程代码',
        dataIndex: 'Cno',
        key: 'Cno',
        width: '12%'
      },
      {
        title: '课程名称',
        dataIndex: 'Cname',
        key: 'Cname',
        width: '20%'
      },
      {
        title: '成绩',
        dataIndex: 'Score',
        key: 'Score',
        width: '8%'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation'
      },

      {
        title: '任课教师',
        dataIndex: 'Teachers',
        key: 'Teachers',
        width: '18%'
      }
    ]
    const options = ref([
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
    const selectedValue = ref('请选择学年')

    const sno = ref(route.query.sno) // 获取路由参数中的学号
    const sname = ref(route.query.sname)
    const routerBack = () => {
      router.push('/students-manage')
    }

    const showStuScore = () => {
      loading.value = true
      const data = {
        Sno: sno.value,
        ScoreYear: selectedValue.value
      }

      http
        .post('/getStuScore', data)
        .then((response) => {
          dataSource.value = response.data
          loading.value = false
        })
        .catch((error) => {
          message.error('网络连接失败' + error)
          loading.value = false
        })
    }

    const disabled = computed(() => {
      return !(selectedValue.value !== '请选择学年')
    })

    return {
      sno,
      sname,
      routerBack,
      options,
      selectedValue,
      loading,
      dataSource,
      columns,
      showStuScore,
      disabled
    }
  }
})
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
  /* max-height: 200px; */
}
</style>
