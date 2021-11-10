# vue3-template

[vite + vue3模板](https://github.com/connectshark/vite-template)

開發vue3使用的快速模板

## 專案已包含內容

### 插件

- vue cli
- vue3
- vue-router
- vuex
- vue-i18n

### cdn

- [boxicon](https://boxicons.com/)
- Roboto Mono字型
- Noto Sans TC字型

### github

- github action自動部署置`gh-page`

## 使用template首次設定

你可以點選 `use this template` 直接將此模板複製到自己的github上

接者你需要手動修改幾個部分

### 1. 專案更名

- `package.json`中的專案名稱
- `package-lock.json`中的專案名稱
- `vue.config.js`中的`publicPath`
主要是把專案名稱命名為自訂的專案名稱

### 2. 推上github後開啟專案page的功能

`setting` -> `page` -> `source` -> 選擇 `gh-page`