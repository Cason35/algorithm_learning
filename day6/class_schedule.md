# Day 6：前缀和

## 今天目标

Day 5 学了滑动窗口，适合处理“连续区间一边走一边更新”的问题。Day 6 学前缀和，它也处理连续区间，但思路是先预处理，再快速查询。

今天你要掌握 4 件事：

1. 前缀和数组是什么。
2. 如何用前缀和 `O(1)` 查询区间和。
3. 如何用前缀和 + 哈希表统计子数组数量。
4. 差分数组的直觉：批量区间加法。

## 1. 前缀和是什么

前缀和就是“从开头累加到当前位置的和”。

比如：

```text
nums = [2, 4, 1, 3]
```

我们建一个长度多 1 的 `prefix`：

```text
prefix[0] = 0
prefix[1] = 2
prefix[2] = 2 + 4 = 6
prefix[3] = 2 + 4 + 1 = 7
prefix[4] = 2 + 4 + 1 + 3 = 10
```

也就是：

```text
prefix = [0, 2, 6, 7, 10]
```

为什么要多一个 `0`？

因为这样区间 `[left, right]` 的和可以统一写成：

```js
prefix[right + 1] - prefix[left]
```

不用给 `left === 0` 单独写特殊逻辑。

## 2. 生活例子

想象你每天记账：

```text
周一 20
周二 15
周三 30
周四 10
```

如果别人问“周二到周四一共花了多少”，你可以每天重新加一遍。

但如果你提前记了“截至每天累计花费”：

```text
周一结束 20
周二结束 35
周三结束 65
周四结束 75
```

那周二到周四就是：

```text
周四结束累计 - 周一结束累计 = 75 - 20 = 55
```

这就是前缀和。

## 3. 前缀和适合什么题

看到这些关键词，可以先想前缀和：

- 多次查询区间和。
- 连续子数组的和。
- 子数组和等于某个值。
- 二维矩阵区域和。
- 区间批量加法。

前端里的类似场景：

- 图表里快速算某段时间的累计 GMV。
- 日志按天聚合后，快速查某段日期的总量。
- 虚拟滚动里根据前缀高度快速定位滚动位置。

## 4. 区间和查询

最基础的前缀和题是：

给一个数组，多次查询 `[left, right]` 的和。

```js
function buildPrefix(nums) {
  const prefix = new Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  return prefix;
}

function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}
```

## 5. 前缀和 + 哈希表

更高频的一类题是：统计和为 `k` 的连续子数组数量。

关键公式：

```text
prefix[j] - prefix[i] = k
```

也就是说：

```text
prefix[i] = prefix[j] - k
```

当我们从左到右扫描时，当前前缀和是 `sum`。如果之前出现过 `sum - k`，那么这些位置到当前位置之间的子数组和就是 `k`。

所以我们用 `Map` 记录“某个前缀和出现过几次”。

初始时要放：

```js
countMap.set(0, 1);
```

这代表“空前缀出现过一次”，用来处理从下标 0 开始的子数组。

## 6. 差分数组直觉

差分数组适合处理“多次区间加法”。

如果你要给 `[left, right]` 整段都加 `value`，直接逐个加会慢。

差分做法只记录变化点：

```js
diff[left] += value;
diff[right + 1] -= value;
```

最后对 `diff` 做一次前缀和，就得到所有位置的最终值。

它像是在路上立两个标记：

- 从 `left` 开始，每个位置都多 `value`。
- 到 `right + 1` 开始，这个加成取消。

## 7. 今日作业

打开 `day6/work.js`，完成 4 个函数：

1. `buildPrefixSums(nums)`：返回长度为 `nums.length + 1` 的前缀和数组。
2. `rangeSum(nums, left, right)`：返回数组闭区间 `[left, right]` 的和。
3. `countSubarraysWithSum(nums, k)`：统计和为 `k` 的连续子数组数量。
4. `applyRangeUpdates(length, updates)`：对长度为 `length` 的全 0 数组执行多次区间加法。

运行自测：

```bash
npm run day6
```

## 8. 今天讲题模板

前缀和题讲题时可以按这个顺序：

1. `prefix[i]` 表示什么？
2. 为什么 `prefix` 长度要比原数组多 1？
3. 区间 `[left, right]` 的公式是什么？
4. 如果统计子数组数量，哈希表记录的 key/value 分别是什么？
5. 如果是差分，变化点在哪里？

你写完后告诉我，我会批改 Day 6，并把总结追加到这里。

## 9. 批改总结（2026-07-03）

### 自测结果

`npm run day6` 通过：`12/12 tests passed`。

### 掌握情况

你已经掌握了 Day 6 的核心：用前缀和把连续区间问题转成“两个累计值相减”，再用哈希表统计历史前缀和。

四个函数的完成情况：

1. `buildPrefixSums(nums)`：通过。你保留了 `prefix[0] = 0`，并用 `prefix[i] + nums[i]` 推出下一项，结构正确。
2. `rangeSum(nums, left, right)`：通过。公式 `prefix[right + 1] - prefix[left]` 用得准确。
3. `countSubarraysWithSum(nums, k)`：通过。你先放入 `map.set(0, 1)`，可以正确处理从下标 0 开始的子数组；扫描时查 `sum - k`，这是这题最关键的转换。
4. `applyRangeUpdates(length, updates)`：通过。你用差分思想处理区间加法，起点加 `value`，`right + 1` 位置减 `value`，最后再做一次前缀还原最终数组。

### 可以继续优化的点

`applyRangeUpdates` 里的 `arr` 实际上是差分数组，可以命名为 `diff`，这样讲题时更贴近概念。

当前做法用 `buildPrefixSums(arr).slice(1)` 还原结果，逻辑正确。也可以直接原地累加 `diff` 得到结果，少创建一个长度为 `length + 1` 的前缀数组，不过这不是必须优化。

`rangeSum` 每次调用都会构建一次前缀和。单次查询没问题；如果题目变成“多次查询区间和”，更好的做法是先构建一次 `prefix`，后续每次查询都 `O(1)`。

### 今天真正学到的东西

前缀和题最重要的是把“连续区间”翻译成公式：

```text
sum(left, right) = prefix[right + 1] - prefix[left]
```

统计子数组数量时，再进一步翻译：

```text
currentPrefix - previousPrefix = k
previousPrefix = currentPrefix - k
```

差分数组则是反过来思考：不直接改整段区间，而是只记录“从哪里开始变化”和“从哪里结束变化”。
