const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: '高校成绩管理系统',
        appId: 'cn.edu.zjut.electron-dbProject',
        win: {
          icon: 'build/icons/zjut.ico'
        }
      }
    }
  }
})
