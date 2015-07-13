# handlebars-helper-is

一个 [handlebars.js](https://github.com/wycats/handlebars.js) 的 `is` helper 实现.

兼容 handlebars v1.1.0 以上版本

## 用法

比较两个参数是否相等，非严格模式： 5 == "5"

```
{{#is x y}} ... {{else}} ... {{/is}}
```

已经内置的几个语法:

* `in` (检查值是否在一组数据中，第三个参数是一个以逗号分隔的字符串或数组)

```
// 宽松的相等比较
{{#is x y}} ... {{else}} ... {{/is}}

// 判断 x 是否存在与数组中
{{#is x "in" "foo,bar"}} ... {{else}} ... {{/is}}
{{#is x "in" anArray}} ... {{else}} ... {{/is}}
// anArray = [1,3,4,5]
```

## LICENSE
The MIT License (MIT)

## 感谢
本项目在 [https://github.com/danharper/Handlebars-Helpers/tree/v1.1.0/](https://github.com/danharper/Handlebars-Helpers/tree/v1.1.0/) 的基础上进行开发
