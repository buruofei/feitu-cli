# feituCli

一个快速上手的前端脚手架, 轻松创建项目模板, 实现0配置, 快速开发。

## Installation & Quick start

### 安装

Windows系统安装
```
$ npm i feitu-tool-cli -g
```

Mac下安装
```
$ sudo npm i feitu-tool-cli -g
```

### 查看帮助信息

```
$ feitu
```


### 创建项目

```
# 指定项目名字创建项目
$ feitu create 模板名<template-name> 项目名字<project-name>

# 在当前目录创建项目
$ feitu create 模板名<template-name> .
```

### 查看所有支持的项目模板

```
$ feitu list
```

### 添加项目模板

```
$ feitu add 模板名<template-name> 模板github仓库地址,支持ssh/https格式<git-repo-address>
```

### 删除项目模板

```
$ feitu delete 模板名<template-name>
```

### 发布到npm

执行pkg下的脚本, 自动发版并且生成changelog, travis就会执行检测后续自动发到npm.
```
npm run release
```


## Changelog

[Changelog]

## TODOLIST
