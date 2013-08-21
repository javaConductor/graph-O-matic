(function (services) {
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
			getItemType: function (id, f) {
			},
			getItemCategory: function (categoryId, f) {
			},
			getItemCategories: function (f) {
			},
			getRelationshipCategory: function (categoryId, f) {
			},
			getRelationshipType: function (id, f) {
			},
			getRelationshipTypes: function (f) {
			},
			getRelationshipCategories: function (f) {
			},
            getPossibleNewRelationshipTypes: function(itemFrom, itemTo){

            },
			removeViewItem: function (viewItem, f) {
			},
			removeView: function (viewId, f) {
			},
			saveView: function (viewData, f) {
			},
			getView: function (viewId, f) {
			},
			createViewItem: function (theViewItem, f) {
			},
			saveViewItem: function (viewItem, f) {
			}

		}
	}]);


})(angular.module('GraphOMaticServices'));
