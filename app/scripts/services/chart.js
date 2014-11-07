'use strict';

angular.module('yoApp')
.service('chart', function chart() {

	var translate = (function(offsetX, offsetY) {
		offsetX = offsetX || 200;
		offsetY = offsetY || 200;

		var
			winWidth = 1324,
			startX = 30,
			startY = 30,
			x = startX - offsetX,
			y = startY;

		return function(tweakX, tweakY){
			tweakX = tweakX || 0;
			tweakY = tweakY || 0;

			x += offsetX;
			if (x + offsetX + tweakX > winWidth) {
				x = startX;
				y += offsetY;

				if (x + offsetX < winWidth) {
					tweakX = 0;
				}
			}

			return 'translate(' + (x + tweakX) + ', ' + (y + tweakY) + ')';
		};
	})();

	var dChart = d3.select('#chart');

	this.get = function(tweakX, tweakY) {
		var newChart = dChart.append('g').attr('transform', translate(tweakX, tweakY));
		return newChart;
	};
});
