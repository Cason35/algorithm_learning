"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：逆波兰表达式求值
 *
 * @param {string[]} tokens 有效的逆波兰表达式，只包含整数和 +、-、*、/
 * @return {number}
 *
 * 除法只保留整数部分，并向零截断。
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function evaluateRPN(tokens) {
  // 用栈保存已经扫描到、但还没参与运算的操作数
  const stack = [];
  // 从左到右依次处理每一个 token
  for (const token of tokens) {
    // 遇到加号：弹出右操作数和左操作数，相加后压回栈
    if (token === "+") {
      // 后弹出的是左操作数，先弹出的是右操作数
      const right = stack.pop();
      // 取出左操作数
      const left = stack.pop();
      // 把加法结果重新入栈
      stack.push(left + right);
    // 遇到减号：注意运算顺序必须是 left - right
    } else if (token === "-") {
      // 先弹出的是右操作数
      const right = stack.pop();
      // 后弹出的是左操作数
      const left = stack.pop();
      // 把减法结果重新入栈
      stack.push(left - right);
    // 遇到乘号：弹出两个操作数相乘
    } else if (token === "*") {
      // 先弹出右操作数
      const right = stack.pop();
      // 再弹出左操作数
      const left = stack.pop();
      // 把乘法结果重新入栈
      stack.push(left * right);
    // 遇到除号：向零截断整数商
    } else if (token === "/") {
      // 先弹出右操作数
      const right = stack.pop();
      // 再弹出左操作数
      const left = stack.pop();
      // Math.trunc 保证向零截断（负数也能正确处理）
      stack.push(Math.trunc(left / right));
    // 其余 token 都是数字字符串
    } else {
      // 转成数字后压入栈中
      stack.push(Number(token));
    }
  }
  // 扫描结束后栈顶就是最终结果
  return stack.pop();
}

/**
 * 任务 2：每个固定窗口的第一个负数
 *
 * @param {number[]} nums
 * @param {number} k 窗口长度，满足 1 <= k <= nums.length
 * @return {number[]}
 *
 * 返回每个长度为 k 的连续窗口中的第一个负数；窗口没有负数时返回 0。
 * 不能修改传入的 nums。
 *
 * 目标复杂度：时间 O(n)，空间 O(k)
 */
function firstNegativeInWindows(nums, k) {
  // 队列保存当前及未来窗口中仍然有效的负数下标
  const queue = [];
  // head 指向当前真正的队首，避免反复使用 shift()
  let head = 0;
  // 收集每个完整窗口的答案
  const result = [];
  // 从左到右扫描每个下标，逐步形成窗口
  for (let i = 0; i < nums.length; i++) {
    // 当前值是负数时，把它的下标加入候选队列
    if (nums[i] < 0) {
      // 新出现的负数下标进入队尾
      queue.push(i);
    }
    // 队首下标已经滑出窗口左边界时，逻辑出队
    if (head < queue.length && queue[head] <= i - k) {
      // 只移动 head，不真正移动数组元素
      head += 1;
    }
    // 只有当窗口长度凑满 k 时才记录答案
    if (i >= k - 1) {
      // 队列里还有有效负数，队首就是窗口内第一个负数
      if (head < queue.length) {
        // 取出队首下标对应的负数
        result.push(nums[queue[head]]);
      // 当前窗口没有负数
      } else {
        // 按题意记录 0
        result.push(0);
      }
    }
  }
  // 返回所有窗口的第一个负数结果
  return result;
}

class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * 任务 3：回文链表
 *
 * @param {ListNode | null} head
 * @return {boolean}
 *
 * 判断链表从前到后和从后到前是否相同。
 * 函数返回前必须把链表恢复为原来的结构。
 *
 * 目标复杂度：时间 O(n)，额外空间 O(1)
 */
