---
schema_version: 1
id: ALG-016
subject_id: algorithm
title: Day 16 BFS：从队列含义到最短路
status: active
type: new_lesson
estimated_minutes: 70
scheduled_at: "2026-10-29T21:30:00+08:00"
skills: [bfs, queue, tree-level-order, shortest-path, complexity-analysis]
roadmap_ref: README.md#35-天路线图
generated_from: [ALG-015]
why_now: Day 1–15 已完成第一轮；BFS 是从树遍历过渡到图搜索和无权最短路的关键连接点，当前 Day 16 测试基线为 0/12。
deliverables:
  - day16/work.js
  - day16/worksheet.md
  - npm run day16 的 12/12 通过结果
  - 对“队列里每个元素代表什么”的口述说明
definition_of_done:
  - 独立完成 levelOrder、rightSideView、minDepth、shortestPathInGrid 四个函数
  - 运行 npm run day16，12/12 测试通过且进程退出码为 0
  - 说明树 BFS 与网格 BFS 中队列元素分别代表什么
  - 说明为何在邻居入队时标记 visited，以及为何第一次到达目标就是最短路
  - 能给出四个实现的时间与空间复杂度，并确认没有修改输入树或网格
candidate_task_id: null
review_target_path: reviews/ALG-016.md
---

# 任务说明

## 1. 复习与预测（10 分钟）

阅读 `day16/class_schedule.md`，先不用写代码，回答：

- 队列里的元素是什么？
- 树的“层”如何与队列长度对应？
- 网格最短路中的距离应该记录在节点、队列元素还是循环层级里？

## 2. 独立实现（40 分钟）

完成 `day16/work.js` 中四个 TODO。先处理空输入和单节点等边界，再实现一般情况。可以回看课程示例，但不要复制完整答案。

## 3. 测试与修正（10 分钟）

运行：

```bash
npm run day16
```

逐个处理失败用例，直到输出 `12/12 tests passed`。不要删改测试来换取通过。

## 4. 口述验收（10 分钟）

用 2～3 分钟讲清：

1. 树 BFS 和网格 BFS 的队列分别装了什么。
2. `head` 指针为何优于反复 `shift()`。
3. `visited` 为什么要在入队时标记。
4. BFS 为什么能得到无权图最短步数。

把讲题说明、测试结果和实际用时记录到 `day16/worksheet.md`。完成后告诉教练“ALG-016 已完成，帮我批改”；批改先保存到 `reviews/ALG-016.md`，再依据证据更新学习状态并生成下一任务。
