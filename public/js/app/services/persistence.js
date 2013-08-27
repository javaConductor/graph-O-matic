(function (services) {
	/**
	 * This service is responsible for reading and writing to and from the server in graph-O-matic (c)
	 *
	 *
	 */
    console.log("Defining persistence service.");
	services.factory('persistence', ['$http', '$resource', 'Directory', function ($http, $resource, restDirectory) {
		var prefix = 'http://' + restDirectory.prefix;
        var View = $resource(prefix + 'views/:id', {alt:'json', callback:'JSON_CALLBACK'},{id: '@id'});
        var Item = $resource(prefix + 'items/:id', {alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});
        var ViewItem = $resource(prefix + 'view-items/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});
        var ItemType = $resource(prefix + 'item-types/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});
		var Relationship = $resource(prefix + 'relationships/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});
        var RelationshipType = $resource(prefix + 'relationship-types/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});

        console.log("Creating persistence service.");
		return {

 			getItem: function (itemId, f) {
				Item.get({}, {id: itemId}, function (item) {
					f(null, item);
				}, function (err) {
					f('Could not get Item:' + err, null);
				})
			},

			removeItem: function (itemId, f) {
                Item.delete({id : itemId}, function (resp) {
                    f( null, resp);
                }, function (err) {
                    f('Could not delete item:' + err, null);
                });

			},

			saveItem: function (item, f) {
				Item.save({}, item, function (savedItem) {
					item.id = savedItem.id;
					f( null, savedItem);
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
			getRelationshipCategory: function (categoryId,  f) {
			},
			getRelationshipType: function (id,  f) {
			},
			getRelationshipTypes: function (f) {
			},
			getRelationshipCategories: function (f) {
			},
            getPossibleNewRelationshipTypes: function(itemFrom, itemTo, f){

            },

			removeViewItem: function (viewItem, f) {
			},

			removeView: function (viewId, f) {
			},

			saveView: function (viewData, f) {
			},

            getView: function (viewId, f) {

                View.get({}, {id: viewId}, function (view) {
                    f(null, view);
                }, function (err) {
                    f('Could not get View: id='+viewId +' ==>>'+ err, []);
                });
            },

            getViews: function ( f ) {
                View.get({}, {}, function (views) {
                    f(null, views);
                }, function (err) {
                    f('Could not get Views ==>>'+ err, []);
                })
            },

			createViewItem: function (theViewItem, f) {
			},

			saveViewItem: function (viewItem, f) {
			}
		}
	}]);


})(angular.module('GraphOMaticServices'));