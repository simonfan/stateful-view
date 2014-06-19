(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'stateful-view',
		// dependencies for the test
		deps = [mod, 'should', 'q'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(statefulView, should, q) {
	'use strict';

	describe('stateful-view asynch', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function (testdone) {


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

			instance.hide()
				.then(function (res) {
					res.should.eql('hidden');
					instance.getState().should.eql('hide:done');
				})
				.then(function () {

					// call show
					var show = instance.show();

					// check state change
					instance.getState().should.eql('show:doing');

					return show;
				})
				.then(function (res) {
					res.should.eql('shown');
					instance.getState().should.eql('show:done');



					//
					testdone();
				})
				.done();

			instance.getState().should.eql('hide:doing');




		});
	});
});
