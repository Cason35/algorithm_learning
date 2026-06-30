"use strict";

const assert = require("node:assert/strict");

/**
 * 任务 1：反转字符串
 *
 * @param {string} s
 * @return {string}
 *
 * 给定一个字符串 s，返回反转后的新字符串。
 *
 * 示例：
 * "hello" -> "olleh"
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function reverseString(s) {
  // TODO: 从后往前读取字符，拼出一个新字符串
  return "";
}

/**
 * 任务 2：验证回文字符串
 *
 * @param {string} s
 * @return {boolean}
 *
 * 忽略大小写和非字母数字字符，判断字符串是否是回文。
 *
 * 示例：
 * "A man, a plan, a canal: Panama" -> true
 * "race a car" -> false
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function isValidPalindrome(s) {
  // TODO: 先清洗字符串，只保留字母和数字并统一小写，再判断是否回文
  return false;
}

/**
 * 任务 3：最长公共前缀
 *
 * @param {string[]} strs
 * @return {string}
 *
 * 给定一个字符串数组，返回这些字符串的最长公共前缀。
 * 如果不存在公共前缀，返回空字符串。
 *
 * 示例：
 * ["flower", "flow", "flight"] -> "fl"
 * ["dog", "racecar", "car"] -> ""
 *
 * 目标复杂度：时间 O(n * m)，n 是字符串数量，m 是平均字符串长度
 */
function longestCommonPrefix(strs) {
  // TODO: 用第一个字符串作为候选前缀，逐个和后面的字符串比较
  return "";
}

/**
 * 任务 4：连续字符压缩
 *
 * @param {string} s
 * @return {string}
 *
 * 把连续出现的相同字符压缩成“字符 + 次数”的形式。
 *
 * 示例：
 * "aaabbc" -> "a3b2c1"
 * "abc" -> "a1b1c1"
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function compressRuns(s) {
  // TODO: 扫描字符串，记录当前连续字符和出现次数
  return "";
}

const tests = [
  {
    name: "reverseString: hello",
    run: () => assert.equal(reverseString("hello"), "olleh"),
  },
  {
    name: "reverseString: empty string",
    run: () => assert.equal(reverseString(""), ""),
  },
  {
    name: "reverseString: single character",
    run: () => assert.equal(reverseString("a"), "a"),
  },
  {
    name: "isValidPalindrome: classic true case",
    run: () => assert.equal(isValidPalindrome("A man, a plan, a canal: Panama"), true),
  },
  {
    name: "isValidPalindrome: false case",
    run: () => assert.equal(isValidPalindrome("race a car"), false),
  },
  {
    name: "isValidPalindrome: punctuation only",
    run: () => assert.equal(isValidPalindrome("., "), true),
  },
  {
    name: "longestCommonPrefix: fl",
    run: () => assert.equal(longestCommonPrefix(["flower", "flow", "flight"]), "fl"),
  },
  {
    name: "longestCommonPrefix: no shared prefix",
    run: () => assert.equal(longestCommonPrefix(["dog", "racecar", "car"]), ""),
  },
  {
    name: "longestCommonPrefix: empty input",
    run: () => assert.equal(longestCommonPrefix([]), ""),
  },
  {
    name: "compressRuns: repeated groups",
    run: () => assert.equal(compressRuns("aaabbc"), "a3b2c1"),
  },
  {
    name: "compressRuns: no repeats",
    run: () => assert.equal(compressRuns("abc"), "a1b1c1"),
  },
  {
    name: "compressRuns: empty string",
    run: () => assert.equal(compressRuns(""), ""),
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
  reverseString,
  isValidPalindrome,
  longestCommonPrefix,
  compressRuns,
};
