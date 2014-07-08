define('__stateful-view/build-stateful-method',['require','exports','module','lodash','q'],function (require, exports, module) {

	var _ = require('lodash'),
		q = require('q');


	/**
	 * Builds the method
	 *
	 * @param  {[type]} name     [description]
	 * @param  {[type]} stateFns [description]
	 * @return {[type]}          [description]
	 */
	module.exports = function buildStatefulMethod(name, fn) {

		// variables to hold state names in cache
		var doingSt = name + ':doing',
			doneSt  = name + ':done';


		// return a function that wraps the execution
		// with a state setting logic.
		return function statefulMethod() {
			// get the state of the object
			var state = this.getState();

			if (state === doneSt || state === doingSt) {
				// state is the same.
				// return the cached value

				return this.cache(name);

			} else {

				// set the state to doing
				this.setState(doingSt);

				// execute AND SAVE TO CACHE
				var execution = fn.apply(this, arguments);
				this.cache(name, execution);

				if (q.isPromise(execution)) {

					execution.done(_.partial(this.setState, doneSt));

				} else {
					// synchronous if not promise
					// state done
					this.setState(doneSt);
				}

				return execution;

			}
		};

	};

});

//     stateful-view
//     (c) simonfan
//     stateful-view is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module stateful-view
 */

define('stateful-view',['require','exports','module','lowercase-backbone','lodash','improved-model','./__stateful-view/build-stateful-method'],function (require, exports, module) {
	

	var backbone = require('lowercase-backbone'),
		_        = require('lodash'),
		model    = require('improved-model');


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
			 * Cache onto which state invocations will be set to.
			 * @type {Object}
			 */
			this._cache = {};

			_.bindAll(this, ['setState', 'getState']);


			/**
			 * Model that controls the statefulView
			 */
			this.control = options.control || model();

			// set execution cases
			var cases = options.cases || this.cases;
			if (_.isArray(cases)) {
				// [{ condition: , method: , context: }]
				_.each(cases, function (c) {

					this.when(c.condition, c.method, c.context);

				}, this);

			} else if (_.isObject(cases)) {
				// { 'propName:propValue': $method }
				_.each(cases, function (method, condition) {

					this.when(condition, method);

				}, this);
			}
		},

		/**
		 * Cases on which methods should be invoked.
		 * @type {Object}
		 */
		cases: {},

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
			if (this.state !== state) {
				this.state = state;

				// state change
				this.trigger('state', this, state)
					.trigger(state, this);
			} else {
				// do nothing.
			}

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




		/**
		 * [when description]
		 * @param  {[type]} criteria [description]
		 * @param  {[type]} method   [description]
		 * @param  {[type]} context  [description]
		 * @return {[type]}          [description]
		 */
		when: function statefulViewWhen(criteria, method, context) {

			// get context (defaults to this)
			context = context || this;

			// get the method from the context object
			method = _.isString(method) ? context[method] : method;

			// set the condition
			// onto the control model.
			this.control.when(criteria, method, context);

			return this;
		},
	});


	var nonEnum = { enumerable: false };

	/**
	 * Defines a stateful method onto the object's prototype.
	 *
	 * @param  {[type]}   name [description]
	 * @param  {Function} fn   [description]
	 * @return {[type]}        [description]
	 */
	statefulView.assignStatic('statefulMethod', function statefulMethod(name, fn) {

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

	}, nonEnum); // non enumerable.
	// alias
	statefulView.assignStatic('statefulMethods', statefulView.statefulMethod, nonEnum);


	/**
	 * Basically extends the statefulView
	 * and defines statefulMethods onto the new view.
	 *
	 * @param  {[type]} methods [description]
	 * @return {[type]}         [description]
	 */
	statefulView.assignStatic('extendStatefulMethods', function extendStatefulMethods(methods) {

		// [1] extend
		var extended = this.extend();

		// [2] define statefulMethods
		extended.statefulMethods(methods);

		// [3] return the extended object.
		return extended;

	}, nonEnum);

});

