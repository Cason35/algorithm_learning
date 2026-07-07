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
  const queue = []; // 用数组模拟队列，保存仍在时间窗口内的请求时间
  const result = []; // 存放每个时刻对应的窗口内请求数量
  let head = 0; // 队头指针，指向当前队列中最旧的有效请求（替代 shift 出队）
  for (const time of times) { // 按时间顺序遍历每一次请求
    queue.push(time); // 将当前请求时间追加到队尾
    while (queue[head] < time - windowSize) { // 队头请求已早于窗口左边界 [time - windowSize, time]，视为过期
      head++; // 仅移动指针，逻辑出队过期请求，避免 shift() 的 O(n) 开销
    }
    result.push(queue.length - head); // 有效元素个数 = 数组总长 - 已跳过的 head 个过期元素
  }
  return result; // 返回每个时刻的窗口内请求数量数组
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
  const queue = []; // 用数组模拟队列，保存当前滑动窗口内的数值
  const result = []; // 存放每一步计算出的移动平均值
  let runningSum = 0; // 窗口内所有有效元素的总和，避免每次重新求和
  let head = 0; // 队头指针，指向窗口内最旧的有效元素（替代 shift 出队）
  for (const value of values) { // 按数据流顺序遍历每一个新值
    queue.push(value); // 将新值追加到队尾
    runningSum += value; // 累加新值到窗口总和
    if (queue.length - head > size) { // 有效元素超过窗口大小 size，需要移除最旧的
      runningSum -= queue[head]; // 从总和中减去即将出队的队头元素
      head++; // 移动队头指针，逻辑出队，避免 shift() 的 O(n) 开销
    }
    result.push(runningSum / (queue.length - head)); // 用当前有效元素个数求平均并记录
  }
  return result; // 返回每一步的移动平均值数组
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
  const studentQueue = [...students]; // 复制学生数组作为队列，0/1 表示偏好的三明治类型
  const sandwichStack = [...sandwiches]; // 复制三明治数组，栈顶在索引 0
  let studentHead = 0; // 学生队头指针，指向当前排在最前的学生（替代 shift 出队）
  let sandwichHead = 0; // 三明治栈顶指针，指向当前可拿的三明治（替代 shift 出队）
  let skipCount = 0; // 连续跳过当前三明治的学生人数，用于检测死循环

  while (studentQueue.length - studentHead > 0 && sandwichStack.length - sandwichHead > 0) { // 学生和三明治都还有剩余时继续模拟
    if (studentQueue[studentHead] === sandwichStack[sandwichHead]) { // 队头学生喜欢栈顶三明治
      studentHead++; // 学生拿走三明治后离队，移动学生队头指针
      sandwichHead++; // 栈顶三明治被取走，移动栈顶指针
      skipCount = 0; // 有人成功取餐，重置连续跳过计数
    } else { // 队头学生不喜欢当前三明治
      studentQueue.push(studentQueue[studentHead]); // 将该学生移到队尾，等待下一轮
      studentHead++; // 移动队头指针，逻辑出队该学生，避免 shift() 的 O(n) 开销
      skipCount++; // 连续跳过人数加一
      if (skipCount === studentQueue.length - studentHead) { // 一整轮无人拿三明治，流程结束
        return studentQueue.length - studentHead; // 返回剩余无法就餐的学生数量
      }
    }
  }

  return studentQueue.length - studentHead; // 三明治发完或学生全部取完，返回剩余学生数
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
  const queue = []; // 单调递减队列，存下标，队头对应当前窗口最大值
  const result = []; // 存放每个滑动窗口的最大值
  let head = 0; // 队头指针，指向当前有效的最大下标（替代 shift 出队）

  for (let i = 0; i < nums.length; i++) { // 遍历数组，右端扩展窗口
    while (head < queue.length && queue[head] <= i - k) { // 队头下标已滑出窗口左边界 [i-k+1, i]
      head++; // 移动指针，逻辑出队过期下标，避免 shift() 的 O(n) 开销
    }
    if (head >= queue.length) { // 队头指针已超过数组末尾，说明队列逻辑上已空
      head = 0; // 重置队头指针到数组起点
      queue.length = 0; // 清空数组中的过期残留，避免 head 与 length 不一致
    }
    while (queue.length > head && nums[queue[queue.length - 1]] < nums[i]) { // 队尾元素比当前值小，不可能成为窗口最大值
      queue.pop(); // 从队尾弹出较小下标，保持队列单调递减
    }
    if (head >= queue.length) { // 队尾 pop 后队列可能再次变空，需再次重置
      head = 0; // 重置队头指针
      queue.length = 0; // 清空残留
    }
    queue.push(i); // 将当前下标入队
    if (i >= k - 1) { // 窗口已形成（至少包含 k 个元素）
      result.push(nums[queue[head]]); // 队头下标对应最大值，写入结果
    }
  }

  return result; // 返回每个窗口的最大值数组
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
