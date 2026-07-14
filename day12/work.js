"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：数字升序排序
 *
 * @param {number[]} nums
 * @return {number[]}
 *
 * 返回一个新的升序数组，不能修改传入的 nums。
 *
 * 目标复杂度：时间 O(n log n)，空间 O(n)
 */
function sortNumbersAsc(nums) {
  // TODO: 注意 JS sort 默认按字符串排序，并且会修改原数组
  return [];
}

/**
 * 任务 2：合并两个有序数组
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *
 * nums1 和 nums2 都已经是升序数组。
 * 返回一个新的升序数组。
 *
 * 目标复杂度：时间 O(n + m)，空间 O(n + m)
 */
function mergeSortedArrays(nums1, nums2) {
  // TODO: 使用两个指针从左到右合并
  return [];
}

/**
 * 任务 3：归并排序
 *
 * @param {number[]} nums
 * @return {number[]}
 *
 * 使用归并排序返回新的升序数组，不能修改传入的 nums。
 *
 * 目标复杂度：时间 O(n log n)，空间 O(n)
 */
function mergeSort(nums) {
  // TODO: 递归拆分数组，再复用 mergeSortedArrays 合并
  return [];
}

/**
 * 任务 4：快速排序
 *
 * @param {number[]} nums
 * @return {number[]}
 *
 * 使用快速排序返回新的升序数组，不能修改传入的 nums。
 *
 * 目标复杂度：平均时间 O(n log n)
 */
function quickSort(nums) {
  // TODO: 选择 pivot，把数组分成小于、等于、大于三部分后递归
  return [];
}

const tests = [
  {
    name: "sortNumbersAsc: numeric sort",
    run: () => assert.deepEqual(sortNumbersAsc([10, 2, 1, 20]), [1, 2, 10, 20]),
  },
  {
    name: "sortNumbersAsc: does not mutate input",
    run: () => {
      const nums = [3, 1, 2];
      const sorted = sortNumbersAsc(nums);

      assert.deepEqual(sorted, [1, 2, 3]);
      assert.deepEqual(nums, [3, 1, 2]);
    },
  },
  {
    name: "sortNumbersAsc: negative numbers",
    run: () => assert.deepEqual(sortNumbersAsc([0, -2, 5, -10]), [-10, -2, 0, 5]),
  },
  {
    name: "mergeSortedArrays: same length",
    run: () => assert.deepEqual(mergeSortedArrays([1, 4, 7], [2, 3, 9]), [1, 2, 3, 4, 7, 9]),
  },
  {
    name: "mergeSortedArrays: one empty array",
    run: () => assert.deepEqual(mergeSortedArrays([], [1, 2, 3]), [1, 2, 3]),
  },
  {
    name: "mergeSortedArrays: repeated values",
    run: () => assert.deepEqual(mergeSortedArrays([1, 2, 2], [2, 3]), [1, 2, 2, 2, 3]),
  },
  {
    name: "mergeSort: sorts unsorted array",
    run: () => assert.deepEqual(mergeSort([5, 2, 4, 1, 3]), [1, 2, 3, 4, 5]),
  },
  {
    name: "mergeSort: does not mutate input",
    run: () => {
      const nums = [4, 1, 3, 2];
      const sorted = mergeSort(nums);

      assert.deepEqual(sorted, [1, 2, 3, 4]);
      assert.deepEqual(nums, [4, 1, 3, 2]);
    },
  },
  {
    name: "mergeSort: already sorted",
    run: () => assert.deepEqual(mergeSort([1, 2, 3]), [1, 2, 3]),
  },
  {
    name: "quickSort: sorts unsorted array",
    run: () => assert.deepEqual(quickSort([8, 3, 5, 3, 1]), [1, 3, 3, 5, 8]),
  },
  {
    name: "quickSort: does not mutate input",
    run: () => {
      const nums = [9, 7, 8];
      const sorted = quickSort(nums);

      assert.deepEqual(sorted, [7, 8, 9]);
      assert.deepEqual(nums, [9, 7, 8]);
    },
  },
  {
    name: "quickSort: handles empty array",
    run: () => assert.deepEqual(quickSort([]), []),
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
  sortNumbersAsc,
  mergeSortedArrays,
  mergeSort,
  quickSort,
};
