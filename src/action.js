/**
 * Action.js - Easy and lazy solution for click-event-binding.
 * (https://github.com/cssmagic/action.js)
 */
var action = function () {
	'use strict'

	//namespace
	var action = {}

	var SELECTOR = '[data-action]'
	var _actionList = {}

	function _init() {
		var $wrapper = $(document.body || document.documentElement)
		$wrapper.on('click', SELECTOR, function (ev) {
			//notice: default click behavior will be prevented.
			ev.preventDefault()

			var elem = this
			var $elem = $(elem)

			var actionName = _getActionName($elem)
			if (actionName && actionName !== 'none') {
				_handle(actionName, elem)
			} else {
				/** DEBUG_INFO_START **/
				console.warn('Empty action. Do nothing.')
				/** DEBUG_INFO_END **/
			}
		})
	}

	function _getActionName($elem) {
		var result = $elem.data('action') || $elem.attr('href') || ''
		return _formatActionName(result)
	}
	function _formatActionName(s) {
		var result = s ? $.trim(s + '').replace(/^[#!]+/, '') : ''
		return $.trim(result)
	}
	function _handle(actionName, context) {
		var fn = _actionList[actionName]
		if ($.isFunction(fn)) {
			/** DEBUG_INFO_START **/
			console.log('Executing action: ' + actionName)
			/** DEBUG_INFO_END **/

			fn.call(context || window)
		} else {
			/** DEBUG_INFO_START **/
			console.error('Not found callback of action: ' + actionName)
			/** DEBUG_INFO_END **/
		}
	}

	//api
	action.add = function (actionSet) {
		if ($.isPlainObject(actionSet)) {
			$.each(actionSet, function (key, value) {
				var actionName = _formatActionName(key)
				if ($.isFunction(value)) {
					if (actionName) {
						/** DEBUG_INFO_START **/
						if (_actionList[actionName]) {
							console.warn('The existed action `' + actionName + '` has been overridden.')
						}
						/** DEBUG_INFO_END **/

						_actionList[actionName] = value
					} else {
						/** DEBUG_INFO_START **/
						console.error('The action name `' + key + '` is invalid.')
						/** DEBUG_INFO_END **/
					}
				} else {
					/** DEBUG_INFO_START **/
					console.error('The callback for action `' + actionName + '` is not a valid function.')
					/** DEBUG_INFO_END **/
				}
			})
		} else {
			/** DEBUG_INFO_START **/
			console.error('Param must be a plain object.')
			/** DEBUG_INFO_END **/
		}
	}
	action.trigger = function (actionName, context) {
		_handle(_formatActionName(actionName), context)
	}

	//init
	_init()

	/** DEBUG_INFO_START **/
	//exports for unit test
	action.__actionList = _actionList
	action.__getActionName = _getActionName
	action.__formatActionName = _formatActionName
	/** DEBUG_INFO_END **/

	//exports
	return action

}()
