'use strict';

angular.module('yoApp')
	.controller('HelpersCtrl', function ($scope, chart, colors, mdu, lg) {

		/**
		 * Helpers
		 * ----------------------------------------------------------------------------
		 */

		mdu(function () {
			// permute
			var data = [1, 123, 12, 1];
			lg(d3.permute(data, [4, 3, 3, 2, 1, 0]));

			// filter
			var filted = data.filter(function (node) {
				return node % 2 === 0;
			});
			lg(filted);

			// zip
			lg(d3.zip([1, 2, 4], [3, 7, 9, 11]));

			// transpose
			lg(d3.zip.apply(null, [[1, 2, 4], [3, 7, 9, 11]]));
			lg(d3.transpose([[1, 2, 4], [3, 7, 9, 11]]));

			// pairs
			lg(d3.pairs(['a', 2, 3, 4]));

			// sort
			var arr = [12, 2, 342, 34, 23, 4, 254, 234, 234234, 234];
			arr.sort(d3.ascending);
			lg(arr);

			// map
			var m2 = d3.map({
				x: 1
			});
			lg(m2, m2.has('x'), m2.has('y'));

			// nest

			var rawCountryData = [{
					'countryName': 'Andorra',
					'continent': 'EU',
					'languages': 'ca',
					'areaInSqKm': '468.0',
					'population': '84000',
				},
				{
					'countryName': 'Antigua and Barbuda',
					'continent': 'NA',
					'languages': 'en-AG',
					'areaInSqKm': '443.0',
					'population': '86754'
					},
				{
					'countryName': 'Anguilla',
					'continent': 'NA',
					'languages': 'en-AI',
					'areaInSqKm': '102.0',
					'population': '13254'
				},
				{
					'countryName': 'Albania',
					'continent': 'EU',
					'languages': 'sq,el',
					'areaInSqKm': '28748.0',
					'population': '2986952'
				},
				{
					'countryName': 'Armenia',
					'continent': 'AS',
					'languages': 'hy',
					'areaInSqKm': '29800.0',
					'population': '2968000'
				}
			];

			data = d3.nest()
				.key(function(d) {return d.continent;})
				.key(function(d) {return d.languages;})
				.sortKeys(d3.ascending)
				.entries(rawCountryData);

			lg(data);
		});
	});
