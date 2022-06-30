<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="学生地区分布"
    />
    <div id="main"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { message } from 'ant-design-vue'
import * as echarts from 'echarts'
import { HttpRequest } from '@/utils/httpRequest'
const http = new HttpRequest()

onMounted(() => {
  let regionData = []

  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('main'))
  // 初始化图表(此时无数据)
  myChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '总人数',
        type: 'pie',
        radius: ['40%', '70%'],
        data: []
      }
    ]
  })

  http
    .get('/getStuRegion')
    .then((response) => {
      regionData = response.data
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '总人数',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: regionData
          }
        ]
      })
    })
    .catch((error) => {
      message.error('网络连接失败' + error)
    })
})
</script>

<style scoped>
#main {
  height: 500px;
  width: 500px;
  margin: 0 auto;
}
</style>
