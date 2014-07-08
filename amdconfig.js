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
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone',
		containers: '../bower_components/containers/built/containers',
		deep: '../bower_components/deep/built/deep',
		'improved-model': '../bower_components/improved-model/built/improved-model',
		itr: '../bower_components/itr/built/itr',
		'object-query': '../bower_components/object-query/built/object-query',
		swtch: '../bower_components/swtch/built/swtch'
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
