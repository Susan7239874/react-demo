# react-demo
一个react hooks 的响应式网页

### npm install 安装依赖

### npm run start 启动项目

### 本地地址调试地址为 http://localhost:3000/Home

 src/utis下的的request.js中有baseUrl，对dev和pro环境进行设置

 src/views/Home.js中await mockRequest方法是模拟获取分页的api,对sec/api/server.js中的api地址进行修改后可使用getToken、getProductList方法

src/utils/viewportContext的方法是用于全局实时获取网页的宽度，对各个组件进行样式的响应式变化
