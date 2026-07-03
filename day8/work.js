"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：有效括号
 *
 * @param {string} s
 * @return {boolean}
 *
 * 判断只包含 '(', ')', '[', ']', '{', '}' 的字符串是否合法。
 *
 * 示例：
 * "()[]{}" -> true
 * "([)]" -> false
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function isValidParentheses(s) {
  // TODO: 左括号入栈，右括号检查并弹出对应左括号
  return false;
}

/**
 * 任务 2：简化路径
 *
 * @param {string} path
 * @return {string}
 *
 * 给定 Unix 风格绝对路径，返回简化后的规范路径。
 *
 * 示例：
 * "/a/./b/../../c/" -> "/c"
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function simplifyPath(path) {
  // TODO: 用栈保存有效目录名，遇到 .. 就返回上一级
  return "";
}

/**
 * 任务 3：删除相邻重复字符
 *
 * @param {string} s
 * @return {string}
 *
 * 不断删除相邻且相同的两个字符，返回最终字符串。
 *
 * 示例：
 * "abbaca" -> "ca"
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function removeAdjacentDuplicates(s) {
  // TODO: 当前字符和栈顶相同就弹栈，否则入栈
  return "";
}

/**
 * 任务 4：每日温度
 *
 * @param {number[]} temperatures
 * @return {number[]}
 *
 * 给定每天的温度，返回每一天需要等几天才会出现更高温度。
 * 如果之后没有更高温度，对应位置为 0。
 *
 * 示例：
 * [73, 74, 75, 71, 69, 72, 76, 73] -> [1, 1, 4, 2, 1, 1, 0, 0]
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function dailyTemperatures(temperatures) {
  // TODO: 用单调栈保存还没找到更高温度的下标
  return [];
}

const tests = [
  {
    name: "isValidParentheses: simple valid",
    run: () => assert.equal(isValidParentheses("()[]{}"), true),
  },
  {
    name: "isValidParentheses: nested valid",
    run: () => assert.equal(isValidParentheses("({[]})"), true),
  },
  {
    name: "isValidParentheses: invalid order",
    run: () => assert.equal(isValidParentheses("([)]"), false),
  },
  {
    name: "simplifyPath: complex path",
    run: () => assert.equal(simplifyPath("/a/./b/../../c/"), "/c"),
  },
  {
    name: "simplifyPath: root stays root",
    run: () => assert.equal(simplifyPath("/../"), "/"),
  },
  {
    name: "simplifyPath: repeated slashes",
    run: () => assert.equal(simplifyPath("/home//foo/"), "/home/foo"),
  },
  {
    name: "removeAdjacentDuplicates: abbaca",
    run: () => assert.equal(removeAdjacentDuplicates("abbaca"), "ca"),
  },
  {
    name: "removeAdjacentDuplicates: all removed",
    run: () => assert.equal(removeAdjacentDuplicates("azxxzy"), "ay"),
  },
  {
    name: "removeAdjacentDuplicates: empty string",
    run: () => assert.equal(removeAdjacentDuplicates(""), ""),
  },
  {
    name: "dailyTemperatures: standard case",
    run: () => assert.deepEqual(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]), [1, 1, 4, 2, 1, 1, 0, 0]),
  },
  {
    name: "dailyTemperatures: increasing",
    run: () => assert.deepEqual(dailyTemperatures([30, 40, 50, 60]), [1, 1, 1, 0]),
  },
  {
    name: "dailyTemperatures: decreasing",
    run: () => assert.deepEqual(dailyTemperatures([60, 50, 40]), [0, 0, 0]),
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
  isValidParentheses,
  simplifyPath,
  removeAdjacentDuplicates,
  dailyTemperatures,
};
