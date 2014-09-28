
////////////////////  action  ////////////////////
//an easy and lazy solution for click-event-binding

void function (window, _ext) {
	'use strict'

	//namespace
	var action = {}

	var SELECTOR = '[data-action]'
	var _actionList = {}
	function _bind() {
		var $wrapper = _.dom.$body || _.dom.$doc
		$wrapper.on('click', SELECTOR, function (ev) {
			ev.preventDefault()
			var elem = this
			var $elem = _.$(elem)
			//get action
			var actionName = $elem.data('action') || _.url.getHashFromLink(elem)
			if (!actionName) {
				//console.warn('No action assigned!')
			} else {
				actionName = _.str.stripHash(actionName)
				if (!actionName || actionName === 'none') {
					//console.info('Empty action. Do nothing.')
				} else {
					_handle(actionName, elem)
				}
			}
		})
	}
	function _handle(actionName, context) {
		var fn = _actionList[actionName]
		if (_.isFunction(fn)) {
			//console.log('executing action: ' + actionName)
			fn.call(context || window)
		} else {
			//TODO: make a mock `console` if not existed
			//console.error('Not found callback of action: ' + actionName)
		}
	}

	//api
	action.add = function (actionSet) {
		if (_.isPlainObject(actionSet)) {
			_.extend(_actionList, actionSet)
		}
	}
	action.trigger = function (actionName, context) {
		if (_.isString(actionName)) {
			_handle(actionName, context)
		}
	}

	//init
	_bind()

	//exports for unit test
	action.__actionList = _actionList

	//exports
	_ext.exports('action', action)
}(window, _ext)
