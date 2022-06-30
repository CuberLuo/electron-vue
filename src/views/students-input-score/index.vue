<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="学生成绩录入"
    />
    <div class="dataBox">
      <a-form
        ref="formRef"
        :model="formState"
        name="normal_scoreInput"
        class="scoreInput-form"
        @finish="onFinish"
      >
        <a-form-item
          label="学号"
          name="sno"
          :rules="[{ required: true, message: '请输入学号!' }]"
        >
          <a-input v-model:value="formState.sno" />
        </a-form-item>
        <a-form-item
          label="课程编号"
          name="cno"
          :rules="[{ required: true, message: '请输入课程编号!' }]"
        >
          <a-input v-model:value="formState.cno" />
        </a-form-item>
        <a-form-item
          label="成绩"
          name="score"
          :rules="[{ required: true, message: '请输入成绩!' }]"
        >
          <a-input-number
            v-model:value="formState.score"
            :min="0"
            :max="100"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item
          label="学年"
          name="year"
          :rules="[{ required: true, message: '请选择学年!' }]"
        >
          <a-select
            ref="select"
            v-model:value="formState.year"
            style="width: 295px"
            :options="options"
          ></a-select>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="confirmBtn"
            >确认录入</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { HttpRequest } from '@/utils/httpRequest'
const http = new HttpRequest()
const formRef = ref()
const formState = reactive({
  sno: '',
  cno: '',
  score: '',
  year: ''
})

const options = ref([
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

const onFinish = (values) => {
  http
    .post('/submitStuScore', values)
    .then((data) => {
      if (data.code === 10000) {
        message.success('学生成绩录入成功')
        formRef.value.resetFields()
      } else {
        message.error('学生成绩录入失败')
      }
    })
    .catch((error) => {
      message.error('网络连接失败' + error)
    })
}
</script>

<style scoped>
.dataBox {
  width: 350px;
  margin: 0 auto;
  margin-top: 80px;
}

.confirmBtn {
  width: 100%;
}
</style>