function isPalindromeList(head) {
  // 空链表视为回文
  if (head === null) {
    // 直接返回 true
    return true;
  }
  // 单节点链表也是回文
  if (head.next === null) {
    // 直接返回 true
    return true;
  }

  // 慢指针每次走一步，用来找前半部分末尾
  let slow = head;
  // 快指针每次走两步
  let fast = head;
  // 当前半部分末尾的前驱，方便断开前后两半
  let prevSlow = null;
  // 快指针还能继续走时，说明还没到中点附近
  while (fast !== null && fast.next !== null) {
    // 记录慢指针的前一个节点
    prevSlow = slow;
    // 慢指针前进一步
    slow = slow.next;
    // 快指针前进两步
    fast = fast.next.next;
  }
  // 断开前半部分与后半部分
  prevSlow.next = null;

  // 反转后半部分，prev 最终会成为反转后的新头
  let prev = null;
  // 从后半部分头节点开始反转
  let current = slow;
  // 逐个节点改写 next 指针
  while (current !== null) {
    // 先保存下一个节点，避免丢失后续链表
    const next = current.next;
    // 当前节点指向前一个节点，完成局部反转
    current.next = prev;
    // prev 前进到当前节点
    prev = current;
    // current 前进到原先的下一个节点
    current = next;
  }

  // left 从原链表头开始比较
  let left = head;
  // right 从反转后的后半部分头开始比较
  let right = prev;
  // 先假设是回文，发现不匹配再改成 false
  let isPalindrome = true;
  // 两边同时向中间走，逐个比较节点值
  while (left !== null && right !== null) {
    // 一旦出现不相等，就不是回文
    if (left.value !== right.value) {
      // 标记结果为 false，但还不能立刻返回，因为要先恢复链表
      isPalindrome = false;
      // 提前结束比较循环
      break;
    }
    // 左指针前进
    left = left.next;
    // 右指针前进
    right = right.next;
  }

  // 再次反转后半部分，把链表恢复成原来的顺序
  let restorePrev = null;
  // 从当前反转后的后半部分头开始恢复
  let restoreCurrent = prev;
  // 再次原地反转，得到原来的后半部分头
  while (restoreCurrent !== null) {
    // 保存下一个节点
    const next = restoreCurrent.next;
    // 改写指针方向
    restoreCurrent.next = restorePrev;
    // restorePrev 前进
    restorePrev = restoreCurrent;
    // restoreCurrent 前进
    restoreCurrent = next;
  }
  // 把恢复后的后半部分重新接到前半部分末尾
  prevSlow.next = restorePrev;

  // 返回是否回文的结论
  return isPalindrome;
}

/**
 * 任务 4：查找目标值的起止位置
 *
 * @param {number[]} nums 升序数组，可能包含重复数字
 * @param {number} target
 * @return {[number, number]}
 *
 * 返回 target 第一次和最后一次出现的下标；不存在则返回 [-1, -1]。
 * 不能使用 indexOf、lastIndexOf 或线性扫描查找边界。
 *
 * 目标复杂度：时间 O(log n)，空间 O(1)
 */
function searchRange(nums, target) {
  // 在升序数组中找 target 第一次出现的下标；不存在返回 -1
  function findLeftBound() {
    // 搜索区间左端
    let left = 0;
    // 搜索区间右端
    let right = nums.length - 1;
    // 记录目前找到的最左目标下标
    let answer = -1;
    // 标准闭区间二分
    while (left <= right) {
      // 取中点，避免溢出写法在 JS 中也可直接相加
      const mid = Math.floor((left + right) / 2);
      // 中点值等于目标时，继续向左收缩找更早出现的位置
      if (nums[mid] === target) {
        // 先记下当前命中位置
        answer = mid;
        // 向左半边继续找
        right = mid - 1;
      // 中点值偏小，目标在右半边
      } else if (nums[mid] < target) {
        // 丢弃左半边（含 mid）
        left = mid + 1;
      // 中点值偏大，目标在左半边
      } else {
        // 丢弃右半边（含 mid）
        right = mid - 1;
      }
    }
    // 返回最左侧命中下标
    return answer;
  }

  // 在升序数组中找 target 最后一次出现的下标；不存在返回 -1
  function findRightBound() {
    // 搜索区间左端
    let left = 0;
    // 搜索区间右端
    let right = nums.length - 1;
    // 记录目前找到的最右目标下标
    let answer = -1;
    // 标准闭区间二分
    while (left <= right) {
      // 取中点
      const mid = Math.floor((left + right) / 2);
      // 中点值等于目标时，继续向右收缩找更晚出现的位置
      if (nums[mid] === target) {
        // 先记下当前命中位置
        answer = mid;
        // 向右半边继续找
        left = mid + 1;
      // 中点值偏小，目标在右半边
      } else if (nums[mid] < target) {
        // 丢弃左半边（含 mid）
        left = mid + 1;
      // 中点值偏大，目标在左半边
      } else {
        // 丢弃右半边（含 mid）
        right = mid - 1;
      }
    }
    // 返回最右侧命中下标
    return answer;
  }

  // 分别计算左右边界
  const leftIndex = findLeftBound();
  // 如果左侧都找不到，说明目标不存在
  if (leftIndex === -1) {
    // 按约定返回 [-1, -1]
    return [-1, -1];
  }
  // 左侧存在时，再找右侧边界
  const rightIndex = findRightBound();
  // 返回起止下标
  return [leftIndex, rightIndex];
}

