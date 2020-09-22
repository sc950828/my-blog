### GitHub Actions 是什么？

大家知道，持续集成由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。GitHub 把这些操作就称为 actions。

GitHub 做了一个官方市场，可以搜索到他人提交的 actions 链接是https://github.com/actions

使用 userName/repoName 的语法引用 action。比如，actions/setup-node 就表示 github.com/actions/setup-node 这个仓库，它代表一个 action，作用是安装 Node.js。

```
actions/setup-node@74bc508 # 指向一个 commit
actions/setup-node@v1.0 # 指向一个标签
actions/setup-node@master # 指向一个分支
```

### 基本概念

GitHub Actions 有一些自己的术语。

（1）workflow （工作流程）：持续集成一次运行的过程，就是一个 workflow。

（2）job （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。

（3）step（步骤）：每个 job 由多个 step 构成，一步步完成。

（4）action （动作）：每个 step 可以依次执行一个或多个命令（action）。

### workflow 文件

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的.github/workflows 目录。

workflow 文件采用 YAML 格式，文件名可以任意取，但是后缀名统一为.yml，比如 foo.yml。一个库可以有多个

workflow 文件。GitHub 只要发现.github/workflows 目录里面有.yml 文件，就会自动运行该文件。

### workflow 文件 常用参数

1. name

name 字段是 workflow 的名称。如果省略该字段，默认为当前 workflow 的文件名。

2. on

on 字段指定触发 workflow 的条件，通常是某些事件。

on: push # push 事件触发 workflow。也可已是数组 on: [push, pull_request]

3. jobs.job_id.name

workflow 文件的主体是 jobs 字段，表示要执行的一项或多项任务。

```
jobs:
  my_first_job:
    name: My first job
  my_second_job:
    name: My second job
```

4. jobs.job_id.needs

needs 字段指定当前任务的依赖关系，即运行顺序。

```
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```

5. jobs.job_id.runs-on

runs-on 字段指定运行所需要的虚拟机环境。它是必填字段。目前可用的虚拟机如下。

```
ubuntu-latest，ubuntu-18.04或ubuntu-16.04
windows-latest，windows-2019或windows-2016
macOS-latest或macOS-10.14
```

6. jobs.job_id.steps

steps 字段指定每个 Job 的运行步骤，可以包含一个或多个步骤。每个步骤都可以指定以下字段。

```
jobs.<job_id>.steps.name：步骤名称。
jobs.<job_id>.steps.run：该步骤运行的命令或者 action。
jobs.<job_id>.steps.env：该步骤所需的环境变量。
jobs.<job_id>.steps.uses：该步骤所需要使用的action
```

### 项目部署

1. 在个人设置(setting)里面左侧菜单栏找到 Developer settings 菜单
2. 在 Personal access token 里面创建自己的 ACCESS_TOKEN
3. 在博客项目的 Settings 的左侧菜单栏找到 Secrets 配置好刚创建的 token，名字叫 ACCESS_TOKEN
4. 编辑 workflows 文件 在我们 push 到 master 分支的时候自动部署

```
name: my-blog-deploy
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master

      - name: Install and Build
        run: |
          npm install
          npm run build

      - name: Build and Deploy
        uses: JamesIves/github-pages-deploy-action@3.6.1
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: docs/.vuepress/dist

```

5. 在项目的 settings 里面左侧菜单栏找到 Options 菜单 找到 GitHub Pages 配置 gh-pages 分支
6. 我们就能通过[userName].github.io/项目名访问我们的项目了
