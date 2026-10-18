# T4## 提交要求2

<br>

##### 1

difference:左相对右的差集<br>

intersection:一些集合的交集<br>

union：给出集合的并集<br>

##### 2

因为给出的cooperationGroups中筛选的role不止两人，得用循环往下接。

##### 3

Set属于一种数据结构，可以解决集合唯一性的问题，去重。

##### 4

######  一：是否选择更改差集输入数组

结果：重读了一遍index.html的函数，了解到为两对立板块而非两卡片，已放弃。

######  二：render()的理解

我把最不能理解的一小段喂了AI：

```javascript
  cooperationGroups.forEach((roles) => {
    const taskLists = roles.map((role) => {
      const member = members.find((item) => item.role === role);
      return member ? member.tasks : [];
    });
```

其实也没必要，因为我一开始太粗心了，没注意到role。

###### 三：两个计数全是1的问题：

一直覆盖，显示得永远是最后一个，不能比猫画虎，因为后面只要操作1词，前面可不一样。<br>

应该用count累加，再Set去重。

交集要整到循环外。

##### 5

Set去重处理，肯定是，差集我提前处理了输入的tasks。<br>

交集被Set控死了，差集只需要一次处理。<br>

符合预期。<br>

### 例题数组理解

1.Set数组自动去重功能去除apple。（Set对象是值的合集，即集合）<br>

2.在尾部插入数据，跟push比较像。<br>

3.has用于检查改值是否在集合中，输出对应true false。<br>

### 对index.js的分析(写两个函数记)

（我觉得render是我平时最不擅长的）

<br>

有个大佬说有思路就赶紧记录，看上去挺那个的……他说我得常看笔记，下面不看也没事。



1.数组形式写卡片。<br>

2遍历数组的各个分支，变为<s>新数组</s>li之类的DOM结点（任务前有“·”！！！）便于操作，把它们变成card类的子元素（在网页显示的关键一步）。

（同时调用函数）

3.Indenpent部分：注意是对立两部分,给其他人去重union起来，然后用filter减掉。

4.Cooperation部分：获取与使用taskLists（很复杂的一部分，不太理解：按照cooperationGroups规定遍历找到每个member的role[比如“前端工程师”]，find到每个role下的item,合成新数组taskLists，固新数组不可避免的存在任务重合情况。）

5.allTasks部分：<s>直接用4得到的大数组（AI纠正）</s>，是allTaskLists自个用members遍历了一次，然后TODO3处理，显然Set直接走。

6。渲染成功与否两种处理。

总结：difference注意是对立两部分而非两张卡片的tasks。

cooperation的原始数据需要去重。

allTasks无特殊情况，直接去重。





注：AI（deepseek和VScode自带agent）参与帮助了render()的阅读。

<br>

### 做题过程

我把本题简单理解成了集合交并集等等等。<br>

除了Set，我觉得filter也很实用。<br>

### 1

<br>

difference可以直接console.log(a.difference(b)),但此时限制a,b为Set数组。<br>

于是最后应直接在return里把ab转Set再用difference。<br>

写了个filter，改html进行对比。<br>

如果手欠给任务清单的东西复制一些，filter在清单和独立完成里都会原封不动的把多的添上（因为filter是纯减法），直接return里加Set会导致清单里继续出现重复部分。<mark>对于求集合问题，filter不如Set。</mark><br>

下一步，真把清单写错了，怎么解决页面显示的重复问题？我可以试着在源头解决问题，即直接修改旧数组重复部分。那就是例题思路?如何是交并集就没有这样的问题。<br>Set不能直接处理旧数组，那么引个新数组，把Set后的东西Push进去，应该可以？那后面filter或Set都没关系了。<br>

JS学得还是不扎实啊。<br>

那怎么把界面看到的改掉呢……（被迫求助AI）<br>

要改动渲染函数？？？我不擅长JS渲染啊。<br>

<mark>NONONONONO</mark>,我刚刚认真读了一遍index.js,a和b不能随便改，因为它们对应的根本不是两个卡片！单说a出错改a还好，但b是其他人任务的总和！！！

```javascript
 .filter((otherMember) => otherMember !== member)
```

证据：otherMember是filter出来的！<br>

更重要的是，卡片已在difference前完成渲染！！！<br>

清单数据已经过textContent操作变为传参，改了也没用。<br>

所以只能在渲染前或渲染中改，改difference做不到。<br>

#### 2

对于后两题，taskLists显然是难点。（已分析）<br>

我认为这里只需考虑集合为空即可。<br>

然后只要能交集，都没什么问题。<br>

可以every,Set专用Intersection不适用。<br>

从第一个数组开始，每个task下面的都有。<br>





###  3

写个Set去重就没有然后了。<br>

<mark>老蒋老蒋守不住了救我救我守不住了救我救我守不住了……喵！</mark>
