'use strict';

angular.module('yoApp')
.service('lg', function logger() {
	return function(text) {
		var p = document.createElement('p');
		var logger = document.getElementById('logger');
		p.innerHTML = angular.isObject(text) ? JSON.stringify(text) : text;
		logger.appendChild(p);
	};
});
