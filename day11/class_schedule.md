# Day 11：二分查找

## 今天目标

Day 11 学二分查找。二分查找的前提通常是：

```text
数据有序，或者答案范围具备单调性
```

它的核心不是“写一个 while”，而是每次比较后都能排除一半不可能的答案。

今天你要掌握 4 件事：

1. 普通二分：在有序数组里找目标值。
2. 插入位置：找第一个大于等于目标值的位置。
3. 左边界：有重复元素时找第一次出现的位置。
4. 答案二分：不直接在数组里找，而是在可能答案范围里找。

## 1. 生活例子

想象你在猜一个 1 到 100 的数字。

如果别人说“太大了”，你就能排除右半边。

如果别人说“太小了”，你就能排除左半边。

每次都把范围砍半，这就是二分。

```text
1..100 -> 1..50 -> 26..50 -> 26..37 ...
```

## 2. 普通二分查找

经典模板：

```js
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

这里使用 `left <= right`，代表搜索区间是闭区间 `[left, right]`。

## 3. 为什么 mid 这样写

你可能会看到：

```js
const mid = Math.floor((left + right) / 2);
```

在 JavaScript 里通常也没问题，但更通用的写法是：

```js
const mid = Math.floor(left + (right - left) / 2);
```

它可以避免某些语言里 `left + right` 过大导致整数溢出。我们从一开始就养成这个习惯。

## 4. 插入位置

`searchInsert(nums, target)` 要找的是：

```text
第一个 >= target 的位置
```

比如：

```text
nums = [1, 3, 5, 6], target = 2
```

答案是 `1`，因为 `2` 应该插入到 `3` 前面。

这个题的二分目标不是“找到相等”，而是不断缩小到第一个可以插入的位置。

## 5. 左边界

如果数组里有重复元素：

```text
[1, 2, 2, 2, 3]
```

找 `2` 的第一次出现位置，答案是 `1`。

普通二分遇到 `2` 可能返回任意一个 `2`，所以左边界二分的策略是：

- 如果 `nums[mid] >= target`，右边界往左收。
- 如果 `nums[mid] < target`，左边界往右收。

最后检查 `left` 是否真的是目标值。

## 6. 答案二分

有些题不是在数组里找，而是在答案范围里找。

比如求整数平方根：

```text
sqrt(8) = 2.xxx
```

题目要整数部分，所以答案是 `2`。

我们可以在 `[0, x]` 之间二分，找最大的 `mid`，满足：

```text
mid * mid <= x
```

这就是答案二分。

## 7. 常见边界问题

二分最常见的错误：

- `while (left < right)` 和 `while (left <= right)` 混用。
- 更新边界时忘了 `+1` 或 `-1`。
- 目标不存在时返回错。
- 找边界时，一找到就直接返回，导致不是最左或最右。

写题时一定要先说清楚：

```text
我的搜索区间是什么？
循环结束时 left / right 分别表示什么？
```

## 8. 今日作业

打开 `day11/work.js`，完成 4 个函数：

1. `binarySearch(nums, target)`：普通二分，找到返回下标，找不到返回 `-1`。
2. `searchInsert(nums, target)`：返回目标值应该插入的位置。
3. `firstOccurrence(nums, target)`：返回目标值第一次出现的位置，找不到返回 `-1`。
4. `integerSqrt(x)`：返回 `x` 的整数平方根。

运行自测：

```bash
npm run day11
```

## 9. 今天讲题模板

二分题讲题时可以按这个顺序：

1. 为什么这题可以二分？
2. 搜索区间是闭区间还是左闭右开？
3. `mid` 的含义是什么？
4. 什么情况下移动 `left`？
5. 什么情况下移动 `right`？
6. 循环结束后返回什么？

你写完后告诉我，我会批改 Day 11，并把总结追加到这里。
