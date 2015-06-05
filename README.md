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

* Chrome / Firefox / Safari 等现代浏览器
* IE 6+（需要 jQuery 1.x）

## 体积

* 源码： 2.7k
* 压缩后： 0.4k

## 安装

#### Bower

0. 通过 Bower 安装：

	```sh
	$ bower install action
	```

0. 在页面中加载 Action 的脚本文件及必要的依赖：

	```html
	<script src="bower_components/jquery/dist/jquery.js"></script>
	<script src="bower_components/action/src/action.js"></script>
	```

#### spm

也可通过 spm 进行安装和构建：

```sh
$ spm install action
```

## API 文档

* Action 提供了简洁易用的 API，[详见此文档](https://github.com/cssmagic/action/issues/9)。
* 此外，建议阅读 [Wiki](https://github.com/cssmagic/action/wiki) 来获取更多信息。

## 单元测试

0. 把本项目的代码 fork 并 clone 到本地。
0. 在本项目的根目录运行 `bower install`，安装必要的依赖。
0. 在浏览器中打开 `test/test.html` 即可运行单元测试。

## 谁在用？

移动 UI 框架 [CMUI](https://github.com/CMUI/CMUI) 采用 Action 作为全局的基础设施，因此所有 CMUI 用户都在使用 Action：

* [百姓网 - 手机版](http://m.baixing.com/)
* [薇姿官方电子商城 - 手机版](http://m.vichy.com.cn/)
* [优e网 - 手机版](http://m.uemall.com/)

***

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
