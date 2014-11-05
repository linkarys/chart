'use strict';

angular.module('yoApp')
.controller('MainCtrl', function () {

	var chart = d3.select('#chart');
	var colors = d3.scale.category20();

	var data, line, arc;

	/**
	 * Bubble
	 * ----------------------------------------------------------------------------
	 */
	(function() {
		var n = 0;
		var bars = d3.select('#chart').append('g')
			.attr('transform', 'translate(600, 20)').selectAll('.bar');
		function update() {
			n++;
			n = n > 6 ? 1 : n;
			var data = d3.range(n);
			bars = bars.data(data);
			bars.enter().append('circle').attr('class', 'bar')
				.attr('cx', function(d, i) {
					return d * 6 * i;
				})
				.attr('cy', function(d, i) {
					return 300 - d * 6 * i;
				})
				.attr('r', function(d, i) {
					return i * d * 2;
				})
				.style('opacity', '.3');
			bars.exit().remove();
		}
		setInterval(update, 2000);
	})();

	/**
	 * Star
	 * ----------------------------------------------------------------------------
	 */

	line = d3.svg.line()
	.x(function(d) { return d[0]; })
	.y(function(d) { return d[1]; });

	d3.select('#chart')
		.datum([[154, 14], [35, 172], [251, 127], [31, 58], [157, 205], [154, 14]])
		.append('path').attr({
			'd': line,
			'fill': colors(0)
		});

	/**
	 * Rainbow
	 * ----------------------------------------------------------------------------
	 */

	var rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	arc = d3.svg.arc()
		.innerRadius(30).outerRadius(function(d, i) {
			return 30 + (rainbow .length - i) * 20;
		})
		.startAngle(Math.PI / 4.5).endAngle(Math.PI * 5.5 / 4);


	chart
		.selectAll('.arc')
		.data(rainbow)
		.enter()
		.append('path')
		.attr({
			d: arc,
			transform: 'translate(200,200)',
			fill: function(d, i) {
				return colors(i);
			}
		});


	/**
	 * Pie
	 * ----------------------------------------------------------------------------
	 */

	data = [21, 45, 23, 12, 60];
	var arcData = d3.layout.pie()(data);
	arc = d3.svg.arc()
		.innerRadius(50)
		.outerRadius(90)
		.startAngle(function(d) {
			return d.startAngle;
		})
		.endAngle(function(d) {
			return d.endAngle;
		});

	chart.append('g')
		.attr('transform', 'translate(500, 200)')
		.selectAll('.pie-arc')
		.data(arcData)
		.enter()
		.append('path')
		.attr({
			d: arc,
			fill: function(d, i) {return colors(i);}
		});

	/**
	 * Area
	 * ----------------------------------------------------------------------------
	 */

	var height = 100;
	var baseHeight = 50;

	var areaChart = chart.append('g')
		.attr('transform', 'translate(30, 400)');

	data = d3.range(100).map(function(d, i) {
		return {
			x: i * 10,
			y: Math.random() * 50 + 0
		};
	});

	var axisY = function(d) {
		return height - d.y - baseHeight;
	};

	// area
	var area = d3.svg.area()
		.x(function(d) {return d.x;})
		.y0(height)
		.y1(axisY);

	areaChart.append('path').datum(data)
		.attr({
			d: area,
			class: 'area'
		});

	// line
	line = d3.svg.line()
		.x(function(d) {return d.x;})
		.y(axisY);

	areaChart.append('path').datum(data)
		.attr({
			d: line,
			class: 'plot'
		});

	// pointer
	areaChart.selectAll()
		.data(data)
		.enter()
		.append('circle')
		.attr({
			cx: function(d) {return d.x;},
			cy: axisY,
			r: 3,
			class: 'area-chart-point'
		});


	/**
	 * Chord
	 * ----------------------------------------------------------------------------
	 */

	 var matrix = [
			[ 0 /* A -> A */, 1.3 /* B -> A */, 2 /* C -> A */, 1 /* D -> A*/],
			[ 1.9 /* A -> B */, 0 /* B -> B */, 1 /* C -> B */, 2.1 /* D -> B*/],
			[ 2 /* A -> C */, 2 /* B -> C */, 3.2 /* C -> C */, 1.8 /* D -> C*/],
			[ 2.7 /* A -> D */, 0 /* B -> D */, 1 /* C -> D */, 0 /* D -> D */]
		]; // `C` really likes herself


/**
 *
 *
 *
 * ----------------------------------------------------------------------------
 */

	var chord = d3.layout.chord().matrix(matrix);

	var chordChart = chart.append('g')
		.attr('transform', 'translate(140, 650)');

	chordChart.selectAll('path')
		.data(chord.chords)
		.enter()
		.append('path')
		.attr({
			d: d3.svg.chord().radius(110),
			fill: function(d, i) {return colors(i);},
		});

	/**
	 * Symbol
	 * ----------------------------------------------------------------------------
	 */

	var symbolChart = chart.append('g')
		.attr('transform', 'translate(700, 200)');

	var symbol = d3.svg.symbol().type('square').size(1000);

	symbolChart.append('path')
		.attr({
			d: symbol,
			class: 'rect'
		});


	/**
	 * Diagonal
	 * ----------------------------------------------------------------------------
	 */
	var diagonalChart = chart.append('g')
		.attr('transform', 'translate(700, 120)');

	var source = {x: 300, y: 50};
	var targets = [
		{x: 100, y: 150},
		{x: 200, y: 150},
		{x: 300, y: 150},
		{x: 400, y: 150},
		{x: 500, y: 150},
	];

	// concat lines
	var links = targets.map(function(target) {
	    return {source: source, target: target};
	});

	diagonalChart.selectAll()
		.data(links)
		.enter()
		.append('path')
		.attr({
			d: d3.svg.diagonal(),
			class: 'concat-line'
		});

	// circles
	var nodes = targets.concat(source);
	diagonalChart.selectAll()
		.data(nodes)
		.enter()
		.append('circle')
		.attr({
			cx: function(d) {return d.x;},
			cy: function(d) {return d.y;},
			r: 20,
			class: 'circle'
		});


	/**
	 * Radial
	 * ----------------------------------------------------------------------------
	 */

	(function() {
		var radialChart = chart.append('g').attr('transform', 'translate(480, 660)');
		var lineRadial = d3.svg.line.radial();

		var maxR = 150, rot = 10;
		var n = 100;
		var data = d3.range(n).map(function(d) {
			var t = d / (n - 1);
			return [t * maxR, t * Math.PI * rot * 2];
		});

		radialChart.datum(data)
			.append('path')
			.attr({
				d: lineRadial,
				class: 'concat-line'
			});
	})();
});
