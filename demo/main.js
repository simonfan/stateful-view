define(['stateful-view', 'jquery', 'q'], function (statefulView, $, q) {


	var $el = $('#item');

	function donothing() { return 'nothing'; }


	var hideableView = statefulView.extendActions({

		load: {
			'load:doing': function loading
		},

		hide: {
			'show:doing|show:done': function hideWhenShown() {

				return this.$el.stop().animate({ opacity: 0, }).promise();
			},

			'default': donothing
		},

		show: {
			'hide:doing|hide:done': function showWhenHidden() {

				return this.$el.stop().animate({ opacity: 1, }).promise();
			},

			'default': donothing
		}
	})

	var view = hideableView({
		el: $el,
		state: 'show:done'
	});


	view.hide();

	setTimeout(function () {
		view.show();
	}, 300);
});
