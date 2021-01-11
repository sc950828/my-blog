## git 知识点

[菜鸟教程 git 文档](https://www.runoob.com/git/git-tutorial.html)

[progit 文档](https://www.progit.cn/)

### 配置信息

Git 自带一个 git config 的工具来帮助设置控制 Git 外观和行为的配置变量。 这些变量存储在三个不同的位置：

/etc/gitconfig 文件: 包含系统上每一个用户及他们仓库的通用配置。 如果使用带有 --system 选项的 git config 时，它会从此文件读写配置变量。

~/.gitconfig 或 ~/.config/git/config 文件：只针对当前用户。 可以传递 --global 选项让 Git 读写此文件。

当前使用仓库的 Git 目录中的 config 文件（就是 .git/config）：针对该仓库。

每一个级别覆盖上一级别的配置，所以 .git/config 的配置变量会覆盖 /etc/gitconfig 中的配置变量。

### 生成 ssh

1. ssh-keygen -t rsa -C '1287530097@qq.com'
2. 密钥类型可以用 -t 选项指定。如果没有指定则默认生成用于 SSH-2 的 RSA 密钥。这里使用的是 rsa。
3. 同时在密钥中有一个注释字段，用-C 来指定所指定的注释，可以方便用户标识这个密钥，指出密钥的用途或其他有用的信息。所以在这里输入自己的邮箱或者其他都行。
4. 输入完毕后程序同时要求输入一个密语字符串(passphrase)，空表示没有密语。接着会让输入 2 次口令(password)，空表示没有口令。3 次回车即可完成当前步骤，此时`[c盘>用户>自己的用户名>.ssh]`目录下已经生成好了。
5. 登录 github。打开 setting->SSH keys，点击右上角 New SSH key，把生成好的公钥 id_rsa.pub 放进 key 输入框中，再为当前的 key 起一个 title 来区分每个 key。

### 用户信息

当安装完 Git 应该做的第一件事就是设置你的用户名称与邮件地址。 这样做很重要，因为每一个 Git 的提交都会使用这些信息，并且它会写入到你的每一次提交中，不可更改：

```shell
git config --global user.name "randy"
git config --global user.email randy@example.com
```

再次强调，如果使用了 --global 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情， Git 都会使用那些信息。 当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 --global 选项的命令来配置。

### 查看 git 配置

```
git 中 D 向下翻一行 F 向下翻页 B 向上翻页 Q 退出 上箭头向上翻一行 下箭头向下翻一行

查看系统配置

git config --list

查看某个配置

git config --get xxx(user.name) --get 可以省略

查看用户配置

cat ~/.gitconfig

查看当前项目的 git 配置

cat .git/config

查看 git 所有帮助命令

git --help -a

配置用户名和邮箱

git config --global user.name "用户名"

git config --global user.email "git 账号"

删除用户名或别名

git config --global --unset user.xxx

git config --global --unset alias.xx

配置别名

git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

### 初始化仓库

有两种取得 Git 项目仓库的方法。 第一种是在现有项目或目录下导入所有文件到 Git 中； 第二种是从一个服务器克隆一个现有的 Git 仓库。

在现有目录中初始化仓库

```
git init
```

克隆现有的仓库

```
git clone xxxx `[文件夹名]` 克隆的时候可以带上名字，为该项目另起名字。把远程仓库克隆下来。
```

### status

查看状态我们一般使用 git status

git status 命令的输出十分详细，但其用语有些繁琐。 如果你使用 git status -s 命令或 git status --short 命令，你将得到一种更为紧凑的格式输出。 运行 git status -s

新添加的未跟踪文件前面有 ?? 标记，新添加到暂存区中的文件前面有 A 标记，修改过的文件前面有 M 标记。 你可能注意到了 M 有两个可以出现的位置，出现在右边的 M 表示该文件被修改了但是还没放入暂存区，出现在靠左边的 M 表示该文件被修改了并放入了暂存区。 例如，上面的状态报告显示： README 文件在工作区被修改了但是还没有将修改后的文件放入暂存区,lib/simplegit.rb 文件被修改了并将修改后的文件放入了暂存区。 而 Rakefile 在工作区被修改并提交到暂存区后又在工作区中被修改了，所以在暂存区和工作区都有该文件被修改了的记录。

```
$ git status -s
 M README 修改过的文件前面有 M 标记
MM Rakefile
A  lib/git.rb 新添加到暂存区中的文件前面有 A 标记
M  lib/simplegit.rb
?? LICENSE.txt  新添加的未跟踪文件前面有 ?? 标记
```

### add rm

- 从工作区到提交到暂存区。
- git add 文件名 或者 . 或者 -A 或者 -u。 . 不包括删除(Git 2.0 以上版本支持了等价于 A) u 不包括新增(2.0 以下才有-u) A 是全部。
- git rm 文件名 删除工作区文件，并且将这次删除放入暂存区(已经在本地仓库的文件)。如果没有在本地仓库则需要先手动删除文件然后再使用 git rm 文件名。
- git rm --cached 文件名 停止追踪指定文件，但该文件会保留在工作区(当你忘记添加 .gitignore 文件 这个方法很有效)

### commit

- 把暂存区的文件提交到本地仓库。
- git commit 提交然后进入输入 message 的界面。输入完 message 后保存即提交成功。
- git commit -m 'message'。这种方式就是提交然后一并输入提交信息。
- git commit --amend 修改提交的 message。
  - 如果已经上传到远程仓库，修改完后需要强制提交。或者先拉取 merge 完然后再 push。区别是后者有两条提交信息。
  - 需要注意的有一点：commit --amend 并不是直接修改原 commit 的内容，而是生成一条新的 commit。把当前 commit 替换掉
- git commit -am 'add 和 commit 的合并，便捷写法，和 git add -u 命令一样，但是未跟踪的文件是无法提交上去的'

### diff

- gid diff 比较工作区和暂存区的不同。
- git diff HEAD 比较工作区和本地仓库的不同。
- git diff --staged(Git 1.6.1 及更高版本允许使用)/--cached 比较暂存区和本地仓库的不同。
- git diff commit1id..commit2id 比较两个 commit 的不同
- git diff branchname..branchname 查看两个本地分支所有的对比
- git diff branchname..branchname filename 查看两个本地分支中某一个文件的对比
- git diff origin/branchname..origin/branchname 查看远程分支和远程分支的对比
- git diff origin/branchname..branchname 查看远程分支和本地分支的对比

### 回退

- 撤销工作区 git checkout .撤销所有，或则 git checkout filename 撤销某个文件的改动。
- 撤销暂存区 git reset HEAD .撤销所有，或则 git reset HEAD filename 撤销某个文件的改动，改动返回工作区。
- 撤销版本库 git reset [--hard | --soft | --mixed] id/HEAD^
  - --hard 删除提交改动放弃掉，--soft 改动回退到暂存区，--mixed 改动回退到工作区(默认)。
  - id 为你想回到的那次 commit 的 id，或者使用 HEAD^回到上次提交的地方。

### push

- push 是把当前的分支上传到远程仓库，并把这个 branch 的路径上的所有 commits 也一并上传。
- git push origin 远程分支名 : 本地分支名 本地分支名可以省略。
- 你用不加参数的 git push 只能上传那些之前从远端 clone 下来或者 pull 下来的分支。
- 如果当前分支是一个本地创建的分支，需要指定远程仓库名和分支名，用 git push origin branch_name 的格式，而不能只用 git push；或者可以通过 git config 修改 push.default 来改变 push 时的行为逻辑。

### 忽略文件

一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。

文件 .gitignore 的格式规范如下：

1. 所有空行或者以 ＃ 开头的行都会被 Git 忽略。
2. 可以使用标准的 glob 模式匹配。
3. 匹配模式可以以（/）开头防止递归。
4. 匹配模式可以以（/）结尾指定目录。
5. 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

星号`*`匹配零个或多个任意字符；[abc] 匹配任何一个列在方括号中的字符（这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）；问号（?）只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如 [0-9] 表示匹配所有 0 到 9 的数字）。 使用两个星号`*` 表示匹配任意中间目录，比如`a/**/z` 可以匹配 a/z, a/b/z 或 `a/b/c/z`等。

```.gitignore
# no .a files
*.a

# but do track lib.a, even though you're ignoring .a files above
!lib.a

# only ignore the TODO file in the current directory, not subdir/TODO
/TODO

# ignore all files in the build/ directory
build/

# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt

# ignore all .pdf files in the doc/ directory
doc/**/*.pdf
```

### 日志

- git log 查看 log。
- git log --stat 查看简要统计。文件级别的显示。
- git log -p 查看 log 和这次提交的详细改动。你也可以加上 -2 (git log -p -2)来仅显示最近两次提交
- git show id 查看某次具体的提交改动。省略 commit id 展示最近的一次提交的改动。如果还要指定文件，在 git show 的最后加上文件名。
- git reflog 查看详细的 log。包括分支切换、代码合并等等操作。

### 分支

- git branch 查看本地拥有哪些分支。
- git branch -r 查看远程分支
- git branch -a 查看所有分支（包括远程分支和本地分支）
- git branch -av 查看所有分支并带上最新的提交信息
- git branch -vv 查看本地分支并带上最新的提交信息
- git branch -rv 查看远程分支并带上最新的提交信息
- git branch newbranchName 新建分支。
- git branch -d/-D 删除分支。
  - -D 是强制删除。当该分支有文件改动尚未提交可以使用该方式强制删除
  - HEAD 指向的 branch 不能删除。如果要删除 HEAD 指向的 branch，需要先用 checkout 把 HEAD 指向其他地方。
- git checkout branchName 切换到新分支。
- git checkout -b newbranchName 新建分支并切换到该分支。
- git branch -m oldbranchName newbranchName 修改分支名。
- git push origin :远程分支名或者 git push origin --delete 远程分支名 删除远程分支

### 暂存

- git stash 将所有未提交的修改（提交到暂存区）保存至堆栈中。
- git stash save "存储" 给本次存储加个备注，以防时间久了忘了
- git stash -u 存储未追踪的文件
- git stash list 查看暂存。
- git stash pop 提取最近的一次暂存并清除这次暂存。
- git stash pop stash@{n} 提取指定的暂存并清除该暂存。
- git stash apply stash@{n} 提取某次暂存，但是不清除这次暂存。
- git stash show stash@{n} 查看当前记录中修改了哪些文件
- git stash show -p stash@{n} 查看当前记录中修改了哪些文件的内容
- git stash drop stash@{n} 删除 stash 记录
- git stash clear 清除所有暂存。

### rebase

- rebase 解决完冲突后 add . 然后 rebase --continue 然后 push -f 强制提交。
- 任何时候可以使用 git rebase --abort 来放弃 rebase。
- git rebase 的时候会把提交信息一并拉过来。

### 交互式 rebase -i

- 可以修改不是第一条提交的 message。rebase -i HEAD^^。把需要修改的 commit 的 message 使用 edit/e 标识。
- 合并提交。rebase -i HEAD^^。把需要合并的 commit 的 message 用 squash/s 标识。
- 删除某次提交。rebase -i HEAD^^。把需要删除的 commit 的 message 去掉即可。
- 上面的 HEAD^^都是倒数第三次提交，这里用来举例子。不一定就是 HEAD^^。还可以使用分支,相对于分支 rebase -i 分支名，如果已经提交到远程仓库只需要-f 强制提交即可。

### revert

git revert HEAD 提交一个新的 commit 它的内容和最近的一个 commit 完全相反。

git revert commit_id 生成一个撤销指定提交版本的新提交

### cherry-pick

将指定的提交 commit 应用于当前分支（可以用于恢复不小心撤销（revert/reset）的提交）

git cherry-pick commit_id

git cherry-pick commit_id commit_id

git cherry-pick commit_id^..commit_id

### 远程仓库

git remote show origin(别名) 查看仓库详细信息(远程分支 本地分支 自动合并的分支)

git remote -v 查看当前仓库地址

git remote remove origin 移除远程仓库

git remote add origin 添加远程仓库地址 origin 只是远程仓库的别名可随意取。可以添加多个远程仓库。

git remote rename oldName newName 远程仓库的重命名

### HEAD

- HEAD 在 Git 中，它是一个指针，指向当前所在的本地分支（译注：将 HEAD 想象为当前分支的别名）
- HEAD 是指向当前分支的最近的一次 commit 的引用，它具有唯一性，每个仓库中只有一个 HEAD。在每次提交时它都会自动向前移动到最新的 commit。
- (HEAD -> 当前分支, origin/该分支对应远程哪个分支)
- 远程仓库的 HEAD 是永远指向默认分支（即 master）的最近的一次 commit。
- 远程 merge request 也会形成一个新的 commit。(比如 dev master 分支上就会有 merge 的提交。)

### 在 Git 中，有两个「偏移符号」： ^ 和 ~。

- ^ 的用法：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量。
  - 例如：master^ 表示 master 指向的 commit 之前的那个 commit；
  - HEAD^^ 表示 HEAD 所指向的 commit 往前数两个 commit。
- ~ 的用法：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数。
  - 例如：HEAD~5 表示 HEAD 指向的 commit 往前数 5 个 commit。

### git pull 和 git fetch 的区别

git fetch 只是将远程仓库的变化下载下来，并没有和本地分支合并。

git pull 会将远程仓库的变化下载下来，并和当前分支合并。

### git rebase 和 git merge 的区别

git rebase 和 git merge 都是用于分支合并，关键在 commit 记录的处理上不同。

git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会保留之前每个分支的 commit 历史。

git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，然后将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记录了。

### pre-commit

pre-commit 就是在代码提交之前做些东西，比如代码打包，代码检测，称之为钩子（hook）
在 commit 之前执行一个函数（callback）。这个函数成功执行完之后，再继续 commit，但是失败之后就阻止 commit
在 .git->hooks->下面有个 pre-commit.sample，这个里面就是默认的函数(脚本)样本

安装 pre-commit

npm install pre-commit --save-dev

在 package.json 里面配置 commit 之前会执行 npm run lint

```json
"pre-commit": [
  "lint"
]
```

跳过验证

git commit --no-verify

git commit -n

### husky 和 lint-staged

husky 和 pre-commit 类似，在 commit 前进行代码的验证，验证通过后才会提交代码。

lint-staged 是一个只在已经修改过的文件进行校验的工具

```js
// 安装
npm i husky lint-staged -D

// 在scripts 对象中增加 husky 能识别的 Git Hooks 脚本 在commit或push之前会自动执行对应的前置脚本
"scripts": {
  "precommit": "npm run lint",
  "prepush": "npm run test"
}

// 但是在大型项目、遗留项目中接入过 lint 工作流的同学可能深有体会，每次提交代码会检查所有的代码，
// 可能比较慢就不说了，接入初期 lint 工具可能会报告几百上千个错误，这时候估计大多数人内心是崩溃的，
// 尤其是当你是新规范的推进者，遇到的阻力会增大好几倍，毕竟大多数人不愿意背别人的锅，坏笑。
// 我们有 lint-staged 来缓解这个问题，每个团队成员提交的时候，只检查当次改动的文件
  "scripts": {
    "precommit": "lint-staged",
    "prepush": "npm run test"
  },
  "lint-staged": {
    "*.js": "eslint",
    "*.less": "stylelint",
    "*.css": "stylelint",
    "*.json": "jsonlint --quiet",
    "*.md": "markdownlint --config .markdownlint.json"
  }
```

### tag（下面的 v1.0 代表 tagName）

列出已有 tag

git tag

新建 tag

git tag v1.0

新建带有备注信息的 tag

git tag -a v1.0 -m 'comment'

查看 tag 详情 可以利用 tag 的 commitId 进行代码的回滚

git show v1.0

给指定的某个 commit 号加 tag

git tag -a v1.0 -m commitId 'comment'

把 tag 推送到远端

git push origin v1.0

把所有不存在的 tag 推送到远程

git push origin --tags

本地删除某个 tag

git tag -d v1.0

本地删除 tag 后 push 到远端

git push origin :refs/tags/v1.0

切换到某个 tag 跟分支一样，可以直接切换到某个 tag 去。这个时候不位于任何分支，处于游离状态，可以考虑基于这个 tag 创建一个分支。

git checkout v1.0

### 大小写

默认情况下 git 是忽略区分大小写的，多人合作的情况下不规范很容易造成问题，所以开启区分大小写。可以使用 git config --list 查看 git 配置

开启不忽略大小写

```
git config core.ignorecase false
```

### git 中修改.gitignore 文件不起作用的解决

如果以前在 git 的管理中现在不想管理了想忽略我们可以修改.gitignore 文件，把规则添加进去，但是我们发现简单添加规则是不起作用的。因为这个文件已经被管理了所以简单的配置已经不行了。

我们需要使用 git rm -r --cached . 来删除 git 的缓存。.表示所有文件 我们也可以使用具体的路径。删除缓存后我们可以再使用 add .添加再提交就可以了。
