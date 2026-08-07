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
  // TODO: 数字入栈；运算符弹出 right 和 left，计算后把结果重新入栈
  return undefined;
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
  // TODO: 队列中保存仍在窗口内的负数下标；用 head 指针读取队首，避免反复 shift()
  return undefined;
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
  // TODO: 找前半部分末尾，反转后半部分，比较两边，然后恢复后半部分
  return undefined;
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
  // TODO: 分别用边界二分查找 target 的最左和最右位置
  return undefined;
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
