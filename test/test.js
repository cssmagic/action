describe('Action', function () {
	var testKey = ''
	var actionSet = {}
	var _actionList = action.__actionList
	beforeEach(function () {
		testKey = ''
	})
	afterEach(function () {
		testKey = ''
		delete _actionList.foo
		delete _actionList.bar
	})

	describe('DOM binding', function () {
		var $wrapper, $link
		before(function () {
			$wrapper = $('<div id="test"><a href="#" data-action>test action</a></div>')
				.css({position: 'absolute', top: '-50px'})
				.appendTo('body')
			$link = $wrapper.find('a')
		})
		after(function () {
			$wrapper.remove()
		})
		it('get action name from `href`', function (done) {
			$link.attr('href', '#foo')
			_actionList.foo = function () {
				testKey = 'test-foo'
			}
			$link.click()
			_.delay(function () {
				expect(testKey).to.equal('test-foo')
				done()
			}, 50)
		})
		it('get action name from `href` - context points to the link', function (done) {
			$link.attr('href', '#foo')
			_actionList.foo = function () {
				expect(this).to.equal($link[0])
				done()
			}
			$link.click()
		})
		it('get action name from `data-action`', function (done) {
			$link.attr('data-action', 'bar')
			_actionList.bar = function () {
				testKey = 'test-bar'
			}
			$link.click()
			_.delay(function () {
				expect(testKey).to.equal('test-bar')
				done()
			}, 50)
		})
		it('get action name from `data-action` - context points to the link', function (done) {
			$link.attr('data-action', 'bar')
			_actionList.bar = function () {
				expect(this).to.equal($link[0])
				done()
			}
			$link.click()
		})
		it('accept `data-action` value as a hash', function (done) {
			$link.attr('data-action', '#bar')
			_actionList.bar = function () {
				testKey = 'test-bar'
			}
			$link.click()
			_.delay(function () {
				expect(testKey).to.equal('test-bar')
				done()
			}, 50)
		})
	})
	describe('APIs', function () {
		describe('action.add()', function () {
			it('do basic functionality', function () {
				expect(_actionList).to.be.deep.equal({})
				actionSet = {
					foo: function () {},
					bar: function () {}
				}
				action.add(actionSet)
				expect(_actionList).to.be.deep.equal(actionSet)
			})
			it('do nothing if input other types', function () {
				expect(_actionList).to.be.deep.equal({})
				action.add('foo')
				expect(_actionList).to.be.deep.equal({})
				action.add(1)
				expect(_actionList).to.be.deep.equal({})
				action.add(new Date())
				expect(_actionList).to.be.deep.equal({})
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
						expect(this).to.equal(_)
					}
				}
				action.add(actionSet)
				action.trigger('foo', context)
				action.trigger('bar', _)
			})
		})
	})

})
