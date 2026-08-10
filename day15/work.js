"use strict";

const assert = require("node:assert/strict");

class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

/**
 * 任务 1：二叉树前序遍历
 *
 * @param {TreeNode | null} root
 * @return {number[]}
 *
 * 使用递归，按照“根 -> 左 -> 右”的顺序返回所有节点值。
 * 不能修改输入树。
 *
 * 示例输入：
 * const root = buildTree([1, 2, 3, 4, 5]);
 * preorderTraversal(root);
 *
 * 输入表示的树：
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 *
 * 最终输出：[1, 2, 4, 5, 3]
 *
 * 目标复杂度：时间 O(n)，递归栈空间 O(h)，返回结果空间 O(n)
 */
function preorderTraversal(root) {
  // TODO: 在递归处理左右子树之前记录当前节点
  return undefined;
}

/**
 * 任务 2：二叉树中序遍历
 *
 * @param {TreeNode | null} root
 * @return {number[]}
 *
 * 使用递归，按照“左 -> 根 -> 右”的顺序返回所有节点值。
 * 不能修改输入树。
 *
 * 示例输入：
 * const root = buildTree([1, 2, 3, 4, 5]);
 * inorderTraversal(root);
 *
 * 输入表示的树：
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 *
 * 最终输出：[4, 2, 5, 1, 3]
 *
 * 目标复杂度：时间 O(n)，递归栈空间 O(h)，返回结果空间 O(n)
 */
function inorderTraversal(root) {
  // TODO: 在左子树处理完成后、右子树处理前记录当前节点
  return undefined;
}

/**
 * 任务 3：二叉树后序遍历
 *
 * @param {TreeNode | null} root
 * @return {number[]}
 *
 * 使用递归，按照“左 -> 右 -> 根”的顺序返回所有节点值。
 * 不能修改输入树。
 *
 * 示例输入：
 * const root = buildTree([1, 2, 3, 4, 5]);
 * postorderTraversal(root);
 *
 * 输入表示的树：
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 *
 * 最终输出：[4, 5, 2, 3, 1]
 *
 * 目标复杂度：时间 O(n)，递归栈空间 O(h)，返回结果空间 O(n)
 */
function postorderTraversal(root) {
  // TODO: 在左右子树都处理完成后记录当前节点
  return undefined;
}

/**
 * 任务 4：二叉树最大深度
 *
 * @param {TreeNode | null} root
 * @return {number}
 *
 * 使用递归返回从根节点到最远叶子节点所经过的节点数量。
 * 空树深度为 0，不能修改输入树。
 *
 * 示例输入：
 * const root = buildTree([1, 2, 3, 4, 5]);
 * maxDepth(root);
 *
 * 输入表示的树：
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 *
 * 最终输出：3
 * 原因：最长路径可以是 1 -> 2 -> 4，共经过 3 个节点。
 *
 * 目标复杂度：时间 O(n)，递归栈空间 O(h)
 */
function maxDepth(root) {
  // TODO: 空树返回 0；非空树返回 1 + 左右子树深度的较大值
  return undefined;
}

/**
 * 按层序数组创建二叉树，null 表示该位置没有节点。
 *
 * @param {(number | null)[]} values
 * @return {TreeNode | null}
 *
 * 示例：buildTree([1, null, 2, 3]) 创建的树为：
 *   1
 *    \
 *     2
 *    /
 *   3
 */
function buildTree(values) {
  if (values.length === 0 || values[0] === null) {
    return null;
  }

  const root = new TreeNode(values[0]);
  const queue = [root];
  let head = 0;
  let index = 1;

  while (head < queue.length && index < values.length) {
    const node = queue[head];
    head += 1;

    if (values[index] !== null && values[index] !== undefined) {
      node.left = new TreeNode(values[index]);
      queue.push(node.left);
    }
    index += 1;

    if (index < values.length && values[index] !== null && values[index] !== undefined) {
      node.right = new TreeNode(values[index]);
      queue.push(node.right);
    }
    index += 1;
  }

  return root;
}

/**
 * 把树还原成层序数组，用于检查作业函数没有修改输入树。
 *
 * @param {TreeNode | null} root
 * @return {(number | null)[]}
 */
function treeToLevelOrder(root) {
  if (root === null) {
    return [];
  }

  const result = [];
  const queue = [root];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head];
    head += 1;

    if (node === null) {
      result.push(null);
      continue;
    }

    result.push(node.value);
    queue.push(node.left);
    queue.push(node.right);
  }

  while (result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

const tests = [
  {
    name: "preorderTraversal: branching tree",
    run: () => assert.deepEqual(preorderTraversal(buildTree([1, 2, 3, 4, 5])), [1, 2, 4, 5, 3]),
  },
  {
    name: "preorderTraversal: right-skewed tree",
    run: () => assert.deepEqual(preorderTraversal(buildTree([1, null, 2, null, 3])), [1, 2, 3]),
  },
  {
    name: "preorderTraversal: empty tree and no mutation",
    run: () => {
      const root = buildTree([1, 2, 3, null, 4]);

      assert.deepEqual(preorderTraversal(null), []);
      assert.deepEqual(preorderTraversal(root), [1, 2, 4, 3]);
      assert.deepEqual(treeToLevelOrder(root), [1, 2, 3, null, 4]);
    },
  },
  {
    name: "inorderTraversal: branching tree",
    run: () => assert.deepEqual(inorderTraversal(buildTree([1, 2, 3, 4, 5])), [4, 2, 5, 1, 3]),
  },
  {
    name: "inorderTraversal: left-skewed tree",
    run: () => assert.deepEqual(inorderTraversal(buildTree([3, 2, null, 1])), [1, 2, 3]),
  },
  {
    name: "inorderTraversal: empty tree",
    run: () => assert.deepEqual(inorderTraversal(null), []),
  },
  {
    name: "postorderTraversal: branching tree",
    run: () => assert.deepEqual(postorderTraversal(buildTree([1, 2, 3, 4, 5])), [4, 5, 2, 3, 1]),
  },
  {
    name: "postorderTraversal: uneven tree",
    run: () => assert.deepEqual(postorderTraversal(buildTree([1, null, 2, 3])), [3, 2, 1]),
  },
  {
    name: "postorderTraversal: empty tree",
    run: () => assert.deepEqual(postorderTraversal(null), []),
  },
  {
    name: "maxDepth: branching tree",
    run: () => assert.equal(maxDepth(buildTree([1, 2, 3, 4, 5])), 3),
  },
  {
    name: "maxDepth: empty and single-node trees",
    run: () => {
      assert.equal(maxDepth(null), 0);
      assert.equal(maxDepth(buildTree([7])), 1);
    },
  },
  {
    name: "maxDepth: skewed tree",
    run: () => assert.equal(maxDepth(buildTree([1, null, 2, null, 3, null, 4])), 4),
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
  TreeNode,
  preorderTraversal,
  inorderTraversal,
  postorderTraversal,
  maxDepth,
  buildTree,
  treeToLevelOrder,
};
