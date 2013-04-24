'use strict';

/* Services */

var neo4jHost = "localhost";
var neo4jPort = 7474;

var Root, Item, ItemType, Relationship, RelationshipTypes;

var services = angular.module('GraphOMaticServices', ['ngResource', 'UtilityFunctions']);

var modelFactory = {
	newItemType: function (name) {
		return {
			name: name
		}
	},
	newItem: function (itemType, name) {
		return {

		}
	},
	newRelationshipType: function () {
	},
	newRelationship: function () {
	},
	newView: function () {
	}
};
/**
 *
 */

Item = function (itemObj) {

	return {
		is: function (itemType) {


		}

	};

}

/*
 "viewsAsReturnedFromRestAPI":[{
 "id": "v1",
 "name": "Main Presentation",
 itemIdList: ["itm.a","itm.b"],
 "items": [{
 "position": {"x":150,"y":50},
 "viewStyle": {"style": { "background-color": "red"}, "texture": "/textures/img.001.jpg"},
 "item": {
 "type": "$ref{ $id: 'school'} ",
 "id": "itm.a",
 "name":"James McCosh Elementary School"
 }
 },{
 "position": {"x":50,"y":50},
 "viewStyle": {"style": { "foreground-color": "blue"}, "texture": "/textures/img.001.jpg"},
 "item": {
 "type": "$ref{ $id: 'school'} ",
 "id": "itm.b",
 "name":"Paul Lawrence Dunbar Vocational High School"
 }
 }]
 }
 ]
 */


var View = function View(world, viewData) {


	var initViewItem = function (vItem, itemTypesById) {


	};
	/// all initialization done here before we return object

	/// add the types to the items

	var theItemTypes = world.itemTypesForItems(viewData.itemIdList);
	var itemTypesById = mapBy("id", theItemTypes);
	var newItems = [];
	viewData.items.forEach(function (vitem) {
		newItems.push(this.initViewItem(vitem, itemTypesById));
	});
	viewData.items = newItems;


	var theObject = {
		'name': viewData.name,
		"world": world,
		/////////////////////////////////////////////////////////
		// Items
		/////////////////////////////////////////////////////////
		viewItems: function () {
			return viewData.items();
		},//returns list of items for this view

		itemMatchesRelationshipCriteria: function (item, criteria) {
		},//bool
		addItem: function (item) {
			this.createViewItem(item)
		},
		/////////////////////////////////////////////////////////
		// Relationships
		/////////////////////////////////////////////////////////
		getPossibleNewRelationships: function (itemFrom, itemTo) {
		},
		itemHasRelationship: function (item, relationshipTypeName) {
		},
		validRelationship: function (relationshipTypeName, itemFrom, itemTo) {
		},
		validToRelationship: function (relationshipTypeName, itemTo) {
		},
		validFromRelationship: function (relationshipTypeName, itemFrom) {
		},
		createRelationship: function (itemFrom, itemTo, relationshipTypeName) {
		},
		relationships: function () {
		},
		findItemRelationships: function (item) {
		}
	}
};

return theObject;

}
;


services.factory('Directory', ['$http', '$location', function ($http, $location) {
	/// send to server for the directory: Map(k.v)
	var urlPrefix = "http://" + $location.hostname + ":" + $location.port + "/";
	var dirUrl = urlPrefix + "directory";
	var thiz = this;
	this.directoryEntries = {}
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

var memberDadClubRelType = {
	name: "memberOfDadsClub",
	parent: "member",
	category: "Social",
	dated: true,
	constraintTo: "item.is('DadsClub')",
	// OR set _$rtype$memberOfDadsClub$constraintTo(itemFrom, itemTo) in World.extend({"entrypoint":function})
	constraintFrom: "item.hasRelationship('Child')"
	// OR set _$rtype$memberOfDadsClub$constraintFrom(itemFrom, itemTo)
};
var relCriteria = "item.hasRelationship('child')";
///
/// We use the graph-o-matic REST API for persistence.js
///
// steps: send out the /directory to server

/**
 * This service is responsible for the drawing operations of GraphOMatic (c)
 *
 */


var directory = {
	entries: {  },
	getDirectory: function () {


	}
};

/**
 * This service is responsible for the persistence.js in graph-O-matic (c)
 *
 * Right now it should be using Neo4J but we should be  able to swap it out for  ANYTHING we want
 *
 */
services.factory('persistence', ['$http', '$resource', 'Directory', function ($http, $resource, restDirectory) {
	var prefix = 'http://' + restDirectory.prefix;
	Item = $resource(prefix + '/item/:id', {id: '@id'});
	ItemType = $resource(prefix + '/item/:id', {id: '@id'});
	Relationship = $resource(prefix + '/relationship/:id', {id: '@id'});
	RelationshipTypes = $resource(prefix + '/relationship/types');

	return {
		getItem: function (itemId, f) {
			Item.get({}, {id: itemId}, function (item) {
				f(null, item);
			}, function (err) {
				f('Could not get Item:' + err, null);
			})
		},
		removeItem: function (itemId, f) {
		},

		saveItem: function (item, f) {
			Item.save({}, item, function (savedItem) {
				item.id = savedItem.id;
				f(null, savedItem);
			}, function (err) {
				f('Could not save item:' + err, null);
			});
		},

		getRelatedItems: function (itemId, relationshipType, f) {
			Item.get({}, {id: itemId}, function (items) {
				f(null, items);
			}, function (err) {
				f('Could not get Item:' + err, []);
			})
		},

		getItemCategory: function (categoryId, f) {
		},
		getItemCategories: function (f) {
		},
		getRelationshipCategory: function (categoryId, f) {
		},
		getRelationshipCategories: function (f) {
		},
		getView: function (viewId, f) {
		},
		removeViewItem: function (viewItem, f) {
		},

		removeView: function (viewId, f) {
		},
		saveView: function (viewData, f) {
		},
		createViewItem: function (theViewItem, f) {
		},
		saveViewItem: function (viewItem, f) {
		}

	}
}]);
