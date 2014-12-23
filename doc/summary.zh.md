# 简介

> 轻松随意绑定点击事件！

### 第一步

先定义一些动作：

```js
action.add({
    'my-action': function () {
        //do something...
    },
    ...
})
```

### 第二步

在页面里创建元素：

```html
<button data-action="my-action">btn</button>

<!-- 或这样 -->
<a href="#" data-action="my-action">link</a>

<!-- 或这样 -->
<a href="#my-action" data-action>link</a>
```

### 第三步

其实已经不需要第三步了。

点击这个元素就可以触发你定义的那个动作了！
