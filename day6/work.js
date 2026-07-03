"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：构建前缀和数组
 *
 * @param {number[]} nums
 * @return {number[]}
 *
 * 返回长度为 nums.length + 1 的前缀和数组。
 * prefix[0] 应该是 0。
 *
 * 示例：
 * [2, 4, 1, 3] -> [0, 2, 6, 7, 10]
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function buildPrefixSums(nums) {
  // TODO: prefix[i + 1] = prefix[i] + nums[i]
  let prefixSums = [0];
  for (let i = 0; i < nums.length; i++) {
    prefixSums.push(prefixSums[i] + nums[i]);
  }
  return prefixSums;
}

/**
 * 任务 2：区间和查询
 *
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @return {number}
 *
 * 返回 nums 在闭区间 [left, right] 内的元素和。
 *
 * 示例：
 * nums = [2, 4, 1, 3], left = 1, right = 3 -> 8
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function rangeSum(nums, left, right) {
  // TODO: 先构建前缀和，再用 prefix[right + 1] - prefix[left]
  let prefixSums = buildPrefixSums(nums);
  return prefixSums[right + 1] - prefixSums[left];
}

/**
 * 任务 3：和为 k 的连续子数组数量
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 *
 * 返回数组中和为 k 的连续子数组数量。
 *
 * 示例：
 * nums = [1, 1, 1], k = 2 -> 2
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function countSubarraysWithSum(nums, k) {
  // TODO: 用 Map 记录前缀和出现次数，扫描时寻找 currentSum - k
  const map = new Map();
  map.set(0, 1);
  let sum = 0;
  let count = 0;
  for (const num of nums) {
    sum += num;
    if (map.has(sum - k)) {
      count += map.get(sum - k);
    }
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}

/**
 * 任务 4：区间加法
 *
 * @param {number} length
 * @param {number[][]} updates
 * @return {number[]}
 *
 * 初始数组长度为 length，所有元素都是 0。
 * updates 中每一项格式为 [left, right, value]，表示闭区间 [left, right] 都加 value。
 * 返回所有更新后的最终数组。
 *
 * 示例：
 * length = 5, updates = [[1, 3, 2], [2, 4, 3]]
 * 返回 [0, 2, 5, 5, 3]
 *
 * 目标复杂度：时间 O(length + updates.length)，空间 O(length)
 */
function applyRangeUpdates(length, updates) {
  // TODO: 使用差分数组，区间起点加 value，right + 1 位置减 value
  let arr = new Array(length).fill(0);
  for (let i = 0; i < updates.length; i++) {
    let [left, right, value] = updates[i];
    arr[left] += value;
    if (right + 1 < length) {
      arr[right + 1] -= value;
    }
  }
  let prefixSums = buildPrefixSums(arr);
  return prefixSums.slice(1);
}

const tests = [
  {
    name: "buildPrefixSums: basic numbers",
    run: () => assert.deepEqual(buildPrefixSums([2, 4, 1, 3]), [0, 2, 6, 7, 10]),
  },
  {
    name: "buildPrefixSums: empty array",
    run: () => assert.deepEqual(buildPrefixSums([]), [0]),
  },
  {
    name: "buildPrefixSums: includes negative numbers",
    run: () => assert.deepEqual(buildPrefixSums([3, -2, 5]), [0, 3, 1, 6]),
  },
  {
    name: "rangeSum: middle range",
    run: () => assert.equal(rangeSum([2, 4, 1, 3], 1, 3), 8),
  },
  {
    name: "rangeSum: starts at zero",
    run: () => assert.equal(rangeSum([2, 4, 1, 3], 0, 2), 7),
  },
  {
    name: "rangeSum: single item",
    run: () => assert.equal(rangeSum([5], 0, 0), 5),
  },
  {
    name: "countSubarraysWithSum: [1,1,1], k = 2",
    run: () => assert.equal(countSubarraysWithSum([1, 1, 1], 2), 2),
  },
  {
    name: "countSubarraysWithSum: includes negative numbers",
    run: () => assert.equal(countSubarraysWithSum([1, -1, 0], 0), 3),
  },
  {
    name: "countSubarraysWithSum: no answer",
    run: () => assert.equal(countSubarraysWithSum([1, 2, 3], 7), 0),
  },
  {
    name: "applyRangeUpdates: overlapping updates",
    run: () => assert.deepEqual(applyRangeUpdates(5, [[1, 3, 2], [2, 4, 3]]), [0, 2, 5, 5, 3]),
  },
  {
    name: "applyRangeUpdates: update from start to end",
    run: () => assert.deepEqual(applyRangeUpdates(3, [[0, 2, 5]]), [5, 5, 5]),
  },
  {
    name: "applyRangeUpdates: no updates",
    run: () => assert.deepEqual(applyRangeUpdates(4, []), [0, 0, 0, 0]),
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
  buildPrefixSums,
  rangeSum,
  countSubarraysWithSum,
  applyRangeUpdates,
};
