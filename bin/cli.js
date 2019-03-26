#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var os = require('os');
var yargs = require('yargs');

// 文件输出目录
var OUTPUT_FILE_DIR = path.join(os.homedir(), 'Downloads');

// 设置命令参数
var argv = yargs
    .usage('Usage: iconfont-mapper [options]')
    .options({
        'help': {
            alias: 'h',
            describe: '输出帮助信息',
        },
        'version': {
            alias: 'v',
            describe: '输出版本信息'
        },
        'file': {
            alias: 'f',
            describe: '根据包含图标样式的css文件生成包含所有图标映射信息的json文件',
            nargs: 1,
            type: 'string'
        }
    })
    .argv;

argv.f && fontMapper(argv.f);

/**
 * 
 * @param {string} filePath 
 */
function fontMapper(filePath) {
    if (path.extname(filePath) !== '.css') {
        console.log('文件格式不正确，请输入css文件的路径。');
        return;
    }

    // 记录css文件名，用于为输出的json文件命名
    var baseName = path.basename(filePath, '.css') + '.json';
    fs.readFile(filePath, 'utf8', (error, content) => {
        if (error) {
            console.log(error.message);
            return;
        };

        // 匹配单个图标css样式文本的正则表达式
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
            var outputFileFullPath = path.join(OUTPUT_FILE_DIR, baseName);
            fs.writeFile(outputFileFullPath, JSON.stringify(jsonObject), 'utf8', (error) => {
                if (error) {
                    console.log(`json文件生成失败，原因：${error.message}。`);
                } else {
                    console.log(`json文件生成成功：${outputFileFullPath}`);
                }
            });
        } else {
            console.log('未匹配到任何图标。');
        }
    });
}