### 优力普前端基础库



#### 🎈使用教程

------

##### 1.package.json文件添加

```json

  "dependencies": {
  		"common":"https://gitlab.unipoe/front/common.git",

        //指定版本
  		"common":"https://gitlab.unipoe/front/common.git#1.0.0"
  }
```

##### 2.执行命令yarn 或 npm i  front-common

##### 3.更新库

```
yarn upgrade common
```



#### 📌注意事项

- 项目环境 typescript >= 4.9.4



#### 📋内置方法

------



- object
  - DeepClone 深拷贝
  - Queue（class）  队列处理类
    - Exec   接受一个异步函数，并在本队列中顺序执行
- cache
  - CacheSet    设置一个缓存
  - CacheGet   获取一个缓存
- string
  - FormatBlankByString      格式化字符串
  - CopyString                         复制文本到粘贴板
- file
  - Download   创建一个a标签来下载文件
  - ChooseFile  选择文件-返回文件
- time
  - GetDuration      把秒转化为 xx天xx时xx秒
  - Sleep                   实现类似线程睡眠，本质是setTimeout
  - GetCurrentDay  获取当前天
  - GetMonthFirst   获取本月第一天
- http
  - Http	对axios的进一步封装；