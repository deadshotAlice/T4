/**
 * 返回出现在数组 a 中、但没有出现在数组 b 中的任务。
 *
 * @param {string[]} a
 * @param {string[]} b
 * @returns {string[]}
 */
function difference(a, b) {
  // TODO 目标一：找出差异任务
  // const result = a.filter((item) => !b.includes(item));
  // return result;
  const newA=[...new Set(a)];
  const newB=[...new Set(b)];
  a.length=0;
  a.push(...newA);
  b.length=0;
  b.push(...newB);
   const c=[...new Set(a).difference(new Set(b))];
   console.log(c);
  // return c;
   return[...new Set(a).difference(new Set(b))];

}

/**
 * 返回所有任务清单中共同包含的任务。
 *
 * @param {string[][]} taskLists 由多份任务数组组成的数组
 * @returns {string[]}
 */
function intersection(taskLists) {
  // TODO 目标二：找出共同任务
  // 想一想：taskLists 为空时应该返回什么？
  if(taskLists.length===0){
    return [];
  }
   const c=[...new Set(taskLists[0])].filter((task)=>taskLists.every((list)=>list.includes(task)));
   console.log(c);
  // return c;
  return [...new Set(taskLists[0])].filter((task)=>taskLists.every((list)=>list.includes(task)));
}

/**
 * 合并多份任务清单，并去除重复任务。
 *
 * @param {string[][]} taskLists 由多份任务数组组成的数组
 * @returns {string[]}
 */
function union(taskLists) {
  // TODO 目标三：汇总所有任务
  const c=[...new Set(taskLists.flat())];
  console.log(c);
  return [...new Set(taskLists.flat())];
}

// 将函数提供给页面中的index.js使用。
// 这一部分已经写好，不需要修改。
window.TaskUtils = {
  difference,
  intersection,
  union,
};
