// 文件管理对象
var fs = require('fs');

function fontMapper(path) {
    fs.readFile(path, 'utf8', (error, content) => {
        if (error) {
            console.log(error.message);
            return;
        };

        var regex = /\.(icon-[a-z-]+)(:\w+)?\s*{\s*\w+:\s*\"(\\\w{4})\";\s*}/g;
        var results = content.match(regex);
        var jsonObject = {};

        if (results && results.length > 0) {
            for (var item of results) {
                // 匹配图标名和图标对应的16进制数，并保存到用于生成json字符串的对象中
                var iconNameRegex = /icon-[a-z-]+/g,
                    iconValueRegex = /\\\w{4}/g;


                var iconNames = item.match(iconNameRegex),
                    iconValues = item.match(iconValueRegex);
                // 图标名和图标对应的16进制值都匹配成功
                if (iconNames && iconNames.length > 0 && iconValues && iconValues.length > 0) {
                    jsonObject[iconNames[0]] = parseInt(iconValues[0].substring(1), 16);
                }
            }

            // 输出json文件
            fs.writeFile('Iconfont.json', JSON.stringify(jsonObject), 'utf8', (error) => {
                if (error) {
                    console.log(`json文件生成失败，原因：${error.message}`);
                } else {
                    console.log('json文件生成成功');
                }
            });
        } else {
            console.log('导入文件格式不正确');
        }
    });
}

module.exports = fontMapper;