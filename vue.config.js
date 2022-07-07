const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: '高校成绩管理系统1',
        appId: 'cn.edu.zjut.electron-dbProject1',
        copyright: 'Copyright © 2022',
        win: {
          icon: 'build/icons/Web.ico',
          target: [
            {
              target: 'nsis', // 利用nsis制作安装程序
              arch: ['x64']
            }
          ]
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: 'build/icons/Web.ico', // 安装图标
          uninstallerIcon: 'build/icons/Web.ico', // 卸载图标
          installerHeaderIcon: 'build/icons/Web.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true // 创建开始菜单图标
        }
      }
    }
  }
})
