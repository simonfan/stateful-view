define(function (require, exports, module) {

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
