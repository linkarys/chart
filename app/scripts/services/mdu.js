'use strict';

angular.module('yoApp')
.service('mdu', function mdu() {
	return function(fn) {
		angular.isFunction(fn) && fn();
	};
});
