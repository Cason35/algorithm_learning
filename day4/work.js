"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：有序数组的两数之和
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 *
 * 给定一个非递减排序数组 nums 和目标值 target，
 * 返回两个数相加等于 target 的下标。
 *
 * 要求：
 * - 返回格式：[leftIndex, rightIndex]
 * - 如果不存在，返回 [-1, -1]
 * - 同一个元素不能使用两次
 *
 * 示例：
 * nums = [2, 7, 11, 15], target = 9 -> [0, 1]
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function twoSumSorted(nums, target) {
  // TODO: 用 left / right 从两端向中间收缩
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    if (nums[left] + nums[right] === target) {
      return [left, right];
    } else if (nums[left] + nums[right] < target) {
      left++;
    } else {
      right--;
    }
  }
  return [-1, -1];
}

/**
 * 任务 2：左右指针判断回文
 *
 * @param {string} s
 * @return {boolean}
 *
 * 判断字符串 s 是否是严格回文。
 *
 * 注意：
 * - 这里不忽略大小写。
 * - 这里不忽略空格或标点。
 *
 * 示例：
 * "racecar" -> true
 * "Racecar" -> false
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function isPalindromeTwoPointers(s) {
  // TODO: left 从头开始，right 从尾开始，两端字符逐个比较
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

/**
 * 任务 3：原地反转数组
 *
 * @param {number[]} nums
 * @return {void}
 *
 * 原地反转数组 nums。
 *
 * 示例：
 * [1, 2, 3, 4] -> [4, 3, 2, 1]
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function reverseArrayInPlace(nums) {
  // TODO: 用左右指针交换元素
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}

/**
 * 任务 4：有序数组的平方
 *
 * @param {number[]} nums
 * @return {number[]}
 *
 * 给定一个非递减排序数组 nums，返回每个数字的平方组成的新数组，
 * 要求返回的新数组也按非递减顺序排序。
 *
 * 示例：
 * [-4, -1, 0, 3, 10] -> [0, 1, 9, 16, 100]
 *
 * 提示：
 * - 最大平方值一定来自当前最左或最右。
 * - 可以从结果数组末尾开始写。
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function sortedSquares(nums) {
  // TODO: 用 left / right 比较两端绝对值，把较大平方写到结果数组末尾
  let left = 0;
  let right = nums.length - 1;
  const result = new Array(nums.length);
  let write = nums.length - 1;

  while (left <= right) {
    if (Math.abs(nums[left]) > Math.abs(nums[right])) {
      result[write] = nums[left] * nums[left];
      left++;
    } else {
      result[write] = nums[right] * nums[right];
      right--;
    }
    write--;
  }

  return result;
}

function assertTwoSumSorted(actual, nums, target, expected) {
  assert.deepEqual(actual, expected);

  if (expected[0] !== -1) {
    const [left, right] = actual;
    assert.notEqual(left, right, "不能重复使用同一个元素");
    assert.equal(nums[left] + nums[right], target, "返回下标对应的两个数之和应等于 target");
  }
}

const tests = [
  {
    name: "twoSumSorted: standard case",
    run: () => assertTwoSumSorted(twoSumSorted([2, 7, 11, 15], 9), [2, 7, 11, 15], 9, [0, 1]),
  },
  {
    name: "twoSumSorted: includes negative numbers",
    run: () => assertTwoSumSorted(twoSumSorted([-3, -1, 0, 2, 4, 6], 3), [-3, -1, 0, 2, 4, 6], 3, [0, 5]),
  },
  {
    name: "twoSumSorted: no answer",
    run: () => assertTwoSumSorted(twoSumSorted([1, 2, 3], 100), [1, 2, 3], 100, [-1, -1]),
  },
  {
    name: "isPalindromeTwoPointers: odd length true",
    run: () => assert.equal(isPalindromeTwoPointers("racecar"), true),
  },
  {
    name: "isPalindromeTwoPointers: even length true",
    run: () => assert.equal(isPalindromeTwoPointers("abba"), true),
  },
  {
    name: "isPalindromeTwoPointers: case sensitive",
    run: () => assert.equal(isPalindromeTwoPointers("Racecar"), false),
  },
  {
    name: "reverseArrayInPlace: even length",
    run: () => {
      const nums = [1, 2, 3, 4];
      reverseArrayInPlace(nums);
      assert.deepEqual(nums, [4, 3, 2, 1]);
    },
  },
  {
    name: "reverseArrayInPlace: odd length",
    run: () => {
      const nums = [1, 2, 3];
      reverseArrayInPlace(nums);
      assert.deepEqual(nums, [3, 2, 1]);
    },
  },
  {
    name: "reverseArrayInPlace: empty array",
    run: () => {
      const nums = [];
      reverseArrayInPlace(nums);
      assert.deepEqual(nums, []);
    },
  },
  {
    name: "sortedSquares: mixed negative and positive",
    run: () => assert.deepEqual(sortedSquares([-4, -1, 0, 3, 10]), [0, 1, 9, 16, 100]),
  },
  {
    name: "sortedSquares: all negative",
    run: () => assert.deepEqual(sortedSquares([-7, -3, -1]), [1, 9, 49]),
  },
  {
    name: "sortedSquares: all positive",
    run: () => assert.deepEqual(sortedSquares([1, 2, 3]), [1, 4, 9]),
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
  twoSumSorted,
  isPalindromeTwoPointers,
  reverseArrayInPlace,
  sortedSquares,
};
