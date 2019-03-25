'use strict';

var yargs = require('yargs');
var fs = require('fs');
var fontMapper = require('./src/fontMapper');

// 设置命令参数
var argv = yargs
    .usage('font-mapper [options]')
    .alias('v', 'version')
    .alias('h', 'help')
    .describe('help', '输出帮助信息')
    .describe('version', '输出版本信息')
    .describe('f', '根据css文件输出包含所有图标映射信息的json文件')
    .nargs('f', 1)
    .argv;

// 解析css文件

var file = argv.f;
file && fontMapper(file);

// console.log(process.argv);