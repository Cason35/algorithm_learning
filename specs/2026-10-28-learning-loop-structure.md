# 算法课程、作业与批改闭环

- 日期：2026-10-28
- 状态：已验证
- 变更类型：课程结构 / 自动化

## 背景与目标

算法仓已有按 Day 组织的课程和 JavaScript 作业，也已有讲题作答单，但批改总结过去会追加到课程正文，机器元数据也未声明独立批改和资源目录。目标是明确“课程 → 代码与讲题作业 → 测试 → 独立批改总结 → 状态与下一任务”，并为网站安全编辑当前 `work.js` 提供清晰边界。

## 范围

- 包含：统一 `study.yml` 路径，建立 `reviews/`、平台证据目录与资源索引，把 Day 16 作答单列为交付物，补充独立批改和网站代码编辑规则。
- 不包含：填写 `day16/work.js` 的 TODO、运行学习者代码于服务器、生成虚假测试结果、提前批改或推进掌握状态。

## 现状分析

当前正式任务仍是 ALG-016。`day16/work.js` 保留四个待实现函数，既有测试基线为 0/12；`day16/worksheet.md` 是空白讲题与测试记录模板。这些都表示任务尚未完成。

## 方案与取舍

继续保留现有 `dayN/` 组织方式，避免迁移 16 天历史内容。课程、代码、讲题证据仍靠同一 Day 关联，但批改统一写入根目录 `reviews/ALG-xxx.md`，使课程知识与个人表现证据分离。网站仅允许编辑固定模式的 `dayN/work.js`，不提供服务器执行入口；`paths.submissions` 是代码目标白名单，而 `paths.platform_submissions` 指向独立的 `evidence/submissions/`，用于追加保存代码快照、解题思路、自测记录等 Markdown 证据，避免把证据写入代码 Glob。

## 实际修改

- `study.yml`：统一课程、白名单代码目标、平台 Markdown 证据、作答单、批改和资源路径。
- `NEXT_TASK.md`：把 `day16/worksheet.md` 纳入 ALG-016 交付物，并明确先保存独立批改再更新状态。
- `README.md`、`AGENTS.md`：明确完整学习闭环、独立批改路径，以及网站只保存而不执行代码的边界。
- `reviews/.gitkeep`、`resources/catalog.yml`：建立批改目录和合法资源索引。
- `evidence/submissions/.gitkeep`：显式建立 append-only 平台证据目录；网站保存证据时只能在该目录追加 Markdown 文件，不得覆盖 `dayN/work.js` 的历史快照。

## 学习流程与数据影响

不改变当前任务、进度或掌握状态；不修改 Day 16 的 TODO、作答内容和测试。

## 验收与验证

- [x] `NEXT_TASK.md` 仍只有一个 active 任务，且 Day 16 作答单已纳入交付物。
- [x] `study.yml`、README 与代理规则中的课程、作业、平台证据、批改和资源路径一致。
- [x] `paths.submissions` 仅声明 `day*/work.js` 白名单代码目标，`paths.platform_submissions` 独立声明 `evidence/submissions/` append-only Markdown 证据目录。
- [x] `npm run day16` 仍为预留 TODO 所致的既有 0/12、退出码 1；本次没有修改 `day16/work.js`。
- [x] `git diff --check` 通过。

## 风险与回滚

风险是旧流程仍把总结追加到课程文件，或把网站保存误解为测试通过。通过 README 和代理规则明确独立批改与本地测试边界。回滚时移除新增目录和本规范，恢复元数据及文档说明即可；不需要修改学习状态或作业。

## 关联项

无。
