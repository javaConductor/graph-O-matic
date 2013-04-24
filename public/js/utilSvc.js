'use strict';

/* Services */

var neo4jHost = "localhost";
var neo4jPort = 7474;

var Root, Item, ItemType, Relationship, RelationshipTypes;

var services = angular.module('UtilFunctions', ['ngResource']);

services.factory('UtilityFunctions', ['$http', '$location', function ($http, $location) {
	/// return the util funcs
	return {
		mapBy: function (key, objectArray) {
			var destination = {};
			if (objectArray)
				for (var idx in objectArray) {
					if (objectArray[idx][key])
						destination[objectArray[idx][key]] = objectArray[idx];
				}
			return destination;
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

