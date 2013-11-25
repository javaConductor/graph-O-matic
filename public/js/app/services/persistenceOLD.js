(function (services) {
    console.log("services/persistence.js");

    /**
	 * This service is responsible for reading and writing to and from the server in graph-O-matic (c)
	 *
	 *
	 */

	services.factory('persistence', ['$http', '$resource', 'Directory', function ($http, $resource, restDirectory) {
        console.log("services/persistence.js - services:"+JSON.stringify(services));
		var prefix =  "http://localhost:4242/";//restDirectory.prefix();
        var View = $resource(prefix + 'views/:id', {alt:'json',  id: '@id'},
            {
                create: {
                    method: "PUT",
                    url: prefix + 'views/new/:viewName/:viewType',
                    params: {
                        viewName: "@viewName",
                        viewType: "@viewType"
                    }
                }
            }

        );
        var Item = $resource(prefix + 'items/:id', { callback:'JSON_CALLBACK', id: '@id'});
        var ItemData = $resource(prefix + 'item-data/:id', { callback:'JSON_CALLBACK', id: '@id'});
        var ViewItem = $resource(prefix + 'view-items/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});
        var ItemType = $resource(prefix + 'item-types/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});
		var Relationship = $resource(prefix + 'relationships/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});
        var RelationshipType = $resource(prefix + 'relationship-types/:id',{alt:'json', callback:'JSON_CALLBACK'}, {id: '@id'});

		return {

 			getItem: function (itemId, f) {
				Item.get({}, {id: itemId}, function (item) {
					f(null, item);
				}, function (err) {
					f('Could not get Item:' + err);
				})
			},

 			allItems: function ( f) {
                $http({
                    method: 'GET',
                    url: prefix + "items"
                })
                .success(function(data, status, headers, config){
                        f(null, data);
                    })
                .error(function(data, status, headers, config){
                        f(status)
                    });
			},

 			getItemData: function (itemId,  f) {
                $http({
                    method: 'GET',
                    url: prefix + "item-data/"+itemId
                })
                .success(function(data, status, headers, config){
                        f(null, data);
                    })
                .error(function(data, status, headers, config){
                        f("Status:"+status+" - "+data);
                    });
			},


			removeItem: function (itemId, f) {
                Item.delete({id : itemId}, function (resp) {
                    f( null, resp);
                }, function (err) {
                    f('Could not delete item:' + err);
                });

			},

			saveItem: function (item, f) {
				Item.save({}, item, function (savedItem) {
					item.id = savedItem.id;
					f( null, savedItem);
				}, function (err) {
					f('Could not save item:' + err);
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
			getCategory: function (categoryId, f) {
			},

			getCategories: function (f) {
			},

			getRelationshipType: function (id,  f) {
			},

			getRelationshipTypes: function (f) {
			},

            getPossibleNewRelationshipTypes: function(itemFrom, itemTo, f){
            },

			removeViewItem: function (viewItem, f) {
			},

			removeView: function (viewId, f) {
			},

			createView: function (viewName, viewType, f) {
                console.log("Persistence.createView("+viewName+","+viewType+")");

                $http({
                    method: 'PUT',
                    url: prefix + "views/",
                    data:{
                        name: viewName,
                        typeName: viewType}
                })
                    .success(function(data, status, headers, config){
                        f(null, data);
                    })
                    .error(function(data, status, headers, config){
                        f(status)
                    });

//                View.create({},{viewName: viewName, viewType: viewType}, function(view){
//                    f(null, view);
//                },function(err){
//                    f('Could not create View: name='+viewName +" of type "+viewType +': '+ err, []);
//                });
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

            allViews: function ( f ) {
                $http({
                    method: 'GET',
                    url: prefix + "views"
                })
                    .success(function(data, status, headers, config){
                        f(null, data);
                    })
                    .error(function(data, status, headers, config){
                        f(status)
                    });

            },

			createViewItem: function (theViewItem, f) {
			},

			saveViewItem: function (viewItem, f) {
			}
		}
	}]);


})(angular.module('graph-O-matic-services'));
