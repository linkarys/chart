'use strict';

angular.module('yoApp')
.controller('AboutCtrl', function ($scope) {

	/**
	 * Utils / Global
	 * ----------------------------------------------------------------------------
	 */

	var chart = d3.select('#chart');
	var colors = d3.scale.category20();
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

	chart.get = function(tweakX, tweakY) {
		var newChart = chart.append('g').attr('transform', translate(tweakX, tweakY));
		return newChart;
	};


	/**
	 * Rainbow
	 * ----------------------------------------------------------------------------
	 */

	(function(){
		var rainbowChart = chart.get(80, 50);
		var arcData = d3.range(5);
		var maxArc = 80;
		var arc = d3.svg.arc()
			.innerRadius(function(d) {
				return 30;
			})
			.outerRadius(function(d, i) {
				return maxArc - i * 10;
			})
			.startAngle(function(d) {
				return Math.PI / 4;
			})
			.endAngle(function(d) {
				return Math.PI * 3 / 2;
			});

		rainbowChart
			.selectAll()
			.data(arcData)
			.enter()
			.append('path')
			.attr({
				d: arc,
				fill: function(d, i) {
					return colors(i);
				}
			});
	})();

	/**
	 * Bubble
	 * ----------------------------------------------------------------------------
	 */

	(function() {
		var bubbleChart = chart.get();

		setInterval(function() {
			var circles = bubbleChart
				.selectAll('circle')
				.data(d3.range(Math.floor(Math.random() * 5)));

			circles.enter()
				.append('circle').attr({
					cx: function(d, i) {
						return (i + 1) * (i + 1) * 5;
					},
					cy: function(d, i) {
						return (i + 1) * (i + 1) * 5;
					},
					r: function(d, i) {
						return i * 10;
					}
				}).style('opacity', '.3');

			circles.exit().remove();
		}, 1000);
	})();


	/**
	 * Pie
	 * ----------------------------------------------------------------------------
	 */

	(function() {
		var pieChart = chart.get(80, 60);
		var data = [50, 10, 20, 40];
		var arcData = d3.layout.pie()(data);
		var arc = d3.svg.arc()
			.innerRadius(30)
			.outerRadius(70)
			.startAngle(function(d) {
				return d.startAngle;
			})
			.endAngle(function(d) {
				return d.endAngle;
			});

		pieChart
			.selectAll()
			.data(arcData)
			.enter()
			.append('path')
			.attr({
				d: arc,
				fill: function(d, i) {
					return colors(i);
				}
			});
	})();


	/**
	 * Diagonal
	 * ----------------------------------------------------------------------------
	 */

	(function() {
		var diagonalChart = chart.get();
		var source = {x: 0, y: 60};
		var targets = [
			{x: 80, y: 0},
			{x: 80, y: 30},
			{x: 80, y: 60},
			{x: 80, y: 90},
			{x: 80, y: 120}
		];

		var data = targets.map(function(target) {
			return {
				source: source,
				target: target
			};
		});

		// pie
		var nodes = targets.concat(source);

		diagonalChart
			.selectAll()
			.data(nodes)
			.enter()
			.append('circle')
			.attr({
				cx: function(d) {return d.x;},
				cy: function(d) {return d.y;},
				r: 10,
				class: 'circle'
			});

		// diagonal line
		diagonalChart
			.selectAll()
			.data(data)
			.enter()
			.append('path')
			.attr({
				class: 'concat-line',
				d: d3.svg.diagonal()
			});
	})();


	/**
	 * Area
	 * ----------------------------------------------------------------------------
	 */

	(function() {
		var areaChart = chart.get(1000);
		var height = 100;
		var base = 20;
		var data = d3.range(70).map(function(d, i) {
			return {
				x: i * 10,
				y: Math.floor(Math.random() * (height - base))
			};
		});

		var x = function(d) {return d.x;};
		var y = function(d) {return height - base - d.y;};

		// area
		var area = d3.svg.area()
			.x(x)
			.y0(height)
			.y1(y);

		areaChart
			.datum(data)
			.append('path')
			.attr({
				d: area,
				class: 'area'
			});

		// line
		var line = d3.svg.line()
			.x(x)
			.y(y);

		areaChart
			.datum(data)
			.append('path')
			.attr({
				d: line,
				class: 'concat-line'
			});

		// pointers
		areaChart
			.selectAll()
			.data(data)
			.enter()
			.append('circle')
			.attr({
				cx: x,
				cy: y,
				r: 3,
				class: 'circle'
			});
	})();

});
