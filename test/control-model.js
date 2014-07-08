(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'stateful-view',
		// dependencies for the test
		deps = [mod, 'should', 'q', 'lodash'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(statefulView, should, q, _) {
	'use strict';

	describe('statefulView control-model', function () {

		it('control model', function (testdone) {


			function doNothing() { return 'nothing'; }

			// define a view constructor
			var constructor = statefulView.extend().statefulMethod({
				hide: function hideWhenShown() {
					return q.delay('hidden', 400);
				},

				show: function showWhenHidden() {
					return q.delay('shown', 300);
				}
			});

			// instantiate
			var instance = constructor({ state: 'show:done' });


			// set some cases
			instance.when([{ activated: false }], 'hide');

			instance.when({ activated: 1, logged: true }, 'show');


			instance.control.set('activated', false);

			instance.getState().should.eql('hide:doing');

			// wait for the hiding to be done
			setTimeout(function () {
				instance.getState().should.eql('hide:done');

				// half activate
				instance.control.set('logged', true);

				// nothing should happen
				instance.getState().should.eql('hide:done');

				// fully activate
				instance.control.set('activated', 1);

				instance.getState().should.eql('show:doing');

				testdone();
			}, 500)


		});
	});
});
