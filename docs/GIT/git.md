### 1、生成 ssh

- ssh-keygen -t rsa -C '1287530097@qq.com'
- 密钥类型可以用 -t 选项指定。如果没有指定则默认生成用于 SSH-2 的 RSA 密钥。这里使用的是 rsa。
- 同时在密钥中有一个注释字段，用-C 来指定所指定的注释，可以方便用户标识这个密钥，指出密钥的用途或其他有用的信息。所以在这里输入自己的邮箱或者其他都行。
- 输入完毕后程序同时要求输入一个密语字符串(passphrase)，空表示没有密语。接着会让输入 2 次口令(password)，空表示没有口令。3 次回车即可完成当前步骤，此时`[c盘>用户>自己的用户名>.ssh]`目录下已经生成好了。
- 登录 github。打开 setting->SSH keys，点击右上角 New SSH key，把生成好的公钥 id_rsa.pub 放进 key 输入框中，再为当前的 key 起一个 title 来区分每个 key。

### 2、克隆

git clone xxxx `[文件夹名]` 克隆的时候可以带上名字，为该项目另起名字。把远程仓库克隆下来。

### 3、add rm

- 从工作区到提交到暂存区。
- git add 文件名 或者 . 或者 -A 或者 -u。 . 不包括删除(Git 2.0 以上版本支持了等价于 A) u 不包括新增(2.0 以下才有-u) A 是全部。
- git rm 文件名 删除工作区文件，并且将这次删除放入暂存区
- fit rm --cached 文件名 停止追踪指定文件，但该文件会保留在工作区

### 4、commit

- 把暂存区的文件提交到本地仓库。
- git commit 提交然后进入输入 message 的界面。输入完 message 后保存即提交成功。
- git commit -m 'message'。这种方式就是提交然后一并输入提交信息。
- git commit --amend 修改提交的 message。
  - 如果已经上传到远程仓库，修改完后需要强制提交。或者先拉取 merge 完然后再 push。区别是后者有两条提交信息。
  - 需要注意的有一点：commit --amend 并不是直接修改原 commit 的内容，而是生成一条新的 commit。把当前 commit 替换掉
- git commit -am 'add 和 commit 的合并，便捷写法，和 git add -u 命令一样，但是未跟踪的文件是无法提交上去的'

### 5、diff

- gid diff 比较工作区和暂存区的不同。
- git diff HEAD 比较工作区和本地仓库的不同。
- git diff --staged/--cached 比较暂存区和本地仓库的不同。
- git diff commit1id..commit2id 比较两个 commit 的不同
- git diff branchname..branchname 查看两个本地分支所有的对比
- git diff branchname..branchname filename 查看两个本地分支中某一个文件的对比
- git diff origin/branchname..origin/branchname 查看远程分支和远程分支的对比
- git diff origin/branchname..branchname 查看远程分支和本地分支的对比

### 6、回退

- 撤销工作区 git checkout .撤销所有，或则 git checkout filename 撤销某个文件的改动。
- 撤销暂存区 git reset HEAD .撤销所有，或则 git reset HEAD filename 撤销某个文件的改动，改动返回工作区。
- 撤销版本库 git reset [--hard | --soft | --mixed] id/HEAD^
  - --hard 删除提交改动放弃掉，--soft 改动回退到暂存区，--mixed 改动回退到工作区(默认)。
  - id 为你想回到的那次 commit 的 id，或者使用 HEAD^回到上次提交的地方。

### 7、push

- push 是把当前的分支上传到远程仓库，并把这个 branch 的路径上的所有 commits 也一并上传。
- git push origin 远程分支名 : 本地分支名 本地分支名可以省略。
- 你用不加参数的 git push 只能上传那些之前从远端 clone 下来或者 pull 下来的分支。
- 如果当前分支是一个本地创建的分支，需要指定远程仓库名和分支名，用 git push origin branch_name 的格式，而不能只用 git push；或者可以通过 git config 修改 push.default 来改变 push 时的行为逻辑。

### 8、日志

- git log 查看 log。
- git log --stat 查看简要统计。文件级别的显示。
- git log -p 查看 log 和这次提交的详细改动。
- git show id 查看某次具体的提交改动。省略 commit id 展示最近的一次提交的改动。如果还要指定文件，在 git show 的最后加上文件名。
- git reflog 查看详细的 log。包括分支切换、代码合并等等操作。

