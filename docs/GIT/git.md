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
- git add 文件名 或者 . 或者 -A 或者 -u。 . 不包括删除(新版本支持了) u 不包括新增 A 是全部。
- git rm 文件名 删除工作区文件，并且将这次删除放入暂存区

### 4、commit

- 把暂存区的文件提交到本地仓库。
- git commit 提交然后进入输入 message 的界面。输入完 message 后保存即提交成功。
- git commit -m 'message'。这种方式就是提交然后一并输入提交信息。
- git commit --amend 修改提交的 message。
  - 如果已经上传到远程仓库，修改完后需要强制提交。或者先拉取 merge 完然后再 push。区别是后者有两条提交信息。
  - 需要注意的有一点：commit --amend 并不是直接修改原 commit 的内容，而是生成一条新的 commit。把当前 commit 替换掉

### 5、diff

- gid diff 比较工作区和暂存区的不同。
- git diff HEAD 比较工作区和本地仓库的不同。
- git diff --staged/--cached 比较暂存区和本地仓库的不同。

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

- git branch 查看分支。
- git branch newbranchName 新建分支。
- git branch -d/-D 删除分支。
  - -D 是强制删除。当该分支有文件改动尚未提交可以使用该方式强制删除
  - HEAD 指向的 branch 不能删除。如果要删除 HEAD 指向的 branch，需要先用 checkout 把 HEAD 指向其他地方。
- git checkout branchName 切换到新分支。
- git checkout -b newbranchName 新建分支并切换到该分支。
- git branch -m oldbranchName newbranchName 修改分支名。

### 10、暂存

- git stash 暂存改动。
- git stash list 查看暂存。
- git stash pop 提取暂存并清除这次暂存。
- git stash apply stash@{n} 提取某次暂存，但是不清除这次暂存。
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

### 14、查看当前仓库地址

git remote -v

### 15、查看 git 配置

git config --list

### 16、切换远程仓库

- git remote remove origin
- git remote add origin 远程仓库地址

### 17、HEAD

- HEAD 是指向当前分支的最近的一次 commit 的引用，它具有唯一性，每个仓库中只有一个 HEAD。在每次提交时它都会自动向前移动到最新的 commit 。
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

git merge 和 git merge 都是用于分支合并，关键在 commit 记录的处理上不同。

git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会
保留之前每个分支的 commit 历史。

git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，然后
将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记
录了。
