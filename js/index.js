const members = [
  {
    name: '小鱼',
    role: '前端工程师',
    tasks: ['页面开发', '组件封装', '接口联调', '页面走查', '缺陷修复','页面开发', '组件封装', '接口联调', '页面走查', '缺陷修复'  ],
  },
  {
    name: '小霜',
    role: '后端工程师',
    tasks: ['数据库设计', '接口开发', '接口联调', '需求验收', '缺陷修复','数据库设计', '接口开发', '接口联调', '需求验收', '缺陷修复'],
  },
  {
    name: '雨捷',
    role: 'UI设计师',
    tasks: ['视觉设计', '图标绘制', '页面走查', '交互验收','视觉设计', '图标绘制', '页面走查', '交互验收'],
  },
  {
    name: '青子',
    role: '产品经理',
    tasks: ['需求分析', '原型设计', '需求评审', '需求验收', '版本复盘','需求分析', '原型设计', '需求评审', '需求验收', '版本复盘'],
  },
  {
    name: '微光娘',
    role: '测试工程师',
    tasks: ['测试用例', '接口联调', '页面走查', '需求验收', '缺陷修复','测试用例', '接口联调', '页面走查', '需求验收', '缺陷修复']
  },
    {
    name: '中国人能飞',
    role: '飞行员',
    tasks: ['测试用例', '需求验收','交互验收' ,'飞行'],
  },
];

const cooperationGroups = [
  ['前端工程师', '后端工程师', '测试工程师'],
  ['前端工程师', 'UI设计师', '测试工程师'],
  ['后端工程师', '产品经理', '测试工程师'],
];

const memberTaskContainer = document.getElementById('member-task-container');
const independentTaskContainer = document.getElementById('independent-task-container');
const cooperationTaskContainer = document.getElementById('cooperation-task-container');
const allTaskContainer = document.getElementById('all-task-container');
const indenpentTaskCount=document.getElementById('independent-task-count');
const cooperationTaskCount = document.getElementById('cooperation-task-count');
const allTaskCount = document.getElementById('all-task-count');

// 分 差 交 并+数

function createTaskList(tasks) {
  if (tasks.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-message';
    empty.textContent ='太笨，无';
    return empty;
  }
  const list = document.createElement('ul');
  list.className = 'task-list';

  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.textContent = task;
    list.appendChild(item);
  });

  return list;
}
//把item整入list,定className


function createMemberCard(member, tasks) {
  const card = document.createElement('article');
  card.className = 'task-card';

  const title = document.createElement('h3');
  title.textContent = member.name;

  const role = document.createElement('span');
  role.className = 'role';
  role.textContent = member.role;

  card.appendChild(title);
  card.appendChild(role);
  card.appendChild(createTaskList(tasks));

  return card;
}
//完善card

function createCooperationCard(roles, tasks) {
  const card = document.createElement('article');
  card.className = 'task-card';

  const title = document.createElement('h3');
  title.textContent = roles.join(' + ');

  card.appendChild(title);
  card.appendChild(createTaskList(tasks));
  return card;
}
//完善交集

function render() {
  const { difference, intersection, union } = window.TaskUtils;
//传函数
  const allTaskLists = members.map((member) => member.tasks);
  let totalIndependentCount = 0;

  members.forEach((member) => {
    memberTaskContainer.appendChild(createMemberCard(member, member.tasks));

    const otherTaskLists = members
      .filter((otherMember) => otherMember !== member)
      .map((otherMember) => otherMember.tasks);

    const tasksOwnedByOthers = union(otherTaskLists);
    const independentTasks = difference(member.tasks, tasksOwnedByOthers);
    totalIndependentCount += independentTasks.length;
    independentTaskContainer.appendChild(
      createMemberCard(member, independentTasks)
    );
  });
  indenpentTaskCount.textContent =
    `共整理出 ${totalIndependentCount} 项独立任务`;
//遍历task并整到card内

  let totalCooperationCount = 0;
  cooperationGroups.forEach((roles) => {
    const taskLists = roles.map((role) => {
      const member = members.find((item) => item.role === role);
      return member ? member.tasks : [];
    });
    const commonTasks = intersection(taskLists);
    totalCooperationCount += commonTasks.length;
    cooperationTaskContainer.appendChild(
      createCooperationCard(roles, commonTasks)
    );
  });
  cooperationTaskCount.textContent =
    `共整理出 ${totalCooperationCount} 项共同任务`;

  const allTasks = union(allTaskLists);
  allTaskCount.textContent = `共整理出 ${allTasks.length} 项不同任务`;

  if (allTasks.length === 0) {
    allTaskContainer.appendChild(createTaskList([]));
    return;
  }

  allTasks.forEach((task) => {
    const tag = document.createElement('span');
    tag.className = 'task-tag';
    tag.textContent = task;
    allTaskContainer.appendChild(tag);
  });
}


//卡片渲染！


try {
  render();
} catch (error) {
  const errorBox = document.createElement('div');
  errorBox.className = 'error-box';
  errorBox.textContent = `页面运行时出现了问题：\n${error.message}\n\n可以打开开发者工具的 Console 查看更完整的信息。`;
  document.getElementById('root').appendChild(errorBox);
  console.error(error);
}
//渲染成败