### 9、分支

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

### 10、暂存

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

### 11、rebase

- rebase 解决完冲突后 add . 然后 rebase --continue 然后 push -f 强制提交。
- 任何时候可以使用 git rebase --abort 来放弃 rebase。
- git rebase 的时候会把提交信息一并拉过来。

### 12、交互式 rebase -i

- 可以修改不是第一条提交的 message。rebase -i HEAD^^。把需要修改的 commit 的 message 使用 edit/e 标识。
- 合并提交。rebase -i HEAD^^。把需要合并的 commit 的 message 用 squash/s 标识。
- 删除某次提交。rebase -i HEAD^^。把需要删除的 commit 的 message 去掉即可。
- 上面的 HEAD^^都是倒数第三次提交，这里用来举例子。不一定就是 HEAD^^。还可以使用分支,相对于分支 rebase -i 分支名，如果已经提交到远程仓库只需要-f 强制提交即可。

### 13、revert

git revert HEAD 提交一个新的 commit 它的内容和最近的一个 commit 完全相反。

git revert commit_id 生成一个撤销指定提交版本的新提交

### 14、cherry-pick

将指定的提交 commit 应用于当前分支（可以用于恢复不小心撤销（revert/reset）的提交）

git cherry-pick commit_id

git cherry-pick commit_id commit_id

git cherry-pick commit_id^..commit_id

### 15、查看 git 配置

git 中 D 向下翻一行 F 向下翻页 B 向上翻页 Q 退出 上箭头向上翻一行 下箭头向下翻一行

查看系统配置

git config --list

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

### 16、切换远程仓库

git remote -v 查看当前仓库地址

git remote remove origin 移除远程仓库

git remote add origin 添加远程仓库地址

### 17、HEAD

- HEAD 是指向当前分支的最近的一次 commit 的引用，它具有唯一性，每个仓库中只有一个 HEAD。在每次提交时它都会自动向前移动到最新的 commit。
- (HEAD -> 当前分支, origin/该分支对应远程哪个分支)
- 远程仓库的 HEAD 是永远指向默认分支（即 master）的最近的一次 commit。
- 远程 merge request 也会形成一个新的 commit。(比如 dev master 分支上就会有 merge 的提交。)

### 18、在 Git 中，有两个「偏移符号」： ^ 和 ~。

- ^ 的用法：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量。
  - 例如：master^ 表示 master 指向的 commit 之前的那个 commit；
  - HEAD^^ 表示 HEAD 所指向的 commit 往前数两个 commit。
- ~ 的用法：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数。
  - 例如：HEAD~5 表示 HEAD 指向的 commit 往前数 5 个 commit。

### 19、git pull 和 git fetch 的区别

git fetch 只是将远程仓库的变化下载下来，并没有和本地分支合并。

git pull 会将远程仓库的变化下载下来，并和当前分支合并。

### 20、git rebase 和 git merge 的区别

git rebase 和 git merge 都是用于分支合并，关键在 commit 记录的处理上不同。

git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会保留之前每个分支的 commit 历史。

git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，然后将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记录了。

### 21、git 中修改.gitignore 文件不起作用的解决

如果以前在 git 的管理中现在不想管理了想忽略我们可以修改.gitignore 文件，把规则添加进去，但是我们发现简单添加规则是不起作用的。因为这个文件已经被管理了所以简单的配置已经不行了。

我们需要使用 git rm -r --cached . 来删除 git 的缓存。.表示所有文件 我们也可以使用具体的路径。删除缓存后我们可以再使用 add .添加再提交就可以了。

### 22、pre-commit

pre-commit 就是在代码提交之前做些东西，比如代码打包，代码检测，称之为钩子（hook）
在 commit 之前执行一个函数（callback）。这个函数成功执行完之后，再继续 commit，但是失败之后就阻止 commit
在 .git->hooks->下面有个 pre-commit.sample，这个里面就是默认的函数(脚本)样本

安装 pre-commit

npm install pre-commit --save-dev

在 package.json 里面配置

```json
"pre-commit": [
  "lint"
]
```

跳过验证

git commit --no-verify

git commit -n
