"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：稳定去重
 *
 * @param {number[]} nums
 * @return {number[]}
 *
 * 返回去重后的新数组，并保留每个数字第一次出现的顺序。
 *
 * 示例：
 * [3, 1, 3, 2, 1] -> [3, 1, 2]
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function dedupeStable(nums) {
  // TODO: 用 Set 记录已经出现过的数字，用数组保存结果
  let set = new Set();
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    if (!set.has(nums[i])) {
      set.add(nums[i]);
      result.push(nums[i]);
    }
  }
  return result;
}

/**
 * 任务 2：清洗后判断回文
 *
 * @param {string} s
 * @return {boolean}
 *
 * 忽略大小写和非字母数字字符，判断字符串是否是回文。
 *
 * 示例：
 * "A man, a plan, a canal: Panama" -> true
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function isCleanPalindrome(s) {
  // TODO: 用左右指针；遇到非字母数字字符就跳过
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    while (left < right && !/^[a-zA-Z0-9]$/.test(s[left])) {
      left++;
    }
    while (left < right && !/^[a-zA-Z0-9]$/.test(s[right])) {
      right--;
    }
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

/**
 * 任务 3：最多 k 种不同字符的最长子串
 *
 * @param {string} s
 * @param {number} k
 * @return {number}
 *
 * 返回 s 中最多包含 k 种不同字符的最长子串长度。
 *
 * 示例：
 * s = "eceba", k = 2 -> 3，因为 "ece" 最长
 *
 * 目标复杂度：时间 O(n)，空间 O(k)
 */
function longestSubstringAtMostKDistinct(s, k) {
  // TODO: 用滑动窗口 + Map 维护窗口内每个字符的出现次数
  let map = new Map();
  let left = 0;
  let right = 0;
  let maxLength = 0;
  while (right < s.length) {
    if (map.size <= k) {
      map.set(s[right], (map.get(s[right]) || 0) + 1);
      right++;
      while (map.size > k) {
        map.set(s[left], map.get(s[left]) - 1);
        if (map.get(s[left]) === 0) {
          map.delete(s[left]);
        }
        left++;
      }
      maxLength = Math.max(maxLength, right - left);
    }
  }
  return maxLength;
}

/**
 * 任务 4：0 和 1 数量相等的子数组数量
 *
 * @param {number[]} nums
 * @return {number}
 *
 * nums 只包含 0 和 1。
 * 返回 0 和 1 数量相等的连续子数组数量。
 *
 * 提示：
 * - 把 0 当作 -1，把 1 当作 +1。
 * - 问题就变成统计和为 0 的子数组数量。
 *
 * 示例：
 * [0, 1, 0] -> 2，对应 [0, 1] 和 [1, 0]
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function countEqualZeroOneSubarrays(nums) {
  // TODO: 用前缀和 + Map 统计相同前缀和出现次数
  let count = 0;
  let prefixSum = 0;
  let map = new Map([[0, 1]]);
  for (const num of nums) {
    prefixSum += num === 0 ? -1 : 1;
    count += map.get(prefixSum) || 0;  // 先累加「之前见过几次相同前缀和」
    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);  // 再更新 map
  }
  return count;
}

const tests = [
  {
    name: "dedupeStable: preserves first occurrence order",
    run: () => assert.deepEqual(dedupeStable([3, 1, 3, 2, 1]), [3, 1, 2]),
  },
  {
    name: "dedupeStable: already unique",
    run: () => assert.deepEqual(dedupeStable([1, 2, 3]), [1, 2, 3]),
  },
  {
    name: "dedupeStable: empty array",
    run: () => assert.deepEqual(dedupeStable([]), []),
  },
  {
    name: "isCleanPalindrome: classic true case",
    run: () => assert.equal(isCleanPalindrome("A man, a plan, a canal: Panama"), true),
  },
  {
    name: "isCleanPalindrome: false case",
    run: () => assert.equal(isCleanPalindrome("race a car"), false),
  },
  {
    name: "isCleanPalindrome: punctuation only",
    run: () => assert.equal(isCleanPalindrome("., "), true),
  },
  {
    name: "longestSubstringAtMostKDistinct: eceba / 2",
    run: () => assert.equal(longestSubstringAtMostKDistinct("eceba", 2), 3),
  },
  {
    name: "longestSubstringAtMostKDistinct: aa / 1",
    run: () => assert.equal(longestSubstringAtMostKDistinct("aa", 1), 2),
  },
  {
    name: "longestSubstringAtMostKDistinct: k is zero",
    run: () => assert.equal(longestSubstringAtMostKDistinct("abc", 0), 0),
  },
  {
    name: "countEqualZeroOneSubarrays: [0, 1]",
    run: () => assert.equal(countEqualZeroOneSubarrays([0, 1]), 1),
  },
  {
    name: "countEqualZeroOneSubarrays: [0, 1, 0]",
    run: () => assert.equal(countEqualZeroOneSubarrays([0, 1, 0]), 2),
  },
  {
    name: "countEqualZeroOneSubarrays: [0, 1, 0, 1]",
    run: () => assert.equal(countEqualZeroOneSubarrays([0, 1, 0, 1]), 4),
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
  dedupeStable,
  isCleanPalindrome,
  longestSubstringAtMostKDistinct,
  countEqualZeroOneSubarrays,
};
