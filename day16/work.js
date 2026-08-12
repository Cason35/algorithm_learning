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
 * 任务 1：二叉树层序遍历
 *
 * @param {TreeNode | null} root
 * @return {number[][]}
 *
 * 使用 BFS 按层返回节点值，不能修改输入树。
 *
 * 示例输入：
 * const root = buildTree([3, 9, 20, null, null, 15, 7]);
 * levelOrder(root);
 *
 * 输入表示的树：
 *       3
 *      / \
 *     9   20
 *        /  \
 *       15   7
 *
 * 最终输出：[[3], [9, 20], [15, 7]]
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function levelOrder(root) {
  // TODO: 用队列进行 BFS；每层开始前固定本层节点数量
  return undefined;
}

/**
 * 任务 2：二叉树右视图
 *
 * @param {TreeNode | null} root
 * @return {number[]}
 *
 * 返回从二叉树右侧能够看到的节点值，每层只保留最右侧节点。
 * 不能修改输入树。
 *
 * 示例输入：
 * const root = buildTree([3, 9, 20, null, null, 15, 7]);
 * rightSideView(root);
 *
 * 输入表示的树：
 *       3
 *      / \
 *     9   20
 *        /  \
 *       15   7
 *
 * 最终输出：[3, 20, 7]
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function rightSideView(root) {
  // TODO: 层序遍历，并记录每层最后一个节点
  return undefined;
}

/**
 * 任务 3：二叉树最小深度
 *
 * @param {TreeNode | null} root
 * @return {number}
 *
 * 使用 BFS 返回从根节点到最近叶子节点所经过的节点数。
 * 叶子节点必须同时没有左、右子节点。空树返回 0，不能修改输入树。
 *
 * 示例输入：
 * const root = buildTree([3, 9, 20, null, null, 15, 7]);
 * minDepth(root);
 *
 * 输入表示的树：
 *       3
 *      / \
 *     9   20
 *        /  \
 *       15   7
 *
 * 最终输出：2
 * 原因：3 -> 9 是到达叶子节点的最短路径，共经过 2 个节点。
 *
 * 目标复杂度：时间 O(n)，空间 O(n)
 */
function minDepth(root) {
  // TODO: 按层 BFS，第一次遇到叶子节点时返回当前深度
  return undefined;
}

/**
 * 任务 4：网格最短路径
 *
 * @param {number[][]} grid 非空矩形网格；0 可通行，1 是障碍
 * @return {number}
 *
 * 从左上角 [0, 0] 出发，每次只能向上、下、左、右移动一格，
 * 返回到右下角 [rows - 1, columns - 1] 的最少移动次数。
 * 起点或终点被阻挡、或者无法到达时返回 -1。不能修改输入 grid。
 *
 * 示例输入：
 * const grid = [
 *   [0, 0, 1, 0],
 *   [1, 0, 0, 0],
 *   [1, 1, 1, 0],
 * ];
 * shortestPathInGrid(grid);
 *
 * 一条最短路径：
 * [0,0] -> [0,1] -> [1,1] -> [1,2] -> [1,3] -> [2,3]
 *
 * 最终输出：5
 * 原因：路径经过 6 个格子，共移动 5 次。
 *
 * 目标复杂度：时间 O(rows * columns)，空间 O(rows * columns)
 */
function shortestPathInGrid(grid) {
  // TODO: 使用 BFS；邻居入队时立即标记 visited，避免同一格重复入队
  return undefined;
}

/**
 * 按层序数组创建二叉树，null 表示该位置没有节点。
 *
 * @param {(number | null)[]} values
 * @return {TreeNode | null}
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
    name: "levelOrder: multiple levels",
    run: () => assert.deepEqual(
      levelOrder(buildTree([3, 9, 20, null, null, 15, 7])),
      [[3], [9, 20], [15, 7]],
    ),
  },
  {
    name: "levelOrder: single-node tree",
    run: () => assert.deepEqual(levelOrder(buildTree([1])), [[1]]),
  },
  {
    name: "levelOrder: empty tree and no mutation",
    run: () => {
      const root = buildTree([1, 2, 3, null, 4]);

      assert.deepEqual(levelOrder(null), []);
      assert.deepEqual(levelOrder(root), [[1], [2, 3], [4]]);
      assert.deepEqual(treeToLevelOrder(root), [1, 2, 3, null, 4]);
    },
  },
  {
    name: "rightSideView: uneven tree",
    run: () => assert.deepEqual(
      rightSideView(buildTree([3, 9, 20, null, null, 15, 7])),
      [3, 20, 7],
    ),
  },
  {
    name: "rightSideView: left-only levels",
    run: () => assert.deepEqual(rightSideView(buildTree([1, 2, null, 3])), [1, 2, 3]),
  },
  {
    name: "rightSideView: empty tree",
    run: () => assert.deepEqual(rightSideView(null), []),
  },
  {
    name: "minDepth: nearest leaf",
    run: () => assert.equal(minDepth(buildTree([3, 9, 20, null, null, 15, 7])), 2),
  },
  {
    name: "minDepth: one-child nodes are not leaves",
    run: () => assert.equal(minDepth(buildTree([1, 2, null, 3])), 3),
  },
  {
    name: "minDepth: empty and single-node trees",
    run: () => {
      assert.equal(minDepth(null), 0);
      assert.equal(minDepth(buildTree([8])), 1);
    },
  },
  {
    name: "shortestPathInGrid: reachable destination",
    run: () => assert.equal(shortestPathInGrid([
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [1, 1, 1, 0],
    ]), 5),
  },
  {
    name: "shortestPathInGrid: blocked or unreachable",
    run: () => {
      assert.equal(shortestPathInGrid([[1, 0], [0, 0]]), -1);
      assert.equal(shortestPathInGrid([[0, 1], [1, 0]]), -1);
    },
  },
  {
    name: "shortestPathInGrid: single cell and no mutation",
    run: () => {
      const grid = [[0, 0], [1, 0]];

      assert.equal(shortestPathInGrid([[0]]), 0);
      assert.equal(shortestPathInGrid(grid), 2);
      assert.deepEqual(grid, [[0, 0], [1, 0]]);
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
  TreeNode,
  levelOrder,
  rightSideView,
  minDepth,
  shortestPathInGrid,
  buildTree,
  treeToLevelOrder,
};
