# 蛋黄康复工作室跨端 Demo

项目已迁移为 uni-app Vue 3 架构，同一套页面与业务逻辑可构建为 Web/H5 和微信小程序。

## 目录

- `uniapp/src/pages/index/index.vue`：客户、康复师、管理员三类界面与交互
- `uniapp/src/data/demo.js`：当前演示数据，后续可替换为业务 API
- `uniapp/src/manifest.json`：Web 与微信小程序平台配置
- `build.mjs`：将 H5 产物封装为 ChatGPT Sites Worker

## 本地开发

```bash
npm --prefix uniapp install
npm run dev:h5
```

## 构建 Web

```bash
npm run build
```

Web 构建产物会被封装到 `dist/server/index.js`，用于当前 ChatGPT Sites 部署。

## 构建微信小程序

1. 在 `uniapp/src/manifest.json` 的 `mp-weixin.appid` 中填写正式小程序 AppID。
2. 执行：

```bash
npm run build:mp-weixin
```

3. 在微信开发者工具中导入 `uniapp/dist/build/mp-weixin`。

当前微信登录与手机号授权已提供平台入口。正式上线时，必须由后端使用 `uni.login` 返回的 code 建立会话，并使用 `getPhoneNumber` 返回的动态 code 换取手机号；不要在前端保存 AppSecret 或自行解密敏感数据。

## 数据说明

当前内容全部为 Demo 数据，预约和训练完成状态保存在本机存储中。正式上线时建议将客户、授权记录、关注问题、服务记录、预约、居家训练和反馈接入统一业务数据库，并在后端实施客户、康复师、管理员三级权限控制。
