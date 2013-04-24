'use strict';

/* Model Service */
var services = angular.module('Model', ['ngResource']);
services.factory('Model', ['$http', '$location', function ($http, $location) {

	return {
		"ItemType":  {
			create : function(properties){




			},
			validate : function(value){},

		},
		copy: function (destination, source) {
			if (!destination)
				return source;
			if (!source)
				return destination;

			for (var property in source) {
				destination[property] = source[property];
			}
			return destination;
		}
	};
}]);

