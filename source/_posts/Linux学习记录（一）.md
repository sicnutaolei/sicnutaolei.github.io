___

![linux](https://www.runoob.com/wp-content/uploads/2014/06/linux.jpg)

Linux 是一种自由和开放源码的类 UNIX 操作系统。

Linux 英文解释为 **Linux is not Unix**。

Linux 是在 1991 由林纳斯·托瓦兹在赫尔辛基大学上学时创立的，主要受到 Minix 和 Unix 思想的启发。
___
## 文件结构
登录系统后，在当前命令窗口下输入命令：

```bash
ls
```

你会看到如下图所示:

![](https://www.runoob.com/wp-content/uploads/2014/06/4_20.png)

树状目录结构：

![](https://www.runoob.com/wp-content/uploads/2014/06/d0c50-linux2bfile2bsystem2bhierarchy.jpg)

以下是对这些目录的解释：

-   **/bin**：  
    bin 是 Binaries (二进制文件) 的缩写, 这个目录存放着最经常使用的命令。
    
-   **/boot：**  
    这里存放的是启动 Linux 时使用的一些核心文件，包括一些连接文件以及镜像文件。
    
-   **/dev ：**  
    dev 是 Device(设备) 的缩写, 该目录下存放的是 Linux 的外部设备，在 Linux 中访问设备的方式和访问文件的方式是相同的。
    
-   **/etc：**  
    etc 是 Etcetera(等等) 的缩写,这个目录用来存放所有的系统管理所需要的配置文件和子目录。
    
-   **/home**：  
    用户的主目录，在 Linux 中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的，如上图中的 alice、bob 和 eve。
    
-   **/lib**：  
    lib 是 Library(库) 的缩写这个目录里存放着系统最基本的动态连接共享库，其作用类似于 Windows 里的 DLL 文件。几乎所有的应用程序都需要用到这些共享库。
    
-   **/lost+found**：  
    这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。
    
-   **/media**：  
    linux 系统会自动识别一些设备，例如U盘、光驱等等，当识别后，Linux 会把识别的设备挂载到这个目录下。
    
-   **/mnt**：  
    系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在 /mnt/ 上，然后进入该目录就可以查看光驱里的内容了。
    
-   **/opt**：  
    opt 是 optional(可选) 的缩写，这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。
    
-   **/proc**：  
    proc 是 Processes(进程) 的缩写，/proc 是一种伪文件系统（也即虚拟文件系统），存储的是当前内核运行状态的一系列特殊文件，这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。  
    这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件，比如可以通过下面的命令来屏蔽主机的ping命令，使别人无法ping你的机器：
    
    ```bash
    echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_all
    ```
    
-   **/root**：  
    该目录为系统管理员，也称作超级权限者的用户主目录。
    
-   **/sbin**：  
    s 就是 Super User 的意思，是 Superuser Binaries (超级用户的二进制文件) 的缩写，这里存放的是系统管理员使用的系统管理程序。
    
-   **/selinux**：  
     这个目录是 Redhat/CentOS 所特有的目录，Selinux 是一个安全机制，类似于 windows 的防火墙，但是这套机制比较复杂，这个目录就是存放selinux相关的文件的。
    
-   **/srv**：  
     该目录存放一些服务启动之后需要提取的数据。
    
-   **/sys**：
    
    这是 Linux2.6 内核的一个很大的变化。该目录下安装了 2.6 内核中新出现的一个文件系统 sysfs 。
    
    sysfs 文件系统集成了下面3种文件系统的信息：针对进程信息的 proc 文件系统、针对设备的 devfs 文件系统以及针对伪终端的 devpts 文件系统。
    
    该文件系统是内核设备树的一个直观反映。
    
    当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统中被创建。
    
-   **/tmp**：  
    tmp 是 temporary(临时) 的缩写这个目录是用来存放一些临时文件的。
    
-   **/usr**：  
     usr 是 unix system resources(unix 系统资源) 的缩写，这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于 windows 下的 program files 目录。
    
-   **/usr/bin：**  
    系统用户使用的应用程序。
    
-   **/usr/sbin：**  
    超级用户使用的比较高级的管理程序和系统守护程序。
    
-   **/usr/src：**  
    内核源代码默认的放置目录。
    
-   **/var**：  
    var 是 variable(变量) 的缩写，这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。
    
-   **/run**：  
    是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。如果你的系统上有 /var/run 目录，应该让它指向 run。
    

在 Linux 系统中，有几个目录是比较重要的，平时需要注意不要误删除或者随意更改内部文件。

**/etc**： 上边也提到了，这个是系统中的配置文件，如果你更改了该目录下的某个文件可能会导致系统不能启动。

**/bin, /sbin, /usr/bin, /usr/sbin**: 这是系统预设的执行文件的放置目录，比如 **ls** 就是在 **/bin/ls** 目录下的。

值得提出的是 **/bin**、**/usr/bin** 是给系统用户使用的指令（除 root 外的通用用户），而/sbin, /usr/sbin 则是给 root 使用的指令。

**/var**： 这是一个非常重要的目录，系统上跑了很多程序，那么每个程序都会有相应的日志产生，而这些日志就被记录到这个目录下，具体在 /var/log 目录下，另外 mail 的预设放置也是在这里。

## 文件权限
Linux 系统是一种典型的多用户系统，不同的用户处于不同的地位，拥有不同的权限。

为了保护系统的安全性，Linux 系统对不同的用户访问同一文件（包括目录文件）的权限做了不同的规定。

在 Linux 中我们通常使用以下两个命令来修改文件或目录的所属用户与权限：

-   chown (change owner) ： 修改所属用户与组。
-   chmod (change mode) ： 修改用户的权限。

下图中通过 chown 来授权用户，通过 chmod 为用户设置可以开门的权限。

![](https://www.runoob.com/wp-content/uploads/2014/06/1_151733904241.png)

在 Linux 中我们可以使用 ll 或者 ls –l 命令来显示一个文件的属性以及文件所属的用户和组，如：

```bash
[root@www /]# ls -l
total 64
dr-xr-xr-x   2 root root 4096 Dec 14  2012 bin
dr-xr-xr-x   4 root root 4096 Apr 19  2012 boot
……
```

实例中，**bin** 文件的第一个属性用 d 表示。d 在 Linux 中代表该文件是一个目录文件。

在 Linux 中第一个字符代表这个文件是目录、文件或链接文件等等。

-   当为 d 则是目录
-   当为 \- 则是文件；
-   若是 l 则表示为链接文档(link file)；
-   若是 b 则表示为装置文件里面的可供储存的接口设备(可随机存取装置)；
-   若是 c 则表示为装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)。

接下来的字符中，以三个为一组，且均为 rwx 的三个参数的组合。其中， r 代表可读(read)、 w 代表可写(write)、 x 代表可执行(execute)。 要注意的是，这三个权限的位置不会改变，如果没有权限，就会出现减号 \- 而已。

![](https://www.runoob.com/wp-content/uploads/2014/06/file-llls22.jpg)

每个文件的属性由左边第一部分的 10 个字符来确定（如下图）。

![363003_1227493859FdXT](https://www.runoob.com/wp-content/uploads/2014/06/363003_1227493859FdXT.png)

从左至右用 **0-9** 这些数字来表示。

第 **0** 位确定文件类型，第 **1-3** 位确定属主（该文件的所有者）拥有该文件的权限。

第4-6位确定属组（所有者的同组用户）拥有该文件的权限，第7-9位确定其他用户拥有该文件的权限。

其中，第 **1、4、7** 位表示读权限，如果用 r 字符表示，则有读权限，如果用 \- 字符表示，则没有读权限；

第 **2、5、8** 位表示写权限，如果用 w 字符表示，则有写权限，如果用 \- 字符表示没有写权限；第 **3、6、9** 位表示可执行权限，如果用 x 字符表示，则有执行权限，如果用 \- 字符表示，则没有执行权限。

___

## Linux文件属主和属组

```bash
[root@www /]# ls -l
total 64
drwxr-xr-x 2 root  root  4096 Feb 15 14:46 cron
drwxr-xr-x 3 mysql mysql 4096 Apr 21  2014 mysql
……
```

对于文件来说，它都有一个特定的所有者，也就是对该文件具有所有权的用户。

同时，在Linux系统中，用户是按组分类的，一个用户属于一个或多个组。

文件所有者以外的用户又可以分为文件所属组的同组用户和其他用户。

因此，Linux系统按文件所有者、文件所有者同组用户和其他用户来规定了不同的文件访问权限。

在以上实例中，mysql 文件是一个目录文件，属主和属组都为 mysql，属主有可读、可写、可执行的权限；与属主同组的其他用户有可读和可执行的权限；其他用户也有可读和可执行的权限。

对于 root 用户来说，一般情况下，文件的权限对其不起作用。

___

## 更改文件属性

### 1、chgrp：更改文件属组

语法：

```bash
chgrp [-R] 属组名 文件名
```

参数选项

-   \-R：递归更改文件属组，就是在更改某个目录文件的属组时，如果加上 \-R 的参数，那么该目录下的所有文件的属组都会更改。

### 2、chown：更改文件所有者（owner），也可以同时更改文件所属组。

语法：

```bash
chown [–R] 所有者 文件名
chown [-R] 所有者:属组名 文件名
```

进入 /root 目录（~）将install.log的拥有者改为bin这个账号：

```bash
[root@www ~] cd ~
[root@www ~]# chown bin install.log
[root@www ~]# ls -l
-rw-r--r--  1 bin  users 68495 Jun 25 08:53 install.log
```

将install.log的拥有者与群组改回为root：

```bash
[root@www ~]# chown root:root install.log
[root@www ~]# ls -l
-rw-r--r--  1 root root 68495 Jun 25 08:53 install.log
```

### 3、chmod：更改文件9个属性

Linux文件属性有两种设置方法，一种是数字，一种是符号。

Linux 文件的基本权限就有九个，分别是 **owner/group/others(拥有者/组/其他)** 三种身份各有自己的 **read/write/execute** 权限。

先复习一下刚刚上面提到的数据：文件的权限字符为： \-rwxrwxrwx ， 这九个权限是三个三个一组的！其中，我们可以使用数字来代表各个权限，各权限的分数对照表如下：

-   r:4
-   w:2
-   x:1

每种身份(owner/group/others)各自的三个权限(r/w/x)分数是需要累加的，例如当权限为： \-rwxrwx--- 分数则是：

-   owner = rwx = 4+2+1 = 7
-   group = rwx = 4+2+1 = 7
-   others= --- = 0+0+0 = 0

所以等一下我们设定权限的变更时，该文件的权限数字就是 **770**。变更权限的指令 chmod 的语法是这样的：

```bash
 chmod [-R] xyz 文件或目录
```

选项与参数：

-   **xyz** : 就是刚刚提到的数字类型的权限属性，为 **rwx** 属性数值的相加。
-   **\-R** : 进行递归(recursive)的持续变更，以及连同次目录下的所有文件都会变更

举例来说，如果要将 **.bashrc** 这个文件所有的权限都设定启用，那么命令如下：

```bash
[root@www ~]# ls -al .bashrc
-rw-r--r--  1 root root 395 Jul  4 11:45 .bashrc
[root@www ~]# chmod 777 .bashrc
[root@www ~]# ls -al .bashrc
-rwxrwxrwx  1 root root 395 Jul  4 11:45 .bashrc
```

那如果要将权限变成 _\-rwxr-xr--_ 呢？那么权限的分数就成为 \[4+2+1\]\[4+0+1\]\[4+0+0\]=754。

### 符号类型改变文件权限

还有一个改变权限的方法，从之前的介绍中我们可以发现，基本上就九个权限分别是：

-   user：用户
-   group：组
-   others：其他

那么我们就可以使用 **u, g, o** 来代表三种身份的权限。

此外， **a** 则代表 **all**，即全部的身份。读写的权限可以写成 r, w, x，也就是可以使用下表的方式来看：
||||||
|--|--|--|--|--|
|chmod|u|+(加入)|r|
||g|-(除去)|w|
||o|=(设定)|x|
||a|||

如果我们需要将文件权限设置为 **\-rwxr-xr--** ，可以使用 chmod u=rwx,g=rx,o=r 文件名 来设定:

```bash
#  touch test1    // 创建 test1 文件
# ls -al test1    // 查看 test1 默认权限
-rw-r--r-- 1 root root 0 Nov 15 10:32 test1
# chmod u=rwx,g=rx,o=r  test1    // 修改 test1 权限
# ls -al test1
-rwxr-xr-- 1 root root 0 Nov 15 10:32 test1
```

而如果是要将权限去掉而不改变其他已存在的权限呢？例如要拿掉全部人的可执行权限，则：

```bash
#  chmod  a-x test1
# ls -al test1
-rw-r--r-- 1 root root 0 Nov 15 10:32 test1
```
## 缩写全称
-   pwd: print work directory 打印当前目录 显示出当前工作目录的绝对路径
-   ps: process status(进程状态，类似于windows的任务管理器)
    
    常用参数：－auxf
    
    ps -auxf 显示进程状态
    
-   df: disk free 其功能是显示磁盘可用空间数目信息及空间结点信息。换句话说，就是报告在任何安装的设备或目录中，还剩多少自由的空间。
-   du: Disk usage
-   rpm：即RedHat Package Management，是RedHat的发明之一
-   rmdir：Remove Directory（删除目录）
-   rm：Remove（删除目录或文件）
-   cat: concatenate 连锁
-   cat file1file2>>file3 把文件1和文件2的内容联合起来放到file3中
-   insmod: install module,载入模块
-   ln -s : link -soft 创建一个软链接，相当于创建一个快捷方式
-   mkdir：Make Directory(创建目录)
-   touch: touch
-   man: Manual
-   su：Swith user(切换用户)
-   cd：Change directory
-   ls：List files
-   ps：Process Status
-   mkdir：Make directory
-   rmdir：Remove directory
-   mkfs: Make file system
-   fsck：File system check
-   uname: Unix name
-   lsmod: List modules
-   mv: Move file
-   rm: Remove file
-   cp: Copy file
-   ln: Link files
-   fg: Foreground
-   bg: Background
-   chown: Change owner
-   chgrp: Change group
-   chmod: Change mode
-   umount: Unmount
-   dd: 本来应根据其功能描述"Convert an copy"命名为"cc"，但"cc"已经被用以代表"CComplier"，所以命名为"dd"
-   tar：Tape archive （磁带档案）
-   ldd：List dynamic dependencies
-   insmod：Install module
-   rmmod：Remove module
-   lsmod：List module
-   文件结尾的"rc"（如.bashrc、.xinitrc等）：Resource configuration
-   Knnxxx /Snnxxx（位于rcx.d目录下）：K（Kill）；S(Service)；nn（执行顺序号）；xxx（服务标识）
-   .a（扩展名a）：Archive，static library
-   .so（扩展名so）：Shared object，dynamically linked library
-   .o（扩展名o）：Object file，complied result of C/C++ source file
-   RPM：Red hat package manager
-   dpkg：Debian package manager
-   apt：Advanced package tool（Debian或基于Debian的发行版中提供）

### 其他 Linux 命令缩写
```ini
bin = Binaries (二进制文件)

/dev = Devices (设备)

/etc = Etcetera (等等)

/lib = LIBrary

/proc = Processes

/sbin = Superuser Binaries (超级用户的二进制文件)

/tmp = Temporary (临时)

/usr = Unix Shared Resources

/var = Variable (变量)

FIFO = First In, First Out

GRUB = GRand Unified Bootloader

IFS= Internal Field Seperators

LILO = LInux LOader

MySQL = My 是最初作者女儿的名字，

SQL = Structured QueryLanguage

PHP = Personal Home Page Tools = PHP HypertextPreprocessor

PS = Prompt String

Perl = “Pratical Extraction and Report Language”(实际的抽取和报告语言) =”Pathologically Eclectic Rubbish Lister”

Python 得名于电视剧Monty Python’s Flying Circus

Tcl = Tool Command Language

Tk = ToolKit

VT = Video Terminal

YaST = Yet Another Setup Tool

apache = “a patchy” server

apt = Advanced Packaging Tool

ar = archiver

as = assembler

awk = “Aho Weiberger and Kernighan”三个作者的姓的第一个字母

bash = Bourne Again SHell

bc = Basic (Better) Calculator

bg = BackGround

biff = 作者HeidiStettner在U.C.Berkely养的一条狗,喜欢对邮递员汪汪叫。

cal = Calendar (日历)

cat = Catenate (链接)

cd = Change Directory

chgrp = Change Group

chmod = Change Mode

chown = Change Owner

chsh = Change Shell

cmp = compare

cobra = Common Object Request BrokerArchitecture

comm = common

cp = Copy

cpio = CoPy In and Out

cpp = C Pre Processor

cron = Chronos 希腊文时间

cups = Common Unix Printing System

cvs = Current Version System

daemon = Disk And Execution MONitor

dc = Desk Calculator

dd = Disk Dump (磁盘转储)

df = Disk Free

diff = Difference

dmesg = diagnostic message

du = Disk Usage

ed = editor

egrep = Extended GREP

elf = Extensible Linking Format

elm = ELectronic Mail

emacs = Editor MACroS

eval = EVALuate

ex = EXtended

exec = EXECute (执行)

fd = file descriptors

fg = ForeGround

fgrep = Fixed GREP

fmt = format

fsck = File System ChecK

fstab = FileSystem TABle

fvwm = F*** Virtual Window Manager

gawk = GNU AWK

gpg = GNU Privacy Guard

groff = GNU troff

hal = Hardware Abstraction Layer

joe = Joe’s Own Editor

ksh = Korn SHell

lame = Lame Ain’t an MP3 Encoder

lex = LEXical analyser

lisp = LISt Processing = Lots of IrritatingSuperfluous Parentheses

ln = Link

lpr = Line PRint

ls = list

lsof = LiSt Open Files

m4 = Macro processor Version 4

man = MANual pages

mawk = Mike Brennan’s AWK

mc = Midnight Commander

mkfs = MaKe FileSystem

mknod = Make Node

motd = Message of The Day

mozilla = MOsaic GodZILLa

mtab = Mount TABle

mv = Move

nano = Nano’s ANOther editor

nawk = New AWK

nl = Number of Lines

nm = names

nohup = No HangUP

nroff = New ROFF

od = Octal Dump

passwd = Passwd

pg = pager

pico = PIne’s message COmposition editor

pine = “Program for Internet News &Email” = “Pine is not Elm”

ping = 拟声 又 = Packet Internet Grouper

pirntcap = PRINTer CAPability

popd = POP Directory

pr = pre

printf = Print Formatted

ps = Processes Status

pty = pseudo tty

pushd = PUSH Directory

pwd = Print Working Directory

rc = runcom = run command, rc还是plan9的shell

rev = REVerse

rm = ReMove

rn = Read News

roff = RunOFF

rpm = RPM Package Manager = RedHat PackageManager

rsh, rlogin, rvim中的

r = Remote

rxvt = ouR XVT

seamoneky = 我

sed = Stream Editor

seq = SEQuence

shar = Shell ARchive

slrn = S-Lang rn

ssh = Secure Shell

ssl = Secure Sockets Layer

stty = Set TTY

su = Substitute User

svn = SubVersion

tar = Tape ARchive

tcsh = TENEX C shell

tee = T (T形水管接口)

telnet = TEminaL over Network

termcap = terminal capability

terminfo = terminal information

tex = τέχνη的缩写，希腊文art

tr = traslate

troff = Typesetter new ROFF

tsort = Topological SORT

tty = TeleTypewriter

twm = Tom’s Window Manager

tz = TimeZone

udev = Userspace DEV

ulimit = User’s LIMIT

umask = User’s MASK

uniq = UNIQue

i = VIsual = Very Inconvenient

vim = Vi IMproved

wall = write all

wc = Word Count

wine = WINE Is Not an Emulator

xargs = eXtended ARGuments

xdm = X Display Manager

xlfd = X Logical Font Description

xmms = X Multimedia System

xrdb = X Resources DataBase

xwd = X Window Dump

yacc = yet another compiler compiler

Fish = the Friendly Interactive SHell

su = Switch User

MIME = Multipurpose Internet Mail Extensions

ECMA = European Computer ManufacturersAssociation
```