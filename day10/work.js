"use strict";

const assert = require("node:assert/strict");

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * 任务 1：反转链表
 *
 * @param {ListNode|null} head
 * @return {ListNode|null}
 *
 * 给定单链表头节点 head，返回反转后的新头节点。
 *
 * 示例：
 * [1, 2, 3] -> [3, 2, 1]
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function reverseList(head) {
  // TODO: 用 prev / current / next 三个指针反转 next 指向
  let prev = null;
  let current = head;
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

/**
 * 任务 2：链表中点
 *
 * @param {ListNode|null} head
 * @return {ListNode|null}
 *
 * 返回链表的中间节点。
 * 如果有两个中间节点，返回第二个中间节点。
 *
 * 示例：
 * [1, 2, 3, 4] -> 节点 3
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function middleNode(head) {
  // TODO: slow 每次走一步，fast 每次走两步
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

/**
 * 任务 3：合并两个有序链表
 *
 * @param {ListNode|null} list1
 * @param {ListNode|null} list2
 * @return {ListNode|null}
 *
 * 合并两个升序链表，返回合并后的升序链表头节点。
 *
 * 示例：
 * [1, 2, 4] 和 [1, 3, 4] -> [1, 1, 2, 3, 4, 4]
 *
 * 目标复杂度：时间 O(m + n)，空间 O(1)
 */
function mergeTwoSortedLists(list1, list2) {
  // TODO: 使用 dummy 节点和 tail 指针逐个接上较小节点
  let dummy = new ListNode();
  let tail = dummy;
  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 !== null ? list1 : list2;
  return dummy.next;
}

/**
 * 任务 4：删除链表的倒数第 N 个节点
 *
 * @param {ListNode|null} head
 * @param {number} n
 * @return {ListNode|null}
 *
 * 删除链表倒数第 n 个节点，并返回新的头节点。
 *
 * 示例：
 * [1, 2, 3, 4, 5], n = 2 -> [1, 2, 3, 5]
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function removeNthFromEnd(head, n) {
  // TODO: 使用 dummy + 快慢指针，让 slow 停在待删除节点前一个位置
  let dummy = new ListNode();
  dummy.next = head;
  let slow = dummy;
  let fast = head;
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}

function buildList(values) {
  const dummy = new ListNode();
  let tail = dummy;

  for (const value of values) {
    tail.next = new ListNode(value);
    tail = tail.next;
  }

  return dummy.next;
}

function listToArray(head) {
  const result = [];
  let current = head;

  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

const tests = [
  {
    name: "reverseList: multiple nodes",
    run: () => assert.deepEqual(listToArray(reverseList(buildList([1, 2, 3]))), [3, 2, 1]),
  },
  {
    name: "reverseList: single node",
    run: () => assert.deepEqual(listToArray(reverseList(buildList([1]))), [1]),
  },
  {
    name: "reverseList: empty list",
    run: () => assert.deepEqual(listToArray(reverseList(buildList([]))), []),
  },
  {
    name: "middleNode: odd length",
    run: () => assert.equal(middleNode(buildList([1, 2, 3, 4, 5])).val, 3),
  },
  {
    name: "middleNode: even length returns second middle",
    run: () => assert.equal(middleNode(buildList([1, 2, 3, 4])).val, 3),
  },
  {
    name: "middleNode: single node",
    run: () => assert.equal(middleNode(buildList([7])).val, 7),
  },
  {
    name: "mergeTwoSortedLists: standard case",
    run: () => assert.deepEqual(listToArray(mergeTwoSortedLists(buildList([1, 2, 4]), buildList([1, 3, 4]))), [1, 1, 2, 3, 4, 4]),
  },
  {
    name: "mergeTwoSortedLists: one list empty",
    run: () => assert.deepEqual(listToArray(mergeTwoSortedLists(buildList([]), buildList([0]))), [0]),
  },
  {
    name: "mergeTwoSortedLists: both empty",
    run: () => assert.deepEqual(listToArray(mergeTwoSortedLists(buildList([]), buildList([]))), []),
  },
  {
    name: "removeNthFromEnd: remove middle node",
    run: () => assert.deepEqual(listToArray(removeNthFromEnd(buildList([1, 2, 3, 4, 5]), 2)), [1, 2, 3, 5]),
  },
  {
    name: "removeNthFromEnd: remove head",
    run: () => assert.deepEqual(listToArray(removeNthFromEnd(buildList([1]), 1)), []),
  },
  {
    name: "removeNthFromEnd: remove tail",
    run: () => assert.deepEqual(listToArray(removeNthFromEnd(buildList([1, 2]), 1)), [1]),
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
  reverseList,
  middleNode,
  mergeTwoSortedLists,
  removeNthFromEnd,
  buildList,
  listToArray,
};
