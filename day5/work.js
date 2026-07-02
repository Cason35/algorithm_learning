"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：固定窗口最大和
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 *
 * 给定整数数组 nums 和窗口长度 k，返回长度为 k 的连续子数组最大和。
 * 如果 k <= 0 或 k 大于数组长度，返回 0。
 *
 * 示例：
 * nums = [1, 2, 3, 4, 5], k = 2 -> 9，因为 [4, 5] 的和最大
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function maxSumFixedWindow(nums, k) {
  // TODO: 先计算第一个窗口和，再每次加右边新元素、减左边旧元素
  return 0;
}

/**
 * 任务 2：无重复字符的最长子串
 *
 * @param {string} s
 * @return {number}
 *
 * 给定字符串 s，返回不含重复字符的最长子串长度。
 *
 * 示例：
 * "abcabcbb" -> 3，因为 "abc" 长度为 3
 * "bbbbb" -> 1
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function lengthOfLongestSubstring(s) {
  // TODO: 用 Set 维护当前窗口内的字符，遇到重复时移动 left
  return 0;
}

/**
 * 任务 3：长度最小的子数组
 *
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 *
 * 给定一个正整数数组 nums 和目标值 target，
 * 返回和大于等于 target 的最短连续子数组长度。
 * 如果不存在这样的子数组，返回 0。
 *
 * 示例：
 * target = 7, nums = [2, 3, 1, 2, 4, 3] -> 2，因为 [4, 3] 最短
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function minSubArrayLen(target, nums) {
  // TODO: right 扩大窗口累加和；当 sum >= target 时移动 left 缩短窗口
  return 0;
}

/**
 * 任务 4：找到字符串中所有异位词
 *
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 *
 * 返回 s 中所有 p 的异位词子串的起始下标。
 * 可以假设 s 和 p 只包含小写英文字母。
 *
 * 示例：
 * s = "cbaebabacd", p = "abc" -> [0, 6]
 *
 * 目标复杂度：时间 O(n)，空间 O(1)，因为字符集固定为 26 个小写字母
 */
function findAnagramIndices(s, p) {
  // TODO: 用固定长度窗口维护 26 个小写字母的频次差异
  return [];
}

const tests = [
  {
    name: "maxSumFixedWindow: basic positive numbers",
    run: () => assert.equal(maxSumFixedWindow([1, 2, 3, 4, 5], 2), 9),
  },
  {
    name: "maxSumFixedWindow: includes negative numbers",
    run: () => assert.equal(maxSumFixedWindow([-5, -2, -3], 2), -5),
  },
  {
    name: "maxSumFixedWindow: invalid k",
    run: () => assert.equal(maxSumFixedWindow([1, 2], 3), 0),
  },
  {
    name: "lengthOfLongestSubstring: abcabcbb",
    run: () => assert.equal(lengthOfLongestSubstring("abcabcbb"), 3),
  },
  {
    name: "lengthOfLongestSubstring: all same",
    run: () => assert.equal(lengthOfLongestSubstring("bbbbb"), 1),
  },
  {
    name: "lengthOfLongestSubstring: empty string",
    run: () => assert.equal(lengthOfLongestSubstring(""), 0),
  },
  {
    name: "minSubArrayLen: standard case",
    run: () => assert.equal(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]), 2),
  },
  {
    name: "minSubArrayLen: one element is enough",
    run: () => assert.equal(minSubArrayLen(4, [1, 4, 4]), 1),
  },
  {
    name: "minSubArrayLen: no answer",
    run: () => assert.equal(minSubArrayLen(11, [1, 1, 1, 1, 1]), 0),
  },
  {
    name: "findAnagramIndices: cbaebabacd / abc",
    run: () => assert.deepEqual(findAnagramIndices("cbaebabacd", "abc"), [0, 6]),
  },
  {
    name: "findAnagramIndices: overlapping anagrams",
    run: () => assert.deepEqual(findAnagramIndices("abab", "ab"), [0, 1, 2]),
  },
  {
    name: "findAnagramIndices: p longer than s",
    run: () => assert.deepEqual(findAnagramIndices("a", "aa"), []),
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
  maxSumFixedWindow,
  lengthOfLongestSubstring,
  minSubArrayLen,
  findAnagramIndices,
};
