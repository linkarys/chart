'use strict';

angular.module('yoApp')
.controller('ScaleCtrl', function ($scope, chart, mdu, colors) {

	/**
	 * Bar Chart
	 * ----------------------------------------------------------------------------
	 */

	mdu(function() {
		var width = 400;
		var height = 200;
		var barMargin = 2;
		var barNums = 800;
		var markData = [
			['lorem', 50],
			['foo', 153],
			['bar', 200],
			['lala', 500]
		];
		var data = d3.range(barNums);
		var barChart = chart.get();
		var barWidth = width / barNums;

		var scaleX = d3.scale.linear().domain([0, barNums - 1]).range([0, width]);
		var scaleY = d3.scale.linear().domain(d3.extent(data)).range([0, height]);
		var color = d3.scale.linear().domain(d3.extent(data)).range(['#eee', '#F34370']);

		barChart.selectAll()
			.data(data)
			.enter()
			.append('rect')
			.attr({
				height: 0,
				y: height
			})
			.transition().duration(300)
			.attr({
				width: barWidth,
				height: function(d) {
					return scaleY(d);
				},
				x: function(d, i) {
					return (barWidth) * i;
				},
				y: function(d) {return height - scaleY(d);},
				fill: function(d) {return color(d);}
			});


		var axisX = barChart.append('g').attr('transform', 'translate(0,' + (height + 0) + ')');
		axisX.call(d3.svg.axis().scale(scaleX).tickFormat(function(d) {
			return d3.format(',.0f')(d) + 't';
		}).ticks(6));

		var points = axisX.selectAll().data(markData).enter().append('g');
		points.append('circle')
			.attr({
				cy: -height
			})
			.transition().duration(1000).ease('bounce')
			.attr({
				cx: function(d) {return scaleX(d[1]); },
				cy: 1.5,
				r: 3,
				class: 'circle'
			});
		points.append('text')
			.text(function(d) {return d[0];})
			.attr({
				transform: 'translate(0, -5) rotate(0)'
			})
			.transition().duration(600)
			.attr({
				'transform': function(d) {
					return 'translate(' + scaleX(d[1]) + ', -5) ' + 'rotate(-20)';
				}
			});
	});

	/**
	 * Couple
	 * ----------------------------------------------------------------------------
	 */

	mdu(function() {
		var cChart = chart.get();
		var circles = cChart.selectAll().data(d3.range(2)).enter().append('circle')
			.attr({
				r: 15,
				class: 'circle',
				cx: 0,
				cy: 0
			});

		setInterval(function(){
			circles.transition().duration(1000).attr({
				cx: function(d, i) {return Math.random(d) * 100},
				cy: Math.random() * 500
			})
		}, 1000);
	});

	/**
	 *
	 * ----------------------------------------------------------------------------
	 */
	mdu(function() {
		d3.csv('scripts/data/eps.csv', function(err, data) {
			if (err) throw err;
		});

		d3.json('scripts/data/eps.json', function(err, data) {
			if (err) throw err;
			var timeFormat = d3.time.format('%B %e, - %Y');
			console.log(data);

			data.forEach(function(datum) {
				datum['Air date'] = timeFormat.parse(datum['Air date']);
				datum['U.S. Viewers'] = datum['U.S. viewers (in millions)'] * 100000;
				delete datum['U.S. viewers (in millions)'];
			});
			console.log(data);
		});
	});
});
