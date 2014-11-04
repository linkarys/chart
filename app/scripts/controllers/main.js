'use strict';

angular.module('yoApp')
.controller('MainCtrl', function ($scope) {

	var chart = d3.select('#chart');
	var colors = d3.scale.category20();


	/**
	 * Bubble
	 * ----------------------------------------------------------------------------
	 */

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
			.style('opacity', '.3');;
		bars.exit().remove();
	}
	setInterval(update, 2000);


	/**
	 * Star
	 * ----------------------------------------------------------------------------
	 */

	var line = d3.svg.line()
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
	var arc = d3.svg.arc()
		.innerRadius(30).outerRadius(function(d, i) {
			return 30 + (rainbow .length - i) * 20;
		})
		.startAngle(Math.PI / 2).endAngle(Math.PI * 3 / 2);


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

	var data = [21, 45, 23, 12, 60];
	var arcData = d3.layout.pie()(data);
	var arc = d3.svg.arc()
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

	var data = d3.range(100).map(function(d, i) {
		return {
			x: i * 10,
			y: Math.random() * 50 + 0
		}
	});

	var axisY = function(d) {
		return height - d.y - baseHeight;
	}

	// area
	var area = d3.svg.area()
		.x(function(d) {return d.x})
		.y0(height)
		.y1(axisY);

	areaChart.append('path').datum(data)
		.attr({
			d: area,
			class: 'area'
		});

	// line
	var line = d3.svg.line()
		.x(function(d) {return d.x})
		.y(axisY)

	areaChart.append('path').datum(data)
		.attr({
			d: line,
			class: 'plot'
		})

	// pointer
	areaChart.selectAll()
		.data(data)
		.enter()
		.append('circle')
		.attr({
			cx: function(d) {return d.x},
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

	var chord = d3.layout.chord().matrix(matrix);
	var fill = d3.scale.ordinal()
		.domain(d3.range(4))
		.range(['#FFA400', '#C50080', '#ABF000', '#1049A9']);

	var chordChart = chart.append('g')
		.attr('transform', 'translate(140, 650)')

	chordChart.selectAll('path')
		.data(chord.chords)
		.enter()
		.append('path')
		.attr({
			d: d3.svg.chord().radius(110),
			fill: function(d, i) {return colors(i)},
		})
		.style({
			// opacity: .6
		})
});
