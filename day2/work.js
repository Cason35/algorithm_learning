"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：移除元素
 *
 * 给定数组 nums 和值 val，原地移除所有等于 val 的元素。
 * 返回移除后数组的有效长度 k。
 *
 * 注意：
 * - 只需要保证 nums 的前 k 个元素是不等于 val 的元素。
 * - k 之后的内容不重要。
 * - 不要新建一个数组来完成。
 *
 * 示例：
 * nums = [3, 2, 2, 3], val = 3
 * 返回 2，并且 nums 前两个元素应该是 [2, 2]
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function removeElement(nums, val) {
  // TODO: 用 write 指针记录下一个有效元素应该放的位置
  return 0;
}

/**
 * 任务 2：移动零
 *
 * 给定数组 nums，原地将所有 0 移动到数组末尾，
 * 同时保持非零元素的相对顺序。
 *
 * 示例：
 * [0, 1, 0, 3, 12] -> [1, 3, 12, 0, 0]
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function moveZeroes(nums) {
  // TODO: 先把非零元素写到前面，再把剩余位置补 0
}

/**
 * 任务 3：删除有序数组中的重复项
 *
 * 给定一个非递减排序数组 nums，原地删除重复出现的元素，
 * 使每个元素只出现一次，返回删除后数组的新长度 k。
 *
 * 注意：
 * - 只需要保证 nums 的前 k 个元素是去重后的结果。
 * - 原数组已经有序，这是这题的关键条件。
 *
 * 示例：
 * [0, 0, 1, 1, 1, 2, 2, 3] -> 前 4 个元素为 [0, 1, 2, 3]
 *
 * 目标复杂度：时间 O(n)，空间 O(1)
 */
function removeDuplicatesSorted(nums) {
  // TODO: 用 write 指针保存下一个不重复元素的位置
  return 0;
}

/**
 * 任务 4：合并两个有序数组
 *
 * nums1 的长度是 m + n，其中前 m 个元素有效，后 n 个位置为占位。
 * nums2 的长度是 n。
 * 请把 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 *
 * 示例：
 * nums1 = [1, 2, 3, 0, 0, 0], m = 3
 * nums2 = [2, 5, 6], n = 3
 * 合并后 nums1 = [1, 2, 2, 3, 5, 6]
 *
 * 提示：
 * - 从后往前合并，避免覆盖 nums1 中还没比较的元素。
 *
 * 目标复杂度：时间 O(m + n)，空间 O(1)
 */
function mergeSortedArrays(nums1, m, nums2, n) {
  // TODO: 使用三个指针：i 指向 nums1 有效区末尾，j 指向 nums2 末尾，write 指向 nums1 总末尾
}

function assertPrefix(actualArray, k, expectedPrefix) {
  assert.equal(k, expectedPrefix.length, "返回的有效长度不正确");
  assert.deepEqual(actualArray.slice(0, k), expectedPrefix, "数组前 k 个元素不符合预期");
}

const tests = [
  {
    name: "removeElement: remove 3 from [3, 2, 2, 3]",
    run: () => {
      const nums = [3, 2, 2, 3];
      const k = removeElement(nums, 3);
      assertPrefix(nums, k, [2, 2]);
    },
  },
  {
    name: "removeElement: remove all values",
    run: () => {
      const nums = [1, 1, 1];
      const k = removeElement(nums, 1);
      assertPrefix(nums, k, []);
    },
  },
  {
    name: "removeElement: no values removed",
    run: () => {
      const nums = [4, 5];
      const k = removeElement(nums, 3);
      assertPrefix(nums, k, [4, 5]);
    },
  },
  {
    name: "moveZeroes: mixed zeroes",
    run: () => {
      const nums = [0, 1, 0, 3, 12];
      moveZeroes(nums);
      assert.deepEqual(nums, [1, 3, 12, 0, 0]);
    },
  },
  {
    name: "moveZeroes: all zeroes",
    run: () => {
      const nums = [0, 0];
      moveZeroes(nums);
      assert.deepEqual(nums, [0, 0]);
    },
  },
  {
    name: "moveZeroes: no zeroes",
    run: () => {
      const nums = [1, 2, 3];
      moveZeroes(nums);
      assert.deepEqual(nums, [1, 2, 3]);
    },
  },
  {
    name: "removeDuplicatesSorted: repeated numbers",
    run: () => {
      const nums = [0, 0, 1, 1, 1, 2, 2, 3];
      const k = removeDuplicatesSorted(nums);
      assertPrefix(nums, k, [0, 1, 2, 3]);
    },
  },
  {
    name: "removeDuplicatesSorted: single item",
    run: () => {
      const nums = [7];
      const k = removeDuplicatesSorted(nums);
      assertPrefix(nums, k, [7]);
    },
  },
  {
    name: "removeDuplicatesSorted: empty array",
    run: () => {
      const nums = [];
      const k = removeDuplicatesSorted(nums);
      assertPrefix(nums, k, []);
    },
  },
  {
    name: "mergeSortedArrays: standard case",
    run: () => {
      const nums1 = [1, 2, 3, 0, 0, 0];
      mergeSortedArrays(nums1, 3, [2, 5, 6], 3);
      assert.deepEqual(nums1, [1, 2, 2, 3, 5, 6]);
    },
  },
  {
    name: "mergeSortedArrays: nums2 is empty",
    run: () => {
      const nums1 = [1];
      mergeSortedArrays(nums1, 1, [], 0);
      assert.deepEqual(nums1, [1]);
    },
  },
  {
    name: "mergeSortedArrays: nums1 has no valid items",
    run: () => {
      const nums1 = [0];
      mergeSortedArrays(nums1, 0, [1], 1);
      assert.deepEqual(nums1, [1]);
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
  removeElement,
  moveZeroes,
  removeDuplicatesSorted,
  mergeSortedArrays,
};
