"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：普通二分查找
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 *
 * 在升序数组 nums 中查找 target。
 * 找到返回下标，找不到返回 -1。
 *
 * 目标复杂度：时间 O(log n)，空间 O(1)
 */
function binarySearch(nums, target) {
  // TODO: 使用闭区间 [left, right] 进行二分查找
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

/**
 * 任务 2：搜索插入位置
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 *
 * 返回 target 在升序数组 nums 中应该插入的位置。
 * 如果 target 已存在，返回它的下标。
 *
 * 目标复杂度：时间 O(log n)，空间 O(1)
 */
function searchInsert(nums, target) {
  // TODO: 找第一个大于等于 target 的位置
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

/**
 * 任务 3：第一次出现的位置
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 *
 * nums 是升序数组，可能包含重复元素。
 * 返回 target 第一次出现的位置，找不到返回 -1。
 *
 * 目标复杂度：时间 O(log n)，空间 O(1)
 */
function firstOccurrence(nums, target) {
  // TODO: 用左边界二分，最后检查 nums[left] 是否等于 target
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return nums[left] === target ? left : -1;
}

/**
 * 任务 4：整数平方根
 *
 * @param {number} x
 * @return {number}
 *
 * 返回 x 的整数平方根，即不超过真实平方根的最大整数。
 *
 * 示例：
 * 8 -> 2
 * 16 -> 4
 *
 * 目标复杂度：时间 O(log x)，空间 O(1)
 */
function integerSqrt(x) {
  // TODO: 在答案范围里二分，找最大的 mid 使 mid * mid <= x
  let left = 0;
  let right = x;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (mid * mid <= x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return right;
}

const tests = [
  {
    name: "binarySearch: target exists",
    run: () => assert.equal(binarySearch([1, 3, 5, 7], 5), 2),
  },
  {
    name: "binarySearch: target missing",
    run: () => assert.equal(binarySearch([1, 3, 5, 7], 6), -1),
  },
  {
    name: "binarySearch: single item",
    run: () => assert.equal(binarySearch([4], 4), 0),
  },
  {
    name: "searchInsert: target exists",
    run: () => assert.equal(searchInsert([1, 3, 5, 6], 5), 2),
  },
  {
    name: "searchInsert: insert in middle",
    run: () => assert.equal(searchInsert([1, 3, 5, 6], 2), 1),
  },
  {
    name: "searchInsert: insert at end",
    run: () => assert.equal(searchInsert([1, 3, 5, 6], 7), 4),
  },
  {
    name: "firstOccurrence: repeated target",
    run: () => assert.equal(firstOccurrence([1, 2, 2, 2, 3], 2), 1),
  },
  {
    name: "firstOccurrence: target missing",
    run: () => assert.equal(firstOccurrence([1, 2, 2, 2, 3], 4), -1),
  },
  {
    name: "firstOccurrence: all equal",
    run: () => assert.equal(firstOccurrence([5, 5, 5], 5), 0),
  },
  {
    name: "integerSqrt: perfect square",
    run: () => assert.equal(integerSqrt(16), 4),
  },
  {
    name: "integerSqrt: non-perfect square",
    run: () => assert.equal(integerSqrt(8), 2),
  },
  {
    name: "integerSqrt: zero",
    run: () => assert.equal(integerSqrt(0), 0),
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
  binarySearch,
  searchInsert,
  firstOccurrence,
  integerSqrt,
};
