'use strict';

/* Services */

var neo4jHost = "localhost";
var neo4jPort = 7474;

var Root, Item, Relationship, RelationshipTypes

var services = angular.module('GraphOMaticServices', ['ngResource']);
/**
 *
 */

var theWorld = function(){
	persistence : null,
	allItems : persistence.allItems(),
	allRelationships : persistence.allRelationships()

}

services.factory('Directory', ['$http', '$location', function ($http, $location)  {
	/// send to server for the directory: Map(k.v)
	var urlPrefix = "http://" + $location.hostname + ":" +$location.port + "/";
	var dirUrl = urlPrefix + "directory";
	var thiz = this;
	this.directoryEntries = {}
	$http({method:'JSONP', params:{callback:'JSON_CALLBACK'}, url:dirUrl}).
		error(function (data, status, headers, config) {
			return null;
		}).success(function(data){
			thiz.directoryEntries = data;
		});
	return {
		entries : function(){ return thiz.directoryEntries; }
		prefix: function(){return urlPrefix;}
	}
}]);

///
/// We use the graph-o-matic REST API for persistence
///
// steps: send out the /directory to server
var ViewPersistence = function ViewPersistence( persistence ) {


	// returns a function that, given a viewId, will return a
	// View Object representing that view
	return function(viewId){
		var theView = persistence.getView(viewId) // merges viewItems w/ Items

		/// return the View object for viewId
		return {
			'name' : theView.name,

			/////////////////////////////////////////////////////////
			// Items
			/////////////////////////////////////////////////////////
			viewItems : function(){
				return theView.items();
			},//returns list of items for this view
			createViewItem: function(item){
				return persistence.createViewItem(item);//creates both Item&ViewItem - sweet!
			},
			itemMatchesRelationshipCriteria: function(item, criteria){},//bool
			addItem : function(item){},
			/////////////////////////////////////////////////////////
			// Relationships
			/////////////////////////////////////////////////////////
			getPossibleNewRelationships: function(itemFrom, itemTo ){},
			itemHasRelationship: function(item, relationshipTypeName ){ },
			validRelationship: function(relationshipTypeName, itemFrom, itemTo){},
			validToRelationship: function(relationshipTypeName, itemTo){},
			validFromRelationship: function(relationshipTypeName, itemFrom){},
			createRelationship: function(itemFrom, itemTo, relationshipTypeName){},
			relationships: function(){},
			findItemRelationships: function(item) {}
		}
	};
}

/**
 * This service is responsible for the drawing operations of GraphOMatic (c)
 *
 */
services.factory('World', ['persistence',function ( persistence) {
	var prefix = 'http://'+neo4jHost+':'+neo4jPort;
	Root = $resource(prefix+'/', {});
	Item = $resource(prefix+'/node/:id', {id: '@id'});
	Relationship = $resource(prefix+'/relationship/:id', {id: '@id'});
	RelationshipTypes = $resource(prefix+'/relationship/types');

	return {
		allItems : persistence.allItems(),
		allRelationships : persistence.allRelationships()
		view: ViewPersistence(persistence),
		createItem : persistence.createItem(item),
		createRelationshipType: function(relationshipType ){
			/*
			 relationshipType -> {
			 category:Professional,
			 name:worksFor,
			 dated:true,//relationships have sets of start and end dates.
			 constraintFrom:[item.isInTypes([Person])],
			 constraintTo:[item.isInTypes([Business])],
			 upgrade: {
			 relationshipType:
			 }
			 }
			 relationshipType -> {
			 category:Professional,
			 name:worksFor,
			 dated:true,//relationships have sets of start and end dates.
			 constraintFrom:[item.isInTypes([Person])],
			 constraintTo:[item.isInTypes([Business])],
			 upgrade: {
			 relationshipType: otherType,
			 when: "itemTo == itemFrom" or function _$rtype$worksFor$upgrade$when(itemFrom, itemTo)
			 }
			 }
			 */
		}
	};
}]);

var directory = {
	entries: {  },
	getDirectory:  function(){



	}
};

/**
 * This service is responsible for the persistence in GraphOMatic(c)
 *
 * Right now it should be using Neo4J but we should be  able to swap it out for  ANYTHING we want
 *
 */
services.factory('persistence', ['$http', '$resource','Directory', function ($http, $resource, restDirectory) {
	var prefix = 'http://'+restDirectory.prefixneo4jHost+':'+neo4jPort;
	Root = $resource(prefix+'/', {});
	Item = $resource(prefix+'/node/:id', {id: '@id'});
	Relationship = $resource(prefix+'/relationship/:id', {id: '@id'});
	RelationshipTypes = $resource(prefix+'/relationship/types');

	return {
		getItem : function(itemId, f){
			Item.get({}, {id : itemId}, function(item){
				f(null, item);

			}, function (err) {
				f('Could not get Item:' + err, null);
			})
		},
		removeItem: function(itemId, f){},

		saveItem: function (item, f) {
			Item.save({}, item, function (savedItem) {
				item.id = savedItem.id;
				f(null, savedItem);
			}, function (err) {
				f('Could not save item:' + err, null);
			});
		},

		getRelatedItems : function(itemId, relationshipType, f){
			Item.get({}, {id : itemId}, function(items){
				f(null, items);
			}, function (err) {
				f('Could not get Item:' + err, []);
			})
		},

		getItemCategory: function(categoryId, f){},
		getItemCategories: function(f){},
		getRelationshipCategory: function(categoryId, f){},
		getRelationshipCategories: function(f){},
		getView: function(viewId, f){},
		removeViewItem: function(viewItem, f){},

		removeView: function(viewId, f){},
		saveView: function(theView, f){   },
		createViewItem: function(theViewItem, f){},
		saveViewItem: function(viewItem, f){}

	}}]);
