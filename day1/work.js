"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：两数之和
 *
 * 给定一个整数数组 nums 和目标值 target，返回两个数的下标，
 * 使它们相加等于 target。
 *
 * 要求：
 * - 返回格式：[index1, index2]
 * - 可以假设每组输入只有一个答案
 * - 同一个元素不能使用两次
 * - 目标复杂度：O(n)
 */
function twoSum(nums, target) {
  // TODO: 用 Map 保存“已经见过的数字 -> 下标”
  return [];
}

/**
 * 任务 2：是否存在重复元素
 *
 * 如果 nums 中任意一个值出现至少两次，返回 true；
 * 如果每个元素都不相同，返回 false。
 *
 * 目标复杂度：O(n)
 */
function containsDuplicate(nums) {
  // TODO: 用 Set 判断数字是否出现过
  return false;
}

/**
 * 任务 3：有效的异位词
 *
 * 如果字符串 s 和 t 中每个字符出现的次数都相同，返回 true；
 * 否则返回 false。
 *
 * 示例：
 * - "anagram" 和 "nagaram" => true
 * - "rat" 和 "car" => false
 *
 * 目标复杂度：O(n)
 */
function isAnagram(s, t) {
  // TODO: 用 Map 统计字符出现次数
  return false;
}

/**
 * 任务 4：第一个只出现一次的字符
 *
 * 给定字符串 s，返回第一个只出现一次的字符下标。
 * 如果不存在，返回 -1。
 *
 * 示例：
 * - "leetcode" => 0，因为 l 只出现一次
 * - "loveleetcode" => 2，因为 v 是第一个只出现一次的字符
 *
 * 目标复杂度：O(n)
 */
function firstUniqueCharIndex(s) {
  // TODO: 先统计次数，再从左到右找第一个次数为 1 的字符
  return -1;
}

function assertTwoSum(actual, nums, target) {
  assert.equal(Array.isArray(actual), true, "twoSum 应返回数组");
  assert.equal(actual.length, 2, "twoSum 应返回两个下标");

  const [left, right] = actual;
  assert.equal(Number.isInteger(left), true, "twoSum 第一个下标应是整数");
  assert.equal(Number.isInteger(right), true, "twoSum 第二个下标应是整数");
  assert.notEqual(left, right, "twoSum 不能重复使用同一个元素");
  assert.equal(nums[left] + nums[right], target, "twoSum 返回的两个数相加应等于 target");
}

const tests = [
  {
    name: "twoSum: [2, 7, 11, 15], target = 9",
    run: () => assertTwoSum(twoSum([2, 7, 11, 15], 9), [2, 7, 11, 15], 9),
  },
  {
    name: "twoSum: [3, 2, 4], target = 6",
    run: () => assertTwoSum(twoSum([3, 2, 4], 6), [3, 2, 4], 6),
  },
  {
    name: "twoSum: [3, 3], target = 6",
    run: () => assertTwoSum(twoSum([3, 3], 6), [3, 3], 6),
  },
  {
    name: "containsDuplicate: has duplicate",
    run: () => assert.equal(containsDuplicate([1, 2, 3, 1]), true),
  },
  {
    name: "containsDuplicate: all unique",
    run: () => assert.equal(containsDuplicate([1, 2, 3, 4]), false),
  },
  {
    name: "containsDuplicate: empty array",
    run: () => assert.equal(containsDuplicate([]), false),
  },
  {
    name: "isAnagram: anagram / nagaram",
    run: () => assert.equal(isAnagram("anagram", "nagaram"), true),
  },
  {
    name: "isAnagram: rat / car",
    run: () => assert.equal(isAnagram("rat", "car"), false),
  },
  {
    name: "isAnagram: length differs",
    run: () => assert.equal(isAnagram("ab", "a"), false),
  },
  {
    name: "firstUniqueCharIndex: leetcode",
    run: () => assert.equal(firstUniqueCharIndex("leetcode"), 0),
  },
  {
    name: "firstUniqueCharIndex: loveleetcode",
    run: () => assert.equal(firstUniqueCharIndex("loveleetcode"), 2),
  },
  {
    name: "firstUniqueCharIndex: no unique character",
    run: () => assert.equal(firstUniqueCharIndex("aabb"), -1),
  },
];

function runTests() {
  let passed = 0;

  for (const test of tests) {
    try {
      test.run();
      passed += 1;
      console.log(`✓ ${test.name}`);
    } catch (error) {
      console.error(`✗ ${test.name}`);
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
  twoSum,
  containsDuplicate,
  isAnagram,
  firstUniqueCharIndex,
};
