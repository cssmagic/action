# API 文档

> 如果你还不清楚这个库的用处，[请参阅《简介》](https://github.com/cssmagic/action/issues/12)。

## 术语约定<a name="term"></a>

* 动作 -- 你有一件特定的事情要做，可以将它定义为一个 “动作”，以便在必要时触发它。
* 动作名 -- 每个动作都需要有一个名字，即 “动作名”。
* 动作函数 -- 每个动作的行为使用函数来描述，即 “动作函数”。

## HTML 接口<a name="html-api"></a>

页面中的 DOM 元素可以通过 `data-action` 属性来声明自己被点击时要执行的动作。比如点击下面的链接和按钮就可以分别触发名为 `foo` 和 `bar` 的动作（即执行对应的动作函数）。

```html
<a href="#" data-action="foo">Link</a>
<button data-action="bar">Button</button>
```

（值得一提的是，动作函数将以触发元素作为执行上下文。这跟事件的回调函数是类似的。）

对于链接元素，你还可以这样声明它的动作（似乎看起来更有语义，对用户也更友好一些）：

```html
<a href="#foo" data-action>Link</a>
```

#### 注意事项

* 只要元素具有 `data-action` 属性，其点击事件的默认行为就会被阻止。
* 如果元素声明的动作名还没有定义，则不会执行任何动作函数。
* 如果链接元素同时指定了 `href` 和 `data-action` 属性的值，则只有后者会被视为动作名声明。
* 如果链接元素通过 `href` 属性来声明动作名，则 `href` 属性值必须以 `#` 开头。
* 元素声明的动作名的开头所有 `#`、`!` 和空白符都将被忽略，结尾的空白符也将被忽略，这意味着 `#foo`、`#!foo` 和 `  ## !! foo  ` 都会被视为 `foo`。

## JavaScript 接口<a name="js-api"></a>

### `action.add(actions)`<a name="js-api-add"></a>

定义一个或多个动作。

#### 参数

* `actions` -- 纯对象。需要定义的动作。对象的键名为动作名，键值为动作函数。

#### 返回值

（无）

#### 示例

以下代码将定义两个名为 `foo` 和 `bar` 的动作。

```js
action.add({
    'foo': function () {
        alert('You triggered action `foo`!')
    },
    'bar': function () {
        this.bar = true
        alert('You triggered action `bar`!')
    }
})
```

#### 注意事项

* 在定义动作时，动作名的开头所有 `#`、`!` 和空白符都将被忽略，结尾的空白符也将被忽略。
* 无法定义一个动作名为空字符串的动作。
* 如果在定义动作时使用了已经存在的动作名，则相当于用新的动作函数替换原有的动作函数。原因在于 `action.add()` 方法添加的是动作，不是事件监听器；而每个动作名只能对应一个动作函数。如果你觉得 `.add()` 这个接口名容易误解，可以自行创建并使用 `.define()` 或 `.register()` 这样的别名。

***

### `action.trigger(actionName, [context])`<a name="js-api-trigger"></a>

除了页面元素可以触发动作外，这个方法还允许你在 JS 代码中触发指定动作（甚至你还可以指定动作函数的执行上下文）。

这个方法可能并不常用，只是提供了另一种途径来调用你定义的动作。

#### 参数

* `actionName` -- 字符串。动作名。
* `context` -- 可选。对象。动作函数的执行上下文，默认为 `window`。

#### 返回值

* 返回动作函数执行后的返回值。
* 触发一个不存在的动作时，返回值为 `undefined`。

#### 示例

如果你已经在上面定义了 `foo` 和 `bar` 两个动作，那么以下代码将会触发名为 `foo` 的动作。

```js
action.trigger('foo')
```

以下代码将会触发名为 `bar` 的动作，而且动作函数将以 `<body>` 元素作为执行上下文（即函数内部的 `this` 在此次执行时会指向 `document.body`）。

```js
//document.body.bar === undefined
action.trigger('bar', document.body)
//document.body.bar === true
```

#### 注意事项

* 在触发指定动作时，动作名的开头所有 `#`、`!` 和空白符都将被忽略，结尾的空白符也将被忽略。
* 如果触发一个不存在的动作，则不会执行任何动作函数。
