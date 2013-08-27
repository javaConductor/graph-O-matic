'use strict';

/* Services */
var neo4jHost = "localhost";
var neo4jPort = 7474;

//var Root, Item, ItemType, Relationship, RelationshipTypes;
var services = angular.module('GraphOMaticServices', ['ngResource']);
console.dir(['GraphOMaticServices', services]);
services.factory('Directory',"ConfigService", ['$http', '$location','ConfigService', function ($http, $location, config) {
	/// send to server for the directory: Map(k.v)
	var urlPrefix = "http://" + config.dataHost + "/";
    console.log("data urlPrefix:"+ urlPrefix);

	var dirUrl = urlPrefix + "directory";
	var thiz = this;
	this.directoryEntries = {};

	return {
		entries: function () {
			return thiz.directoryEntries;
		},
		prefix: function () {
			return urlPrefix;
		}
	}
}]);