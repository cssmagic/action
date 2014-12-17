> English version is [here](https://github.com/cssmagic/action/wiki).

# Action

轻松随意绑定点击事件！

## 用法简介

#### 第一步

先定义一些动作：

```js
action.add({
    'my-action': function () {
        //do something...
    },
    ...
})
```

#### 第二步

在页面里创建一些元素，比如这样：

```html
<a href="#my-action" data-action>link</a>
```

或这样：

```html
<a href="#" data-action="my-action">link</a>
```

或这样：

```html
<button data-action="my-action">btn</button>
```

#### 第三步

其实已经不需要第三步了。

点击这些元素就可以触发你定义的那个动作了！

## 安装

```bash
$ bower install action
```

0. 通过 Bower 安装。
0. 在页面中加载 `src/action.js` 脚本文件。

## API 文档

你需要了解以下 API，[详细文档参见 Wiki](https://github.com/cssmagic/action/issues/9)。

* DOM API
* JavaScript API
	* `action.add()`
	* `action.trigger()`

***

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
