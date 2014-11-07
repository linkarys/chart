'use strict';

angular.module('yoApp')
.service('colors', function colors() {
	return d3.scale.category20();
});
