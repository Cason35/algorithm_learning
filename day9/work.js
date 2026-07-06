"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：最近请求数量
 *
 * @param {number[]} times
 * @param {number} windowSize
 * @return {number[]}
 *
 * times 按递增顺序给出每次请求的时间。
 * 对每个时间 t，返回 [t - windowSize, t] 范围内的请求数量。
 *
 * 示例：
 * times = [1, 100, 3001, 3002], windowSize = 3000 -> [1, 2, 3, 3]
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function recentRequestCounts(times, windowSize) {
  // TODO: 用队列保存仍在时间窗口内的请求，用 head 指针出队过期请求
  return [];
}

/**
 * 任务 2：数据流移动平均值
 *
 * @param {number[]} values
 * @param {number} size
 * @return {number[]}
 *
 * 给定数据流 values 和窗口大小 size，返回每一步加入新值后的平均值。
 * 当数据数量不足 size 时，用已有数据数量求平均。
 *
 * 示例：
 * values = [1, 10, 3, 5], size = 3 -> [1, 5.5, 4.666666666666667, 6]
 *
 * 目标复杂度：时间 O(n)，空间 O(size)
 */
function movingAverage(values, size) {
  // TODO: 用队列保存窗口内元素，并维护 runningSum
  return [];
}

/**
 * 任务 3：学生排队拿三明治
 *
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 *
 * students 中 0/1 表示学生想吃的三明治类型。
 * sandwiches 中 0/1 表示三明治栈从顶到底的类型。
 * 如果队头学生喜欢当前三明治，就拿走并离队；
 * 否则学生去队尾。
 * 当一整轮都没人能拿当前三明治时，返回剩下学生数量。
 *
 * 示例：
 * students = [1, 1, 0, 0], sandwiches = [0, 1, 0, 1] -> 0
 *
 * 目标复杂度：时间 O(n^2) 的模拟可接受；思考题：如何用计数优化到 O(n)
 */
function countStudentsUnableToEat(students, sandwiches) {
  // TODO: 用队列模拟学生轮转，记录连续跳过的人数避免死循环
  return 0;
}

/**
 * 任务 4：滑动窗口最大值
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 *
 * 给定数组 nums 和窗口大小 k，返回每个窗口中的最大值。
 *
 * 示例：
 * nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3 -> [3, 3, 5, 5, 6, 7]
 *
 * 目标复杂度：时间 O(n)，空间 O(k)
 */
function maxSlidingWindow(nums, k) {
  // TODO: 用单调队列保存下标，队头始终是当前窗口最大值下标
  return [];
}

function assertAlmostArray(actual, expected) {
  assert.equal(actual.length, expected.length, "数组长度不符合预期");

  for (let i = 0; i < expected.length; i++) {
    assert.ok(Math.abs(actual[i] - expected[i]) < 1e-12, `index ${i}: expected ${expected[i]}, got ${actual[i]}`);
  }
}

const tests = [
  {
    name: "recentRequestCounts: classic window",
    run: () => assert.deepEqual(recentRequestCounts([1, 100, 3001, 3002], 3000), [1, 2, 3, 3]),
  },
  {
    name: "recentRequestCounts: old requests expire",
    run: () => assert.deepEqual(recentRequestCounts([1, 2, 3, 10000], 3000), [1, 2, 3, 1]),
  },
  {
    name: "recentRequestCounts: empty input",
    run: () => assert.deepEqual(recentRequestCounts([], 3000), []),
  },
  {
    name: "movingAverage: size 3",
    run: () => assertAlmostArray(movingAverage([1, 10, 3, 5], 3), [1, 5.5, 14 / 3, 6]),
  },
  {
    name: "movingAverage: size 1",
    run: () => assertAlmostArray(movingAverage([4, 0, -2], 1), [4, 0, -2]),
  },
  {
    name: "movingAverage: empty input",
    run: () => assert.deepEqual(movingAverage([], 3), []),
  },
  {
    name: "countStudentsUnableToEat: everyone eats",
    run: () => assert.equal(countStudentsUnableToEat([1, 1, 0, 0], [0, 1, 0, 1]), 0),
  },
  {
    name: "countStudentsUnableToEat: some remain",
    run: () => assert.equal(countStudentsUnableToEat([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]), 3),
  },
  {
    name: "countStudentsUnableToEat: empty queue",
    run: () => assert.equal(countStudentsUnableToEat([], []), 0),
  },
  {
    name: "maxSlidingWindow: standard case",
    run: () => assert.deepEqual(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7]),
  },
  {
    name: "maxSlidingWindow: k is 1",
    run: () => assert.deepEqual(maxSlidingWindow([4, 2, 12], 1), [4, 2, 12]),
  },
  {
    name: "maxSlidingWindow: empty input",
    run: () => assert.deepEqual(maxSlidingWindow([], 3), []),
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
  recentRequestCounts,
  movingAverage,
  countStudentsUnableToEat,
  maxSlidingWindow,
};
