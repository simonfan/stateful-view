require.config({
	urlArgs: 'bust=0.07953386474400759',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'stateful-view': 'index',
		qunit: '../bower_components/qunit/qunit/qunit',
		jquery: '../bower_components/jquery/dist/jquery',
		'requirejs-text': '../bower_components/requirejs-text/text',
		underscore: '../bower_components/underscore/underscore',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		q: '../bower_components/q/q',
		stateful: '../bower_components/stateful/built/stateful',
		subject: '../bower_components/subject/built/subject',
		backbone: '../bower_components/backbone/backbone',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
