# Day 10：链表

## 今天目标

Day 10 学链表。数组像一排连续编号的储物格，链表更像一串人手拉手：

```text
1 -> 2 -> 3 -> null
```

每个节点只知道两件事：

- `val`：当前节点的值。
- `next`：下一个节点在哪里。

JavaScript 里我们用一个简单的类模拟链表节点：

```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

今天你要掌握 4 件事：

1. 链表不能随机访问，只能顺着 `next` 走。
2. 修改链表本质上是修改节点之间的指向。
3. `dummy` 虚拟头节点能简化删除和合并。
4. 快慢指针可以找中点、倒数第 N 个节点。

## 1. 数组和链表的区别

数组：

```js
nums[3]
```

可以直接按下标访问。

链表：

```js
let current = head;
while (current !== null) {
  current = current.next;
}
```

只能从头开始一个一个走。

生活例子：

数组像电影院座位，知道第 8 排 6 号就能直接找到。

链表像一条线索链，每张纸条只写着“下一张纸条在哪里”，你必须按顺序找。

## 2. 反转链表

反转链表是链表基础题里的王炸。

原链表：

```text
1 -> 2 -> 3 -> null
```

反转后：

```text
3 -> 2 -> 1 -> null
```

关键是三个变量：

- `prev`：已经反转好的前一个节点。
- `current`：当前正在处理的节点。
- `next`：先保存原来的下一个节点，避免断链。

```js
let prev = null;
let current = head;

while (current !== null) {
  const next = current.next;
  current.next = prev;
  prev = current;
  current = next;
}

return prev;
```

## 3. 快慢指针找中点

快慢指针：

- `slow` 每次走一步。
- `fast` 每次走两步。

当 `fast` 到结尾时，`slow` 就在中间。

```js
let slow = head;
let fast = head;

while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
}

return slow;
```

如果链表长度是偶数，这个写法返回第二个中间节点。

## 4. dummy 虚拟头节点

删除节点或合并链表时，头节点可能会变化。

比如删除第一个节点：

```text
1 -> 2 -> 3
```

如果没有虚拟头节点，你要单独处理 `head` 被删除的情况。

用 `dummy`：

```text
dummy -> 1 -> 2 -> 3
```

最后返回：

```js
return dummy.next;
```

这样无论删不删头节点，逻辑都统一。

## 5. 删除倒数第 N 个节点

经典做法也是快慢指针。

思路：

1. 建一个 `dummy` 指向 `head`。
2. 让 `fast` 先走 `n + 1` 步。
3. 然后 `fast` 和 `slow` 一起走。
4. 当 `fast` 到 `null`，`slow.next` 就是要删除的节点。
5. 执行 `slow.next = slow.next.next`。

为什么是 `n + 1` 步？

因为我们希望 `slow` 停在“待删除节点的前一个节点”。

## 6. 今日作业

打开 `day10/work.js`，完成 4 个函数：

1. `reverseList(head)`：反转单链表。
2. `middleNode(head)`：返回链表中间节点；偶数长度返回第二个中间节点。
3. `mergeTwoSortedLists(list1, list2)`：合并两个升序链表。
4. `removeNthFromEnd(head, n)`：删除倒数第 `n` 个节点。

运行自测：

```bash
npm run day10
```

## 7. 今天讲题模板

链表题讲题时可以按这个顺序：

1. 每个指针变量代表什么节点？
2. 修改 `next` 之前，是否需要先保存原来的 `next`？
3. 头节点是否可能变化？
4. 是否需要 `dummy` 节点？
5. 快慢指针之间需要保持几步距离？
6. 返回的是原 `head`，新头节点，还是某个中间节点？

你写完后告诉我，我会批改 Day 10，并把总结追加到这里。
