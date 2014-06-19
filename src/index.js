//     StatefulView
//     (c) simonfan
//     StatefulView is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module StatefulView
 */

define(function (require, exports, module) {
	'use strict';

	var backbone = require('lowercase-backbone'),
		_        = require('lodash');

	var buildStatefulMethod = require('./__stateful-view/build-stateful-method');


	var statefulView = module.exports = backbone.view.extend({

		initialize: function initialize(options) {
			backbone.view.prototype.initialize.apply(this, arguments);
			this.initializeStatefulView(options);
		},

		/**
		 * Whatever is needed for stateful object to start working.
		 *
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		initializeStatefulView: function initializeStatefulView(options) {

			options = options || {};

			/**
			 * Property that holds the state of the object.
			 * @type {[type]}
			 */
			this.state = options.state || this.state;

			/**
			 * Cache onto which state invocations will be set to.
			 * @type {Object}
			 */
			this._cache = {};

			_.bindAll(this, ['setState', 'getState']);
		},

		/**
		 * Returns the object's current state.
		 * May be overridden for custom behaviour.
		 *
		 * @return {[type]} [description]
		 */
		getState: function getState() {
			return this.state;
		},

		/**
		 * Sets the object's state property to whatever is passed
		 * as first argument.
		 *
		 * @param {[type]} state [description]
		 */
		setState: function setState(state) {
			this.state = state;
			return this;
		},

		/**
		 * Sets and retrieves values from and to the cache.
		 *
		 * @param  {[type]} key   [description]
		 * @param  {[type]} value [description]
		 * @return {[type]}       [description]
		 */
		cache: function cache(key, value) {

			if (arguments.length === 1) {
				// getter
				return this._cache[key];
			} else {
				// setter
				this._cache[key] = value;

				return this;
			}
		},


	});

	/**
	 * Defines a stateful method onto the object's prototype.
	 *
	 * @param  {[type]}   name [description]
	 * @param  {Function} fn   [description]
	 * @return {[type]}        [description]
	 */
	statefulView.assignStatic({
		statefulMethod: function statefulMethod(name, fn) {

			if (_.isString(name)) {
				// is a string, define a single action

				// build the function
				var statefulMethod = buildStatefulMethod(name, fn);

				// assign the fn to the prototype.
				this.assignProto(name, statefulMethod);

			} else {
				// multiple statefulMethods
				_.each(name, function (fn, name) {
					this.statefulMethod(name, fn);
				}, this);
			}

			// always return 'this'
			return this;
		}
	});
});
