'use strict';

/* Services */

var neo4jHost = "localhost";
var neo4jPort = 7474;

var Root, Item, ItemType, Relationship, RelationshipTypes;

var services = angular.module('GraphOMaticServices', ['ngResource']);

services.factory('Directory', ['$http', '$location', function ($http, $location) {
	/// send to server for the directory: Map(k.v)
	var urlPrefix = "http://" + $location.hostname + ":" + $location.port + "/";
	var dirUrl = urlPrefix + "directory";
	var thiz = this;
	this.directoryEntries = {};
	$http({method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, url: dirUrl}).
		error(function (data, status, headers, config) {
			return null;
		}).success(function (data) {
			thiz.directoryEntries = data;
		});
	return {
		entries: function () {
			return thiz.directoryEntries;
		},
		prefix: function () {
			return urlPrefix;
		}
	}
}]);
