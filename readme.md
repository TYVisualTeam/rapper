# @ty-bct-modules/service-gen

基于 rapper 增加动态参数验证，mock 数据切换等功能

## 安装

```bash
tyarn add @ty-bct-modules/service-gen
```

or

```bash
tnpm install @ty-bct-modules/service-gen
```

## 使用

在 http://api.tongyu.tech:3000/ 注册用户后，新建仓库，编写接口，完成上述步骤后，在接口详情页面找到 `试试点这里帮你生成 TypeScript 代码`

![](http://gitlab2.tongyu.tech/tongyu-fe/rapper/raw/master-inner/assets/2020-07-13-10-50-47.png)

从脚本中获取参数，填写到 `package.json` 中到 rapper 字段

```json
"rapper": "rapper --type normal --rapperPath \"src/rapper\" --apiUrl \"http://api.tongyu.tech:38080/repository/get?id=19&token=sb-35plMu0Iln0aqVz8CXwM53zA5hNXF\" --rapUrl \"http://api.tongyu.tech:3000\""
```

package.json

```json
"rapper": {
    "type": "normal",
    "rapUrl": "http://api.tongyu.tech:3000",
    "apiUrl": "http://api.tongyu.tech:38080/repository/get?id=19&token=sb-35plMu0Iln0aqVz8CXwM53zA5hNXF",
    "rapperPath": "src/__apis__",
    "typeRef": "import { ResponseData, ResultData, BCTAPIData } from \"@ty-bct-modules/request\";",
    "resSelector": "type ResSelector<T extends BCTAPIData> = ResponseData<ResultData<T>>"
}
```

添加 scripts 命令

```json
"service-gen": "service-gen"
```

执行构建，生成 `src/__apis__`，自定义请求请参考[这里](https://www.yuque.com/rap/rapper/user-fetch)

## 其他

[历史文档查看](http://gitlab2.tongyu.tech/tongyu-fe/rapper/blob/master-inner/readme.md)
