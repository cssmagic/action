/**
 * Action - Easy and lazy solution for click-event-binding.
 * Released under the MIT license.
 * https://github.com/cssmagic/action
 */
var action = function () {
	'use strict'

	//namespace
	var action = {}

	var SELECTOR = '[data-action]'
	var _actionList = {}

	//util
	function _getActionName($elem) {
		var result = $elem.data('action') || ''
		if (!result) {
			var href = $.trim($elem.attr('href'))
			if (href && href.indexOf('#') === 0) result = href
		}
		return _formatActionName(result)
	}
	function _formatActionName(s) {
		var result = s ? $.trim(String(s)).replace(/^[#!]+/, '') : ''
		return $.trim(result)
	}

	function _init() {
		var $wrapper = $(document.body || document.documentElement)
		$wrapper.on('click', SELECTOR, function (ev) {
			//notice: default click behavior will be prevented.
			ev.preventDefault()

			var $elem = $(this)
			var actionName = _getActionName($elem)
			if (actionName && actionName !== 'none') {
				_handle(actionName, this)
			} else {
				/** DEBUG_INFO_START **/
				console.warn('[Action] Empty action. Do nothing.')
				/** DEBUG_INFO_END **/
			}
		})
	}
	function _handle(actionName, context) {
		var fn = _actionList[actionName]
		if ($.isFunction(fn)) {
			/** DEBUG_INFO_START **/
			console.log('[Action] Executing action: ' + actionName)
			/** DEBUG_INFO_END **/

			fn.call(context || window)
		} else {
			/** DEBUG_INFO_START **/
			console.error('[Action] Not found callback of action: ' + actionName)
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
							console.warn('[Action] The existed action `' + actionName + '` has been overridden.')
						}
						/** DEBUG_INFO_END **/

						_actionList[actionName] = value
					} else {
						/** DEBUG_INFO_START **/
						console.error('[Action] The action name `' + key + '` is invalid.')
						/** DEBUG_INFO_END **/
					}
				} else {
					/** DEBUG_INFO_START **/
					console.error('[Action] The callback for action `' + actionName + '` is not a valid function.')
					/** DEBUG_INFO_END **/
				}
			})
		} else {
			/** DEBUG_INFO_START **/
			console.warn('[Action] Param must be a plain object.')
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
