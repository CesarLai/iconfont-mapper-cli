# Iconfont Mapper CLI
一个Iconfont图标映射文件生成工具。

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## 介绍
Iconfont平台是目前深受前端工程师喜爱的一个矢量图标管理平台，在上面可以轻松获取和管理图标。在移动端使用Iconfont的图标时，经常需要json格式的图标映射文件，而从Iconfont下载的字体文件中，并不包含这样的文件。因此，这个工具的作用就是通过读取Iconfont字体压缩文件中的css文件内容，生成我们需要的图标映射文件。

iconfont.css
```css
.icon-select:before {
  content: "\e622";
}

.icon-user:before {
  content: "\e624";
}

.icon-switch:before {
  content: "\e625";
}

.icon-search:before {
  content: "\e626";
}
```

生成的图标映射文件：iconfont.json
```json
{
    "icon-select": 58914,
    "icon-user": 58916,
    "icon-switch": 58917,
    "icon-search": 58918
}
```

## 快速上手
建议在Node.js v8.x或以上版本使用此命令行工具。
```bash
# 安装命令行工具
$ npm install -g iconfont-mapper-cli

# 使用当前目录的css文件生成json文件
$ iconfont-mapper -f iconfont.css
输出路径：./iconfont.json

# 使用指定目录的css文件生成json文件
$ iconfont-mapper -f C:\Users\Administrator\Downloads\iconfont.css
输出路径：C:\Users\Administrator\Downloads\iconfont.json

# 使用指定目录的css文件生成json文件，并保存到指定的输出路径
$ iconfont-mapper -f C:\Users\Administrator\Downloads\iconfont.css -o C:\Users\Administrator\Desktop
输出路径：C:\Users\Administrator\Desktop\iconfont.json
```

[npm-image]: https://img.shields.io/npm/v/iconfont-mapper-cli.svg
[npm-url]: https://www.npmjs.com/package/iconfont-mapper-cli
[downloads-image]: https://img.shields.io/npm/dm/iconfont-mapper-cli.svg
[downloads-url]: https://www.npmjs.com/package/iconfont-mapper-cli