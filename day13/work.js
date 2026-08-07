"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：阶乘
 *
 * @param {number} n 非负整数
 * @return {number}
 *
 * 使用递归返回 n!。
 * 约定：0! = 1。
 *
 * 目标复杂度：时间 O(n)，调用栈空间 O(n)
 */
function factorial(n) {
  // TODO: 先写终止条件，再把问题缩小为 factorial(n - 1)
  return undefined;
}

/**
 * 任务 2：递归求数组和
 *
 * @param {number[]} nums
 * @return {number}
 *
 * 递归计算 nums 中所有数字的和，不能修改传入的 nums。
 * 请使用下标推进，不要在每层递归中用 slice 复制剩余数组。
 *
 * 目标复杂度：时间 O(n)，调用栈空间 O(n)
 */
function recursiveSum(nums) {
  // TODO: 可以定义一个 sumFrom(index) 辅助函数
  return undefined;
}

/**
 * 任务 3：快速幂
 *
 * @param {number} base
 * @param {number} exponent 非负整数
 * @return {number}
 *
 * 使用递归计算 base 的 exponent 次幂。
 * 约定：任何数的 0 次幂在本题中都返回 1。
 * 不要使用 ** 或 Math.pow() 直接得到答案。
 *
 * 目标复杂度：时间 O(log exponent)，调用栈空间 O(log exponent)
 */
function fastPower(base, exponent) {
  // TODO: 递归计算一半的幂并保存结果，再根据 exponent 的奇偶性组合答案
  return undefined;
}

/**
 * @typedef {(number | NestedNumberArray)[]} NestedNumberArray
 */

/**
 * 任务 4：展开嵌套数组
 *
 * @param {NestedNumberArray} items
 * @return {number[]}
 *
 * 递归展开任意深度的数字数组，保持元素原有顺序。
 * 不能使用 Array.prototype.flat()，也不能修改传入的 items。
 *
 * 目标复杂度：时间 O(n)，调用栈空间 O(d)
 * n 是访问到的元素总数，d 是最大嵌套深度；返回结果所占空间不计入额外空间。
 */
function flattenArray(items) {
  // TODO: 遍历 items；数字直接加入结果，数组则递归展开
  return undefined;
}

const tests = [
  {
    name: "factorial: positive integer",
    run: () => assert.equal(factorial(5), 120),
  },
  {
    name: "factorial: zero",
    run: () => assert.equal(factorial(0), 1),
  },
  {
    name: "factorial: one",
    run: () => assert.equal(factorial(1), 1),
  },
  {
    name: "recursiveSum: regular array",
    run: () => assert.equal(recursiveSum([2, 4, 6, 8]), 20),
  },
  {
    name: "recursiveSum: empty array",
    run: () => assert.equal(recursiveSum([]), 0),
  },
  {
    name: "recursiveSum: negatives and no mutation",
    run: () => {
      const nums = [5, -2, -3, 10];

      assert.equal(recursiveSum(nums), 10);
      assert.deepEqual(nums, [5, -2, -3, 10]);
    },
  },
  {
    name: "fastPower: even exponent",
    run: () => assert.equal(fastPower(2, 10), 1024),
  },
  {
    name: "fastPower: odd exponent",
    run: () => assert.equal(fastPower(3, 5), 243),
  },
  {
    name: "fastPower: zero exponent and negative base",
    run: () => {
      assert.equal(fastPower(7, 0), 1);
      assert.equal(fastPower(-2, 3), -8);
    },
  },
  {
    name: "flattenArray: deeply nested array",
    run: () => assert.deepEqual(flattenArray([1, [2, [3, 4], 5], 6]), [1, 2, 3, 4, 5, 6]),
  },
  {
    name: "flattenArray: empty arrays",
    run: () => assert.deepEqual(flattenArray([[], [1, []], []]), [1]),
  },
  {
    name: "flattenArray: does not mutate input",
    run: () => {
      const items = [[1, 2], [3, [4]]];

      assert.deepEqual(flattenArray(items), [1, 2, 3, 4]);
      assert.deepEqual(items, [[1, 2], [3, [4]]]);
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
  factorial,
  recursiveSum,
  fastPower,
  flattenArray,
};
