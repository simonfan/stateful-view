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

	describe('stateful-view caching', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function () {


			var m1counter = 0,
				m2counter = 0,
				m3counter = 0;

			// define constructor.
			var constructor = statefulView.extend().statefulMethod({
				method1: function method1() {
					m1counter += 1;
					return m1counter;
				},

				method2: function method2() {
					m2counter += 1;
					return m2counter;
				},

				method3: function method3() {
					m3counter += 1;
					return m3counter;
				}
			});

			// instantiate
			var instance = constructor();


			// invoke m1;
			instance.method1().should.eql(1);
			instance.getState().should.eql('method1:done');
			// invoke m1 again, and expect the counter NOT to have incremented
			// as the value should have been cached and the method should not
			// have been invoked
			instance.method1().should.eql(1);

			// inboke method2
			instance.method2().should.eql(1);
			instance.getState().should.eql('method2:done');
			// invoke m1 and expect the counte to have incremented.
			instance.method1().should.eql(2);
			instance.method2().should.eql(2);
			instance.method2().should.eql(2);

			instance.method3().should.eql(1);
			instance.method1().should.eql(3);
			instance.method3().should.eql(2);
			instance.method1().should.eql(4);

		});
	});
});
