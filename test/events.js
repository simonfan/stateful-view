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

	describe('statefulView events', function () {
		beforeEach(function (done) {
			done();
		});

		it('"state" event', function (testdone) {


			var control = [];


			// define a constructor with some stateful methods.
			var constructor = statefulView.extend({
				initialize: function initialize() {

					statefulView.prototype.initialize.apply(this, arguments);


					// listen to 'state' event
					this.on('state', function (object, state) {

						control.push(state);

					});

					// listen to 'show:done'
					this.on('show:done', function (object) {

					});


				},
			});

			constructor.statefulMethods({

				show: function () {

					return q.delay('shown', 500);
				},

				hide: function () {
					return q.delay('hidden', 600);
				}
			});

			// instantiate
			var instance = constructor({ state: 'hide:done' });

			// invoke hide
			instance.hide()
				.then(function () {

					control.should.eql(['hide:doing', 'hide:done']);

					// instance should be at the hide:done state.
					instance.state.should.eql('hide:done');

					// call hide again
					return instance.hide();

				})
				.then(function () {

					// no more events should have been fired,
					// as the view is at the hidden state
					control.should.eql(['hide:doing', 'hide:done']);

					// call show
					var show = instance.show();

					// check that the instance's state is at 'show:doing'
					instance.state.should.eql('show:doing');

					return show;

				})
				.then(function () {

					control.should.eql(['hide:doing', 'hide:done', 'show:doing', 'show:done']);

					instance.state.should.eql('show:done');

					testdone();

				})
				.done();
		});
	});
});
