# 算法正式任务契约对齐

- 日期：2026-10-30
- 状态：已完成

## 背景与范围

将现有 `ALG-016` 的 Front Matter 对齐平台任务契约；不改变 Day 16 课程、代码、测试或讲题要求。

## 修改与验证

- 补充 `subject_id: algorithm`、候选任务空值与显式批改目标。
- 将科目表述 `implementation_and_explanation` 映射为通用 `new_lesson`，实现与讲解要求仍保留在正文和完成定义。
- 时间加引号，确保 YAML 保持 ISO 8601 字符串。
- `AGENTS.md` 增加后续任务生成的契约要求，避免再次漂移。
- 通过平台任务 Schema、科目绑定和 `learning-state.yml.current_task_id` 一致性检查。

## 风险与回滚

只改任务元数据；恢复旧 Front Matter 即可回滚，学习代码和证据未改动。
