> English version is [here](https://github.com/cssmagic/action/wiki).

# Action [![spm package](http://spmjs.io/badge/action)](http://spmjs.io/package/action)

> 轻松随意绑定点击事件！

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

在页面里创建元素：

```html
<button data-action="my-action">btn</button>

<!-- 或这样 -->
<a href="#" data-action="my-action">link</a>

<!-- 或这样 -->
<a href="#my-action" data-action>link</a>
```

#### 第三步

其实已经不需要第三步了。

点击这个元素就可以触发你定义的那个动作了！

## 兼容性

依赖以下类库：

* jQuery（或兼容类库，比如 Zepto）

支持以下浏览器：

* IE 6+（需要 jQuery 1.x）
* Chrome/Firefox/Safari 等现代浏览器

## 体积

* 源码： 2.7k
* 压缩后： 0.5k

## 安装

```bash
$ bower install action
```

0. 通过 Bower 安装。
0. 在页面中加载 `src/action.js` 脚本文件。

也可以通过 spm 进行安装：

```bash
$ spm install action
```

## API 文档

你需要了解以下 API，[详细文档参见 Wiki](https://github.com/cssmagic/action/issues/9)。

* HTML API
* JavaScript API
	* `action.add()`
	* `action.trigger()`

## 谁在用？

移动 UI 框架 [CMUI](https://github.com/CMUI/CMUI) 采用 Action 作为全局的基础设施，因此所有 CMUI 用户都在使用 Action：

* [百姓网 - 手机版](http://m.baixing.com/)
* [薇姿官方电子商城 - 手机版](http://m.vichy.com.cn/)
* [优e网 - 手机版](http://m.uemall.com/)

***

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