function buildList(values) {
  const dummy = new ListNode(0);
  let tail = dummy;

  for (const value of values) {
    tail.next = new ListNode(value);
    tail = tail.next;
  }

  return dummy.next;
}

function listToArray(head) {
  const result = [];
  const seen = new Set();
  let current = head;

  while (current !== null) {
    if (seen.has(current)) {
      throw new Error("链表中出现了环");
    }

    seen.add(current);
    result.push(current.value);
    current = current.next;
  }

  return result;
}

const tests = [
  {
    name: "evaluateRPN: addition and multiplication",
    run: () => assert.equal(evaluateRPN(["2", "1", "+", "3", "*"]), 9),
  },
  {
    name: "evaluateRPN: subtraction keeps operand order",
    run: () => assert.equal(evaluateRPN(["7", "3", "-"]), 4),
  },
  {
    name: "evaluateRPN: division truncates toward zero",
    run: () => {
      assert.equal(evaluateRPN(["4", "13", "5", "/", "+"]), 6);
      assert.equal(evaluateRPN(["7", "-3", "/"]), -2);
    },
  },
  {
    name: "firstNegativeInWindows: mixed values",
    run: () => assert.deepEqual(
      firstNegativeInWindows([12, -1, -7, 8, -15, 30, 16, 28], 3),
      [-1, -1, -7, -15, -15, 0],
    ),
  },
  {
    name: "firstNegativeInWindows: windows without negatives",
    run: () => assert.deepEqual(firstNegativeInWindows([1, 2, 3, 4], 2), [0, 0, 0]),
  },
  {
    name: "firstNegativeInWindows: k equals one and no mutation",
    run: () => {
      const nums = [-2, 5, -1];

      assert.deepEqual(firstNegativeInWindows(nums, 1), [-2, 0, -1]);
      assert.deepEqual(nums, [-2, 5, -1]);
    },
  },
  {
    name: "isPalindromeList: empty and single-node lists",
    run: () => {
      assert.equal(isPalindromeList(null), true);
      assert.equal(isPalindromeList(buildList([1])), true);
    },
  },
  {
    name: "isPalindromeList: odd length and restores list",
    run: () => {
      const head = buildList([1, 2, 3, 2, 1]);

      assert.equal(isPalindromeList(head), true);
      assert.deepEqual(listToArray(head), [1, 2, 3, 2, 1]);
    },
  },
  {
    name: "isPalindromeList: even true and false cases restore lists",
    run: () => {
      const palindrome = buildList([1, 2, 2, 1]);
      const notPalindrome = buildList([1, 2, 3, 1]);

      assert.equal(isPalindromeList(palindrome), true);
      assert.equal(isPalindromeList(notPalindrome), false);
      assert.deepEqual(listToArray(palindrome), [1, 2, 2, 1]);
      assert.deepEqual(listToArray(notPalindrome), [1, 2, 3, 1]);
    },
  },
  {
    name: "searchRange: repeated target",
    run: () => assert.deepEqual(searchRange([5, 7, 7, 8, 8, 10], 8), [3, 4]),
  },
  {
    name: "searchRange: target missing",
    run: () => assert.deepEqual(searchRange([5, 7, 7, 8, 8, 10], 6), [-1, -1]),
  },
  {
    name: "searchRange: target fills array and empty input",
    run: () => {
      assert.deepEqual(searchRange([2, 2, 2], 2), [0, 2]);
      assert.deepEqual(searchRange([], 2), [-1, -1]);
    },
  },
];

function runTests() {
  let passed = 0;

  for (const test of tests) {
    try {
      test.run();
      passed += 1;
      console.log(`PASS ${test.name}`);
    } catch (error) {
      console.error(`FAIL ${test.name}`);
      console.error(`  ${error.message}`);
    }
  }

  console.log(`\n${passed}/${tests.length} tests passed`);

  if (passed !== tests.length) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  runTests();
}

module.exports = {
  ListNode,
  evaluateRPN,
  firstNegativeInWindows,
  isPalindromeList,
  searchRange,
  buildList,
  listToArray,
};
