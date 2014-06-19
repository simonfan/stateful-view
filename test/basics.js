(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'stateful-view',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(statefulView, should) {
	'use strict';

	describe('stateful-view basics', function () {
		beforeEach(function (done) {
			done();
		});

		it(':)', function () {


			function doNothing() {
				return 'nothing';
			}


			// define a builder
			var view = statefulView.extend().statefulMethod({
				show: function showWhenHidden() {
					return 'start show';
				},

				hide: function hideWhenShown() {
					return 'start hide';
				}
			});


			var multistate = view({
				state  : 'show',
			});


			multistate.hide().should.eql('start hide');
		});
	});
});
