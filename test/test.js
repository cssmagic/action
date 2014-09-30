void function () {
	var _actionList = action.__actionList
	var _getActionName = action.__getActionName
	var _formatActionName = action.__formatActionName

	var testKey = ''
	var actionSet = {}
	var fnFoo = function () {}
	var fnBar = function () {}

	function buildActionElem(action, href) {
		var html = [
			'<a href="',
			href ? href : '#',
			'" data-action',
			action ? '="' + action + '"' : '',
			'>Action Element</a>'
		].join('')
		return $(html)
			.css({position: 'absolute', top: '-50px'})
			.appendTo('body')
	}

	afterEach(function () {
		testKey = ''
		delete _actionList.foo
		delete _actionList.bar
	})

	describe('Util', function () {
		describe('_getActionName()', function () {
			var $link
			afterEach(function () {
				$link.remove()
			})
			it('get action name from `href`', function () {
				var href = Math.random().toString(36).slice(2)
				$link = buildActionElem('', '#' + href)
				expect(_getActionName($link)).to.equal(href)
			})
			it('get action name from `data-action`', function () {
				var action = Math.random().toString(36).slice(2)
				$link = buildActionElem(action)
				expect(_getActionName($link)).to.equal(action)
			})
			it('get from `data-action` first', function () {
				var action = Math.random().toString(36).slice(2)
				var href = Math.random().toString(36).slice(2)
				$link = buildActionElem(action, '#' + href)
				expect(_getActionName($link)).to.equal(action)
			})
			it('return empty if `href` is not hash', function () {
				var href = Math.random().toString(36).slice(2)
				$link = buildActionElem('', href)
				expect(_getActionName($link)).to.equal('')
			})
		})
		describe('_formatActionName()', function () {
			it('return directly if initial character is not space, `#` or `!`', function () {
				var arg
				arg = 'foobar'
				expect(_formatActionName(arg)).to.equal(arg)
			})
			it('remove all initial `#` and `!` characters', function () {
				var arg
				arg = '#foo'
				expect(_formatActionName(arg)).to.equal('foo')
				arg = '###bar'
				expect(_formatActionName(arg)).to.equal('bar')
				arg = '###foo#bar'
				expect(_formatActionName(arg)).to.equal('foo#bar')
				arg = '!foo'
				expect(_formatActionName(arg)).to.equal('foo')
				arg = '!!!bar'
				expect(_formatActionName(arg)).to.equal('bar')
				arg = '!!!foo#bar'
				expect(_formatActionName(arg)).to.equal('foo#bar')
				arg = '#!foobar'
				expect(_formatActionName(arg)).to.equal('foobar')
				arg = '#!!foo!bar'
				expect(_formatActionName(arg)).to.equal('foo!bar')
			})
			it('ignore initial and ending spaces', function () {
				var arg
				arg = '    '
				expect(_formatActionName(arg)).to.equal('')
				arg = '  foo  '
				expect(_formatActionName(arg)).to.equal('foo')
				arg = '  #foo  '
				expect(_formatActionName(arg)).to.equal('foo')
				arg = '  ###bar  '
				expect(_formatActionName(arg)).to.equal('bar')
				arg = '  #!foobar  '
				expect(_formatActionName(arg)).to.equal('foobar')
			})
			it('convert falsy value to empty string', function () {
				var arg
				arg = undefined
				expect(_formatActionName(arg)).to.equal('')
				arg = null
				expect(_formatActionName(arg)).to.equal('')
				arg = false
				expect(_formatActionName(arg)).to.equal('')
				arg = NaN
				expect(_formatActionName(arg)).to.equal('')
			})
		})
	})

	describe('APIs', function () {
		describe('action.add()', function () {
			it('do basic functionality', function () {
				expect(_actionList).to.deep.equal({})
				actionSet = {
					foo: fnFoo,
					bar: fnBar
				}
				action.add(actionSet)
				expect(_actionList).to.deep.equal(actionSet)
			})
			it('format keys of the input object', function () {
				expect(_actionList).to.deep.equal({})
				actionSet = {
					foo: fnFoo,
					bar: fnBar
				}
				action.add(actionSet)
				expect(_actionList).to.deep.equal(actionSet)
			})
			it('do nothing if param is not a plain object', function () {
				expect(_actionList).to.deep.equal({})
				action.add('foo')
				expect(_actionList).to.deep.equal({})
				action.add(1)
				expect(_actionList).to.deep.equal({})
				action.add(new Date())
				expect(_actionList).to.deep.equal({})
			})
		})

		describe('action.trigger()', function () {
			it('do basic functionality', function () {
				actionSet = {
					foo: function () {
						testKey = 'test-foo'
					},
					bar: function () {
						testKey = 'test-bar'
					}
				}
				action.add(actionSet)
				action.trigger('foo')
				expect(testKey).to.equal('test-foo')
				action.trigger('bar')
				expect(testKey).to.equal('test-bar')
			})
			it('call callback on the specified context', function () {
				var context = {}
				actionSet = {
					foo: function () {
						expect(this).to.equal(context)
					},
					bar: function () {
						expect(this).to.equal(mocha)
					}
				}
				action.add(actionSet)
				action.trigger('foo', context)
				action.trigger('bar', mocha)
			})
		})
	})

	describe('DOM binding', function () {
		var $link, context
		after(function () {
			$link.remove()
		})
		it('get action name from `href`', function (done) {
			$link = buildActionElem('', '#foo')
			_actionList.foo = function () {
				testKey = 'test-foo'
			}
			$link.click()
			setTimeout(function () {
				expect(testKey).to.equal('test-foo')
				done()
			}, 50)
		})
		it('get action name from `href` - context points to the link', function (done) {
			$link = buildActionElem('', '#foo')
			_actionList.foo = function () {
				context = this
			}
			$link.click()
			setTimeout(function () {
				expect(context).to.equal($link[0])
				done()
			}, 50)
		})
		it('get action name from `data-action`', function (done) {
			$link = buildActionElem('bar')
			_actionList.bar = function () {
				testKey = 'test-bar'
			}
			$link.click()
			setTimeout(function () {
				expect(testKey).to.equal('test-bar')
				done()
			}, 50)
		})
		it('get action name from `data-action` - context points to the link', function (done) {
			$link = buildActionElem('bar')
			_actionList.bar = function () {
				context = this
			}
			$link.click()
			setTimeout(function () {
				expect(context).to.equal($link[0])
				done()
			}, 50)
		})
		it('accept `data-action` value as a hash', function (done) {
			$link = buildActionElem('#bar')
			_actionList.bar = function () {
				testKey = 'test-bar'
			}
			$link.click()
			setTimeout(function () {
				expect(testKey).to.equal('test-bar')
				done()
			}, 50)
		})
	})

}()
